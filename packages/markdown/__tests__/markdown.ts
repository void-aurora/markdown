import { readSample, writeSample } from '../scripts/samples';
import { Markdown, PluginTitle } from '../src';

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
          const htmlFromTokens = markdown.render(data.tokens);

          await writeSample(`${filename}.json`, JSON.stringify(data, null, '  '));
          await writeSample(`${filename}.html`, html);

          expect(typeof html).toEqual('string');
          expect(data.html).toEqual(html);
          expect(html).toEqual(htmlFromTokens);
        }),
    );
  });

  test('plugin duplicated', () => {
    const markdown = new Markdown();
    markdown.use(PluginTitle).use(PluginTitle);
    expect(markdown.getPluginIds()).toEqual(['title']);
  });

  test('plugin id duplicated', () => {
    const markdown = new Markdown();
    expect(() =>
      markdown.use(PluginTitle).use({
        id: 'title',
        install: () => {},
      }),
    ).toThrow(new Error('Duplicated plugin ID: title.'));
  });
});
