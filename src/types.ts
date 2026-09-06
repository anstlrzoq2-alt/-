export interface SpellRule {
  id: string;
  pattern: RegExp | string;
  wrong: string;
  correct: string;
  explanation: string;
  tip?: string;
  category: '맞춤법' | '어휘혼동' | '띄어쓰기' | '외래어';
}

export interface SpellDetection {
  id: string;
  ruleId: string;
  wrong: string;
  correct: string;
  explanation: string;
  tip?: string;
  index: number;
  length: number;
  category: string;
}

export interface TextStatistics {
  charWithSpaces: number;
  charWithoutSpaces: number;
  wordCount: number;
  lineBreaks: number;
  lineCount: number;
  byteUtf8: number;
  byteEucKr: number;
  manuscriptPages: number;
  readingTimeMinutes: number;
}
