import { TextStatistics, SpellDetection, SpellRule } from '../types';

export function calculateTextStatistics(text: string): TextStatistics {
  if (!text) {
    return {
      charWithSpaces: 0,
      charWithoutSpaces: 0,
      wordCount: 0,
      lineBreaks: 0,
      lineCount: 0,
      byteUtf8: 0,
      byteEucKr: 0,
      manuscriptPages: 0,
      readingTimeMinutes: 0,
    };
  }

  const charWithSpaces = text.length;
  const charWithoutSpaces = text.replace(/\s/g, '').length;

  // 단어(어절) 수 계산
  const trimmed = text.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;

  // 줄 바꿈 횟수 (개행 문자 수)
  const lineBreaks = (text.match(/\n/g) || []).length;
  const lineCount = text.split('\n').length;

  // 바이트 수 (UTF-8)
  let byteUtf8 = 0;
  try {
    byteUtf8 = new TextEncoder().encode(text).length;
  } catch {
    byteUtf8 = encodeURI(text).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1;
  }

  // 바이트 수 (EUC-KR / 한국 채용사이트 기준: 한글 2바이트, 영문/숫자/공백 1바이트)
  let byteEucKr = 0;
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    // 한글 음절 및 특수문자
    if (code > 127) {
      byteEucKr += 2;
    } else {
      byteEucKr += 1;
    }
  }

  // 200자 원고지 (공백 포함 기준)
  const manuscriptPages = +(charWithSpaces / 200).toFixed(1);

  // 성인 평균 분당 400~500자 독서 기준
  const readingTimeMinutes = +(charWithoutSpaces / 450).toFixed(1);

  return {
    charWithSpaces,
    charWithoutSpaces,
    wordCount,
    lineBreaks,
    lineCount,
    byteUtf8,
    byteEucKr,
    manuscriptPages,
    readingTimeMinutes,
  };
}

export function detectSpellingErrors(text: string, rules: SpellRule[]): SpellDetection[] {
  if (!text) return [];

  const detections: SpellDetection[] = [];

  for (const rule of rules) {
    let regex: RegExp;
    if (typeof rule.pattern === 'string') {
      regex = new RegExp(rule.pattern, 'g');
    } else {
      // Create new RegExp to reset lastIndex
      regex = new RegExp(rule.pattern.source, rule.pattern.flags || 'g');
    }

    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const wrongText = match[0];
      
      // Check if match was empty to prevent infinite loop
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // Calculate the specific replacement based on the matched text
      let specificCorrection = rule.correct;
      // Handle context-specific endings if needed, or rule default
      if (rule.id === 'an-dwae') {
        // e.g., match is "안되요" -> "안돼요", "안되어서" -> "안돼서", "안되면" -> "안되면" (not an error if 면)
        if (wrongText.endsWith('면')) {
          continue; // "안되면" is actually correct!
        }
        if (wrongText === '안되요') specificCorrection = '안돼요';
        else if (wrongText === '안되서') specificCorrection = '안돼서';
        else if (wrongText === '안되서요') specificCorrection = '안돼서요';
        else if (wrongText === '안되었') specificCorrection = '안됐';
        else if (wrongText === '안되었어') specificCorrection = '안됐어';
        else if (wrongText === '안되었음') specificCorrection = '안됐음';
        else if (wrongText === '안되었네') specificCorrection = '안됐네';
        else if (wrongText === '안되었다') specificCorrection = '안됐다';
      }

      detections.push({
        id: `${rule.id}-${match.index}-${wrongText}`,
        ruleId: rule.id,
        wrong: wrongText,
        correct: specificCorrection,
        explanation: rule.explanation,
        tip: rule.tip,
        index: match.index,
        length: wrongText.length,
        category: rule.category,
      });
    }
  }

  // Sort by index in text
  return detections.sort((a, b) => a.index - b.index);
}

export function autoCorrectAll(text: string, detections: SpellDetection[]): string {
  if (!text || detections.length === 0) return text;

  // Apply fixes from back to front so indices remain valid
  const sorted = [...detections].sort((a, b) => b.index - a.index);
  let result = text;

  for (const item of sorted) {
    const before = result.substring(0, item.index);
    const after = result.substring(item.index + item.length);
    result = before + item.correct + after;
  }

  return result;
}
