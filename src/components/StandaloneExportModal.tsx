import React, { useState } from 'react';
import { X, Copy, Check, Download, Github, FileCode, CheckCircle } from 'lucide-react';

interface StandaloneExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  standaloneHtml: string;
  onDownloadHtml: () => void;
}

export const StandaloneExportModal: React.FC<StandaloneExportModalProps> = ({
  isOpen,
  onClose,
  standaloneHtml,
  onDownloadHtml,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(standaloneHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = standaloneHtml;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* 모달 헤더 */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                단일 파일 (index.html) 배포 코드
              </h3>
              <p className="text-xs text-slate-500">
                추가 빌드 없이 브라우저나 GitHub Pages에서 바로 동작하는 완성본 코드
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GitHub Pages 배포 안내 가이드 */}
        <div className="px-6 py-3 bg-indigo-50/60 border-b border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-indigo-950">
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              <strong>GitHub Pages 배포 방법:</strong> 리포지토리 루트에 <code>index.html</code>을 커밋한 뒤, <code>Settings &gt; Pages &gt; Branch: main</code>을 선택하면 끝납니다.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs transition flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>복사됨!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>코드 전체 복사</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onDownloadHtml}
              className="px-3 py-1.5 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>파일 다운로드</span>
            </button>
          </div>
        </div>

        {/* 코드 뷰어 영역 */}
        <div className="flex-1 p-4 bg-slate-900 overflow-auto font-mono text-xs text-slate-200">
          <pre className="whitespace-pre overflow-x-auto leading-relaxed selection:bg-indigo-500 selection:text-white">
            <code>{standaloneHtml}</code>
          </pre>
        </div>

        {/* 모달 푸터 */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            Tailwind CDN 및 바닐라 JS 내장 (무설치 100% 자립형)
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
