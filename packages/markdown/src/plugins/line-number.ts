/* eslint-disable no-param-reassign */
import { Token, MarkdownPlugin } from '../models';

export interface PluginLineNumberOptions {
  /**
   * HTML attribute name for storing line number.
   * @default 'data-line'
   */
  attr?: string;

  /**
   * CSS class name for appending to elements.
   * @default 'code-line'
   */
  className?: string;

  /**
   * Extra token types, uses for other markdown-it plugins.
   */
  extraTokenTypes?: string[];
}

const defaultOptions: Required<PluginLineNumberOptions> = {
  attr: 'data-line',
  className: 'code-line',
  extraTokenTypes: [],
};

const tokenTypesToAddLineNumber = [
  'heading_open',
  'paragraph_open',

  'code_block',
  'fence',

  'blockquote_open',
  'list_item_open',
  'table_open',
];

function markRecursively(
  tokens: Token[],
  attr: string,
  className: string,
  extraTokenTypes: string[],
): void {
  tokens.forEach(token => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (token.children) {
      markRecursively(token.children, attr, className, extraTokenTypes);
    }

    if (
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      token.map &&
      token.map.length > 0 &&
      (tokenTypesToAddLineNumber.includes(token.type) || extraTokenTypes.includes(token.type))
    ) {
      token.attrSet(attr, `${token.map[0]}`);
      token.attrJoin('class', className);
    }
  });
}

const plugin: MarkdownPlugin<PluginLineNumberOptions> = {
  id: 'line-number',

  install: (it, options) => {
    const { attr, className, extraTokenTypes } = {
      ...defaultOptions,
      ...options,
    };

    it.core.ruler.push('plugin-line-number', ({ tokens }) => {
      markRecursively(tokens, attr, className, extraTokenTypes);
    });
  },
};

export { plugin as PluginLineNumber };
