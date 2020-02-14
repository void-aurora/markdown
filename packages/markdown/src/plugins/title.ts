/* eslint-disable no-param-reassign */
import { Token, MarkdownPlugin } from '../models';

export interface PluginTitleOptions {
  /**
   * Disable heading 1 rendering or not.
   * @default true
   */
  hideHeading1?: boolean;
}

const defaultOptions: Required<PluginTitleOptions> = {
  hideHeading1: true,
};

const predicateH1 = (t: Token): boolean => t.type === 'heading_open' && t.tag === 'h1';

/**
 * Features:
 * - Extract the document title to `meta.title`.
 * - Remove `<h1>` for output (can be disable by `hideHeading1: false`).
 */
const plugin: MarkdownPlugin<PluginTitleOptions, string> = {
  id: 'title',
  install: (it, options) => {
    const { hideHeading1 } = {
      ...defaultOptions,
      ...options,
    };

    it.core.ruler.push('plugin-title', ({ tokens }) => {
      const openIndex = tokens.findIndex(predicateH1);
      if (openIndex > -1) {
        const { [openIndex]: open, [openIndex + 1]: inline, [openIndex + 2]: close } = tokens;

        inline.content = inline.children.reduce((arr, cur) => `${arr}${cur.content}`, '');

        if (hideHeading1) {
          open.hidden = true;
          inline.hidden = true;
          // inline.children.forEach(c => (c.hidden = true));
          inline.children = [];
          close.hidden = true;
        }
      }
    });
  },

  meta: tokens => {
    const openIndex = tokens.findIndex(predicateH1);
    if (openIndex > -1) {
      const { [openIndex + 1]: inline } = tokens;
      return inline.content;
    }
    return '';
  },
};

export { plugin as PluginTitle };
