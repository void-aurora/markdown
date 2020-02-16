import { resolve } from 'path';
import fs from 'fs-extra';
import { Markdown } from '@void-aurora/markdown';
import { PluginHighlight } from './index';

const css = `
<link href="https://cdn.jsdelivr.net/npm/prismjs@1.19.0/themes/prism.css" rel="stylesheet" />
<link href="https://cdn.jsdelivr.net/npm/prismjs@1.19.0/plugins/line-numbers/prism-line-numbers.css" rel="stylesheet" />
<link href="https://cdn.jsdelivr.net/npm/prismjs@1.19.0/plugins/line-highlight/prism-line-highlight.css" rel="stylesheet" />
`;

async function read(filename: string): Promise<string> {
  return fs.readFile(resolve(__dirname, '..', 'samples', filename), 'utf-8');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function write(filename: string, data: any): Promise<void> {
  const path = resolve(__dirname, '..', 'samples', filename);
  return typeof data === 'string'
    ? fs.outputFile(path, `${css}\n${data}`)
    : fs.outputJSON(path, data, { spaces: 2 });
}

describe('Markdown Plugin Highlight', () => {
  test('default', async () => {
    await Promise.all(
      ['unknown', 'fakelang', 'lines', 'tsx', 'vue'].map(async name => {
        const md = new Markdown().use(PluginHighlight);
        const src = await read(`${name}.md`);
        const data = md.parse(src);

        await write(`${name}.html`, data.html);
        await write(`${name}.json`, data);

        expect(typeof data.html).toEqual('string');
      }),
    );
  });
});
