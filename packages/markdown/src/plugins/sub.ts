import { MarkdownPlugin } from '../models';
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
const sub = require('markdown-it-sub');

/**
 * Subscript (`<sub>`) tag plugin.
 */
const plugin: MarkdownPlugin = {
  id: 'sub',

  install: it => it.use(sub),
};

export { plugin as PluginSub };
