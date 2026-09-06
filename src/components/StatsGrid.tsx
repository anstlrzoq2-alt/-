import React from 'react';
import { TextStatistics } from '../types';

interface StatsGridProps {
  stats: TextStatistics;
  detectionCount: number;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats, detectionCount }) => {
  return (
    <div className="space-y-3 w-full">
      {/* 2x2 Bento Statistics Grid */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
        {/* 1. 공백 포함 */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 sm:p-5 flex flex-col justify-center transition hover:shadow-xs">
          <p className="text-xs text-indigo-600 font-semibold mb-1">공백 포함</p>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl sm:text-3xl font-black text-indigo-900 tracking-tight">
              {stats.charWithSpaces.toLocaleString()}
            </p>
            <span className="text-xs text-indigo-500 font-medium">자</span>
          </div>
        </div>

        {/* 2. 공백 제외 */}
        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-center transition hover:shadow-xs">
          <p className="text-xs text-slate-500 font-semibold mb-1">공백 제외</p>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {stats.charWithoutSpaces.toLocaleString()}
            </p>
            <span className="text-xs text-slate-400 font-medium">자</span>
          </div>
        </div>

        {/* 3. 단어 수 */}
        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-center transition hover:shadow-xs">
          <p className="text-xs text-slate-500 font-semibold mb-1">단어 수</p>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {stats.wordCount.toLocaleString()}
            </p>
            <span className="text-xs text-slate-400 font-medium">개</span>
          </div>
        </div>

        {/* 4. 줄 바꿈 */}
        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-center transition hover:shadow-xs">
          <p className="text-xs text-slate-500 font-semibold mb-1">줄 바꿈</p>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {stats.lineBreaks.toLocaleString()}
            </p>
            <span className="text-xs text-slate-400 font-medium">회</span>
            <span className="text-[10px] text-slate-400 ml-1">({stats.lineCount}줄)</span>
          </div>
        </div>
      </div>

      {/* 부가 세부 분석 바 */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:px-4 sm:py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 shadow-xs">
        <div className="flex items-center gap-3 flex-wrap text-[11px] sm:text-xs">
          <div>
            <span className="text-slate-400 mr-1">원고지:</span>
            <strong className="text-slate-800 font-bold">{stats.manuscriptPages}</strong>매
          </div>
          <span className="text-slate-200">•</span>
          <div>
            <span className="text-slate-400 mr-1">용량:</span>
            <strong className="text-slate-800 font-bold">{stats.byteUtf8.toLocaleString()}</strong>B
          </div>
          <span className="text-slate-200">•</span>
          <div>
            <span className="text-slate-400 mr-1">읽기:</span>
            <strong className="text-slate-800 font-bold">약 {stats.readingTimeMinutes}</strong>분
          </div>
        </div>

        {detectionCount > 0 ? (
          <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-bold uppercase">
            {detectionCount}건 교정 필요
          </span>
        ) : (
          <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-bold uppercase">
            맞춤법 정상
          </span>
        )}
      </div>
    </div>
  );
};
