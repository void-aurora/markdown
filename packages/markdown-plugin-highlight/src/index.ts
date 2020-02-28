/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable no-param-reassign */
import { Token, MarkdownPlugin } from '@void-aurora/markdown';
import { render } from './prism';
import { normalizeLang } from './normalize';

// hljsDefineVue(hljs);

export interface PluginHighlightOptions {
  /**
   * The CSS class name of `<pre>` tag.
   * @default 'prism'
   */
  className?: string | string[];

  /**
   * The CSS class name prefix of `<pre>` tag for wrapping language name.
   * @default 'language-'
   */
  classNamePrefix?: string;

  /**
   * Add line numbers to highlighted code or not.
   * @default false
   */
  lineNumbers?: boolean;

  /**
   * The function for wrapping highlighted code text.
   * @default (attrs, highlightedCode) => `<pre ${attrs}><code>${code}</code></pre>`
   */
  wrap?: (attrs: string, highlightedCode: string) => string;
}

const defaultOptions: Required<PluginHighlightOptions> = {
  className: 'prism',
  classNamePrefix: 'language-',
  lineNumbers: false,
  wrap: (attrs, highlightedCode) => `<pre${attrs}><code>${highlightedCode}</code></pre>`,
};

// TODO: Compatibility to markdown-it-container
const plugin: MarkdownPlugin<PluginHighlightOptions> = {
  id: 'highlight',

  install: (it, options = {}) => {
    const {
      renderer: {
        rules: { fence },
      },
    } = it;

    const { className: classNameRaw, classNamePrefix, lineNumbers, wrap } = {
      ...defaultOptions,
      ...options,
    };
    const className = Array.isArray(classNameRaw) ? classNameRaw.join(' ') : classNameRaw;

    it.renderer.rules.fence = (tokens, index, itOptions, env, self) => {
      const { [index]: token } = tokens;

      const language = normalizeLang(token.info);

      token.attrJoin('class', className);
      token.attrJoin('class', `${classNamePrefix}${language}`);
      const attrs = self.renderAttrs(token);

      let code = render(token.content, language, {
        lineNumbers,
      });
      if (code === '') {
        code = it.utils.escapeHtml(token.content);
      }

      return `${wrap(attrs, code).trim()}\n`;
    };
  },
};

export { plugin as PluginHighlight };
export default plugin;
