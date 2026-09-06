import React, { useRef, useState } from 'react';
import { Copy, Check, Trash2, Undo2, ZoomIn, ZoomOut, Type } from 'lucide-react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onCopy: () => void;
  copied: boolean;
  previousValue?: string;
  onUndo?: () => void;
}

export const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  onClear,
  onCopy,
  copied,
  previousValue,
  onUndo,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  const fontClass = {
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
  }[fontSize];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col flex-1 h-full">
      {/* 에디터 상단 Bento 헤더 */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 flex-wrap gap-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            텍스트 입력
          </span>
          {value.length > 0 ? (
            <span
              id="status-badge"
              className="text-[10px] px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded-full font-bold uppercase tracking-wider"
            >
              Analyzing
            </span>
          ) : (
            <span
              id="status-badge"
              className="text-[10px] px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full font-bold uppercase tracking-wider"
            >
              Ready
            </span>
          )}
          {value.length > 0 && (
            <span className="text-xs text-slate-400 font-medium ml-1">
              ({value.length.toLocaleString()}자)
            </span>
          )}
        </div>

        {/* 우측 제어 툴바 버튼군 */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* 글자 크기 조절 토글 */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setFontSize('sm')}
              className={`px-2 py-1 text-xs rounded font-medium transition ${
                fontSize === 'sm'
                  ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="작은 글자"
            >
              작게
            </button>
            <button
              type="button"
              onClick={() => setFontSize('base')}
              className={`px-2 py-1 text-xs rounded font-medium transition ${
                fontSize === 'base'
                  ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="보통 글자"
            >
              보통
            </button>
            <button
              type="button"
              onClick={() => setFontSize('lg')}
              className={`px-2 py-1 text-xs rounded font-medium transition ${
                fontSize === 'lg'
                  ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="큰 글자"
            >
              크게
            </button>
          </div>

          {/* 되돌리기 버튼 (Undo) */}
          {previousValue !== undefined && onUndo && (
            <button
              type="button"
              onClick={onUndo}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
              title="직전 지우기 작업 되돌리기"
            >
              <Undo2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">되돌리기</span>
            </button>
          )}

          {/* 전체 지우기 버튼 */}
          <button
            type="button"
            onClick={onClear}
            disabled={!value}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
            title="입력한 텍스트 전체 지우기"
          >
            <Trash2 className="w-3.5 h-3.5 text-slate-400" />
            <span>전체 지우기</span>
          </button>

          {/* 복사하기 버튼 */}
          <button
            type="button"
            onClick={onCopy}
            disabled={!value}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white rounded-lg transition-colors shadow-xs disabled:opacity-40 disabled:cursor-not-allowed ${
              copied
                ? 'bg-green-600'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            title="텍스트를 클립보드에 복사"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>복사하기</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 큰 텍스트 입력 에디터 (Bento Clean Editor) */}
      <textarea
        id="editor"
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={16}
        placeholder="검사할 텍스트를 이곳에 입력하거나 붙여넣으세요..."
        className={`w-full flex-1 resize-none border-none outline-none leading-relaxed text-slate-800 placeholder-slate-300 min-h-[380px] lg:min-h-[460px] focus:ring-0 ${fontClass}`}
        spellCheck="false"
      />
    </div>
  );
};
