import { Prism } from './core';

/**
 * Properties of prism language map protocol are not language grammar.
 */
const BLACKLIST = ['extend', 'insertBefore', 'DFS'];

export interface RenderOptions {
  /**
   * Add line numbers to the highlight html.
   */
  lineNumbers?: boolean;
}

// TODO: lineNumbers, highlightLines
/**
 * Render the source code to highlight html.
 * If non-supported language, return empty string.
 * @param src the source code text
 * @param language the language name
 * @param options options
 */
export function render(src: string, language: string, options: RenderOptions = {}): string {
  const { lineNumbers = false } = options;

  if (BLACKLIST.includes(language) || !(language in Prism.languages)) {
    return '';
  }

  return Prism.highlight(src, Prism.languages[language], language);
}
