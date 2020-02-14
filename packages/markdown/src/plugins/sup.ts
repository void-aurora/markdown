import { MarkdownPlugin } from '../models';
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
const sup = require('markdown-it-sup');

/**
 * Superscript (`<sup>`) tag plugin.
 */
const plugin: MarkdownPlugin = {
  id: 'sup',

  install: it => it.use(sup),
};

export { plugin as PluginSup };
