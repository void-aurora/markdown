import { readSample, writeSample } from '../scripts/samples';
import { Markdown } from '../src';

describe('markdown.ts', () => {
  test('render', async () => {
    const markdown = new Markdown();
    await Promise.all(
      ['commitlint-config', 'eslint-config', 'prettier-config', 'stylelint-config', 'toolkit']
        .map(n => `generals/${n}`)
        .map(async filename => {
          const src = await readSample(`${filename}.md`);
          const data = markdown.parse(src);
          const html = markdown.render(src);
          await writeSample(`${filename}.json`, JSON.stringify(data, null, '  '));
          await writeSample(`${filename}.html`, html);
          expect(typeof html).toEqual('string');
          expect(data.html).toEqual(html);
        }),
    );
  });
});
