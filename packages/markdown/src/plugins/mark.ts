import { MarkdownPlugin } from '../models';
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
const mark = require('markdown-it-mark');

/**
 * Mark text  (`<mark>`) tag plugin.
 */
const plugin: MarkdownPlugin = {
  id: 'mark',

  install: it => it.use(mark),
};

export { plugin as PluginMark };
