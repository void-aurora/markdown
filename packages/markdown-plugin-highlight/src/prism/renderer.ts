import { Prism } from './core';

/**
 * Properties of prism language map protocol are not language grammar.
 */
const BLACKLIST = ['extend', 'insertBefore', 'DFS'];

// TODO: lineNumbers, highlightLines
export function render(
  src: string,
  language: string,
  options: {
    lineNumbers?: boolean;
    lineStart?: number;
    highlightLines?: number[];
  } = {},
): string {
  const { lineNumbers = false, lineStart = 1, highlightLines = [] } = options;

  if (BLACKLIST.includes(language)) {
    return '';
  }

  if (language in Prism.languages) {
    return Prism.highlight(src, Prism.languages[language], language);
  }

  return '';
}
