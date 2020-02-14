/* eslint-disable no-useless-escape */
/* eslint-disable require-unicode-regexp */

export function slugify(heading: string): string {
  // from vscode/extensions/markdown-language-features/src/slugify.ts
  return encodeURI(
    heading
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace whitespace with -
      .replace(
        /[\]\[\!\'\#\$\%\&\(\)\*\+\,\.\/\:\;\<\=\>\?\@\\\^\_\{\|\}\~\`。，、；：？！…—·ˉ¨‘’“”々～‖∶＂＇｀｜〃〔〕〈〉《》「」『』．〖〗【】（）［］｛｝]/g,
        '',
      ) // Remove known punctuators
      .replace(/^\-+/, '') // Remove leading -
      .replace(/\-+$/, ''), // Remove trailing -
  );
}
