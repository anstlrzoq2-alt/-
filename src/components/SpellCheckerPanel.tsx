import React, { useState } from 'react';
import {
  Wand2,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SpellDetection } from '../types';

interface SpellCheckerPanelProps {
  detections: SpellDetection[];
  onFixAll: () => void;
  onFixSingle: (detection: SpellDetection) => void;
  hasText: boolean;
}

export const SpellCheckerPanel: React.FC<SpellCheckerPanelProps> = ({
  detections,
  onFixAll,
  onFixSingle,
  hasText,
}) => {
  const [showAllTips, setShowAllTips] = useState(false);

  return (
    <div className="bg-slate-900 rounded-2xl p-5 sm:p-6 text-white flex flex-col border border-slate-800 shadow-sm flex-1">
      {/* Bento 헤더: 황색 점 인디케이터 + 맞춤법 도우미 라벨 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
            맞춤법 도우미
          </h2>
        </div>

        {detections.length > 0 ? (
          <span className="text-[10px] px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full font-bold uppercase tracking-wide">
            {detections.length}건 감지
          </span>
        ) : hasText ? (
          <span className="text-[10px] px-2 py-0.5 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 rounded-full font-bold uppercase tracking-wide flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            정상
          </span>
        ) : null}
      </div>

      {/* 실시간 감지된 맞춤법 오류 및 원클릭 교정 영역 */}
      {detections.length > 0 && (
        <div className="mb-4 space-y-2.5">
          <button
            type="button"
            onClick={onFixAll}
            className="w-full py-2 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>발견된 맞춤법 한 번에 모두 교정 ({detections.length}건)</span>
          </button>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {detections.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex flex-col gap-1.5 transition hover:border-slate-600"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 text-xs font-bold text-rose-300 bg-rose-950/70 border border-rose-800/60 rounded line-through">
                      {item.wrong}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span className="px-2 py-0.5 text-xs font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-800/60 rounded">
                      {item.correct}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-700/60 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onFixSingle(item)}
                    className="px-2.5 py-1 text-xs font-semibold text-indigo-200 bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-700/50 rounded-lg transition active:scale-95 shrink-0"
                  >
                    교정
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.explanation}
                </p>

                {item.tip && (
                  <p className="text-[11px] text-amber-300 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{item.tip}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 텍스트가 있는데 오류가 없는 경우 알림 */}
      {hasText && detections.length === 0 && (
        <div className="p-3 mb-4 bg-slate-800/80 rounded-xl border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>자주 틀리는 맞춤법 및 띄어쓰기 오류가 발견되지 않았습니다.</span>
        </div>
      )}

      {/* Tip Container (Bento Grid Style) */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          자주 틀리는 맞춤법 가이드
        </span>
        <button
          type="button"
          onClick={() => setShowAllTips(!showAllTips)}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-0.5 transition"
        >
          <span>{showAllTips ? '접기' : '더보기'}</span>
          {showAllTips ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </button>
      </div>

      <div id="tip-container" className="space-y-3 overflow-y-auto pr-1 flex-1 max-h-80">
        {/* Tip 1: 자주 틀리는 표현 */}
        <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
          <p className="text-xs text-amber-400 font-bold mb-1">자주 틀리는 표현</p>
          <p className="text-sm text-slate-300 leading-relaxed">
            '안되요'가 아닌 <span className="text-white font-bold">'안돼요'</span>가 올바른 표현입니다.
            <br />
            <span className="text-xs text-slate-400">('되'에는 '하', '돼'에는 '해'를 대입: 안해요(O) ➔ 안돼요)</span>
          </p>
        </div>

        {/* Tip 2: 띄어쓰기 팁 */}
        <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
          <p className="text-xs text-blue-400 font-bold mb-1">띄어쓰기 팁</p>
          <p className="text-sm text-slate-300 leading-relaxed">
            의존 명사(것, 수, 데 등)는 앞 단어와 띄어 써야 합니다.
            <br />
            <span className="text-xs text-slate-400">(예: 할수있다(X) ➔ <span className="text-white font-bold">할 수 있다(O)</span>)</span>
          </p>
        </div>

        {/* Tip 3: 어휘 선택 */}
        <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
          <p className="text-xs text-emerald-400 font-bold mb-1">어휘 선택</p>
          <p className="text-sm text-slate-300 leading-relaxed">
            '어이없다'를 '어이업다'나 '어의없다'로 쓰지 않도록 주의하세요.
          </p>
        </div>

        {/* 펼쳤을 때 추가 팁들 */}
        {showAllTips && (
          <>
            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
              <p className="text-xs text-indigo-400 font-bold mb-1">날짜 표기</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                '몇 일'이란 단어는 표준어에 없습니다. 무조건 <span className="text-white font-bold">'며칠'</span>로 씁니다.
              </p>
            </div>

            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
              <p className="text-xs text-purple-400 font-bold mb-1">'왠'과 '웬' 구별</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                '왜 그런지'의 준말인 <span className="text-white font-bold">'왠지'</span> 하나만 '왠'이고, 나머지는 전부 <span className="text-white font-bold">'웬'</span>입니다. (웬일, 웬만하면)
              </p>
            </div>

            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
              <p className="text-xs text-cyan-400 font-bold mb-1">경제 vs 서류</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                돈/카드 지불은 <span className="text-white font-bold">결제</span>, 상사 서류 승인은 <span className="text-white font-bold">결재</span>입니다.
              </p>
            </div>

            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
              <p className="text-xs text-rose-400 font-bold mb-1">회복 vs 출산</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                병이 회복되는 것은 <span className="text-white font-bold">낫다</span>, 아이나 결과를 내는 것은 <span className="text-white font-bold">낳다</span>입니다.
              </p>
            </div>
          </>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-800 text-[10px] text-slate-500">
        * 위 내용은 일반적인 맞춤법 가이드입니다.
      </div>
    </div>
  );
};
