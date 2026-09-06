import React, { useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { StatsGrid } from './components/StatsGrid';
import { Editor } from './components/Editor';
import { SpellCheckerPanel } from './components/SpellCheckerPanel';
import { StandaloneExportModal } from './components/StandaloneExportModal';
import { COMMON_SPELL_RULES, SAMPLE_TEXT } from './data/spellRules';
import {
  calculateTextStatistics,
  detectSpellingErrors,
  autoCorrectAll,
} from './utils/textStats';
import { generateStandaloneHtml } from './utils/standaloneHtmlGenerator';
import { SpellDetection } from './types';
import { Check, Info } from 'lucide-react';

export default function App() {
  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [previousText, setPreviousText] = useState<string | undefined>(undefined);
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // 실시간 통계 계산
  const stats = useMemo(() => calculateTextStatistics(text), [text]);

  // 실시간 맞춤법 오류 감지
  const detections = useMemo(
    () => detectSpellingErrors(text, COMMON_SPELL_RULES),
    [text]
  );

  // 단일 HTML 파일 문자열 캐시
  const standaloneHtml = useMemo(() => generateStandaloneHtml(), []);

  // 토스트 메시지 헬퍼
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2500);
  }, []);

  // 전체 지우기
  const handleClear = useCallback(() => {
    if (!text) return;
    if (window.confirm('입력한 텍스트를 모두 지우시겠습니까?')) {
      setPreviousText(text);
      setText('');
      showToast('텍스트가 모두 지워졌습니다. (되돌리기 가능)');
    }
  }, [text, showToast]);

  // 지우기 되돌리기 (Undo)
  const handleUndo = useCallback(() => {
    if (previousText !== undefined) {
      setText(previousText);
      setPreviousText(undefined);
      showToast('이전 텍스트로 복원되었습니다.');
    }
  }, [previousText, showToast]);

  // 클립보드 복사
  const handleCopy = useCallback(async () => {
    if (!text) {
      showToast('복사할 텍스트가 없습니다.');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast('텍스트가 클립보드에 복사되었습니다.');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      showToast('텍스트가 클립보드에 복사되었습니다.');
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text, showToast]);

  // 샘플 텍스트 불러오기
  const handleLoadSample = useCallback(() => {
    setPreviousText(text);
    setText(SAMPLE_TEXT);
    showToast('자주 틀리는 맞춤법 예문을 불러왔습니다.');
  }, [text, showToast]);

  // 모든 맞춤법 일괄 교정
  const handleFixAll = useCallback(() => {
    if (detections.length === 0) return;
    setPreviousText(text);
    const corrected = autoCorrectAll(text, detections);
    setText(corrected);
    showToast(`${detections.length}개의 맞춤법 오류가 모두 교정되었습니다.`);
  }, [text, detections, showToast]);

  // 단일 맞춤법 교정
  const handleFixSingle = useCallback(
    (item: SpellDetection) => {
      setPreviousText(text);
      const before = text.substring(0, item.index);
      const after = text.substring(item.index + item.length);
      setText(before + item.correct + after);
      showToast(`'${item.wrong}' ➔ '${item.correct}' 교정 완료`);
    },
    [text, showToast]
  );

  // GitHub Pages용 단일 index.html 파일 다운로드
  const handleDownloadHtml = useCallback(() => {
    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('index.html 다운로드가 시작되었습니다. GitHub Pages에 바로 올릴 수 있습니다.');
  }, [standaloneHtml, showToast]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-800">
      {/* 상단 네비게이션 헤더 */}
      <Header
        onLoadSample={handleLoadSample}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onDownloadHtml={handleDownloadHtml}
      />

      {/* Bento Grid 메인 작업 컨테이너 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
          {/* Main Editor Card (Bento Grid col-span-8) */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col">
            <Editor
              value={text}
              onChange={setText}
              onClear={handleClear}
              onCopy={handleCopy}
              copied={copied}
              previousValue={previousText}
              onUndo={handleUndo}
            />
          </div>

          {/* Right Bento Column (Statistics Grid + Spell Checker Suggestion Box) */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
            {/* 실시간 글자 수 2x2 Bento 그리드 */}
            <StatsGrid stats={stats} detectionCount={detections.length} />

            {/* 맞춤법 도우미 Dark Bento 박스 */}
            <SpellCheckerPanel
              detections={detections}
              onFixAll={handleFixAll}
              onFixSingle={handleFixSingle}
              hasText={text.trim().length > 0}
            />
          </div>
        </div>
      </main>

      {/* 하단 푸터 */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>글자 수 및 맞춤법 간편 검사기 · 브라우저 내에서 100% 안전하게 동작합니다.</span>
          </p>
          <div className="flex items-center gap-3 text-slate-500 font-medium">
            <button
              type="button"
              onClick={handleDownloadHtml}
              className="hover:text-indigo-600 transition underline underline-offset-2"
            >
              단일 index.html 다운로드
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              className="hover:text-indigo-600 transition underline underline-offset-2"
            >
              배포 소스 코드 보기
            </button>
          </div>
        </div>
      </footer>

      {/* 단일 배포 HTML 모달 창 */}
      <StandaloneExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        standaloneHtml={standaloneHtml}
        onDownloadHtml={handleDownloadHtml}
      />

      {/* 플로팅 토스트 피드백 */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-800">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
