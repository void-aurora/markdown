/* eslint-disable prefer-named-capture-group */
/* eslint-disable require-unicode-regexp */

const langMap: Record<string, string> = {
  'c++': 'cpp',
  'c#': 'csharp',
};

export function normalizeLang(info?: string): string {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!info) {
    return 'none';
  }
  const language = info
    .trim()
    .split(/\s+/g)[0]
    .toLowerCase();
  return langMap[language] ?? language;
}
