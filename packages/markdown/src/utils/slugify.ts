/* eslint-disable no-useless-escape */
/* eslint-disable require-unicode-regexp */

/**
 * The github style heading slugify function.
 * Converts heading content to HTML id for anchor.
 * @param heading the heading content
 */
export function githubSlugify(heading: string): string {
  // from vscode/extensions/markdown-language-features/src/slugify.ts
  // TODO: need `encodeURI()`?
  return heading
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace whitespace with -
    .replace(
      /[\]\[\!\'\#\$\%\&\(\)\*\+\,\.\/\:\;\<\=\>\?\@\\\^\_\{\|\}\~\`。，、；：？！…—·ˉ¨‘’“”々～‖∶＂＇｀｜〃〔〕〈〉《》「」『』．〖〗【】（）［］｛｝]/g,
      '',
    ) // Remove known punctuators
    .replace(/^\-+/, '') // Remove leading -
    .replace(/\-+$/, ''); // Remove trailing -
}
