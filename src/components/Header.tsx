import React from 'react';
import { FileDown, Code2, Sparkles, BookOpenCheck } from 'lucide-react';

interface HeaderProps {
  onLoadSample: () => void;
  onOpenExportModal: () => void;
  onDownloadHtml: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onLoadSample,
  onOpenExportModal,
  onDownloadHtml,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-indigo-900">
                글자 수 및 맞춤법 검사기
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                실시간으로 텍스트 분석 및 교정을 도와줍니다.
              </p>
            </div>
          </div>

          {/* 모바일용 샘플 버튼 */}
          <button
            type="button"
            onClick={onLoadSample}
            className="sm:hidden px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            예시문
          </button>
        </div>

        {/* 데스크톱 액션 버튼들 */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
          <button
            type="button"
            onClick={onLoadSample}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            title="자주 틀리는 맞춤법 예문을 불러옵니다"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            샘플 텍스트
          </button>

          <button
            type="button"
            onClick={onOpenExportModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            title="GitHub Pages 배포용 단일 index.html 코드를 확인하고 복사합니다"
          >
            <Code2 className="w-4 h-4 text-slate-500" />
            <span>단일 HTML 보기</span>
          </button>

          <button
            type="button"
            onClick={onDownloadHtml}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-xs"
            title="GitHub Pages에 바로 올릴 수 있는 index.html 단일 파일을 다운로드합니다"
          >
            <FileDown className="w-4 h-4" />
            <span>index.html 다운로드</span>
          </button>
        </div>
      </div>
    </header>
  );
};

