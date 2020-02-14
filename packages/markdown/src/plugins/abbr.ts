import { MarkdownPlugin } from '../models';
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
const abbr = require('markdown-it-abbr');

/**
 * Abbreviation (`<abbr>`) tag plugin.
 */
const plugin: MarkdownPlugin = {
  id: 'abbr',

  install: it => it.use(abbr),
};

export { plugin as PluginAbbr };
