import { MarkdownPlugin } from '../models';
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
const ins = require('markdown-it-ins');

/**
 * `<ins>` tag plugin.
 */
const plugin: MarkdownPlugin = {
  id: 'ins',

  install: it => it.use(ins),
};

export { plugin as PluginIns };
