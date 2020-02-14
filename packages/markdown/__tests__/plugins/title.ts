/* eslint-disable init-declarations */
import { readSample, writeSample } from '../../scripts/samples';
import { Markdown, PluginTitle } from '../../src';

let src: string;
let title: string;

describe('plugins/title.ts', () => {
  beforeAll(async () => {
    src = await readSample('title/1.md');
    title = src.split('\n')[0].replace('# ', '');

    const markdown = new Markdown().use(PluginTitle);
    const data = markdown.parse(src);
    const html = markdown.render(src);
    await writeSample('title/1.json', JSON.stringify(data, null, '  '));
    await writeSample('title/1.html', html);
  });

  test('default', () => {
    const markdown = new Markdown().use(PluginTitle);
    const data = markdown.parse(src);
    expect(data.meta.title).toEqual(title);
    expect(data.html.includes(title)).toEqual(false);
  });

  test('hideHeading1: true', () => {
    const markdown = new Markdown().use(PluginTitle, { hideHeading1: true });
    const data = markdown.parse(src);
    expect(data.meta.title).toEqual(title);
    expect(data.html.includes(title)).toEqual(false);
  });

  test('hideHeading1: false', () => {
    const markdown = new Markdown().use(PluginTitle, { hideHeading1: false });
    const data = markdown.parse(src);
    expect(data.meta.title).toEqual(title);
    expect(data.html.includes(`<h1>${title}</h1>`)).toEqual(true);
  });

  test('no title', async () => {
    const markdown = new Markdown().use(PluginTitle);
    const data = markdown.parse(await readSample('title/no-title.md'));
    expect(data.meta.title).toEqual('');
  });
});
