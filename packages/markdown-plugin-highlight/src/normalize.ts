/* eslint-disable prefer-named-capture-group */
/* eslint-disable require-unicode-regexp */

const REGEX_LINE_START = /\[(\d+)\]/g;
const REGEX_HIGHLIGHT_LINES = /{([\d,-]+)}/g;

const langMap: Record<string, string> = {
  'c++': 'cpp',
  'c#': 'csharp',
};

export interface FenceInfo {
  language: string;
  lineStart: number;
  highlightLines: number[];
}

export function normalizeInfo(info: string): FenceInfo {
  const language = info
    .replace(REGEX_HIGHLIGHT_LINES, '')
    .replace(REGEX_LINE_START, '')
    .trim()
    .split(/\s+/g)[0];

  const lineStart = Number.parseInt(REGEX_LINE_START.exec(info)?.[1] ?? '0', 10);
  const highlightLines = [
    ...(
      REGEX_HIGHLIGHT_LINES.exec(info)?.[1]
        ?.split(',')
        .map(s => s.split('-').map(n => Number.parseInt(n, 10))) ?? []
    ).reduce((set, [start, end]) => {
      if (typeof end !== 'number' || end <= start) {
        set.add(start);
        return set;
      }
      for (let i = start; i <= end; i++) {
        set.add(i);
      }
      return set;
    }, new Set<number>()),
  ].sort((a, b) => a - b);

  return {
    language: langMap[language] ?? language,
    lineStart,
    highlightLines,
  };
}
