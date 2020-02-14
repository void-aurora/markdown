/* eslint-disable init-declarations */
import { readSample, writeSample } from '../../scripts/samples';
import { Markdown, PluginLineNumber } from '../../src';

describe('plugins/line-number.ts', () => {
  test('default', async () => {
    const markdown = new Markdown().use(PluginLineNumber);
    const src = await readSample('line-number/1.md');
    const data = markdown.parse(src);

    await writeSample('line-number/1.json', JSON.stringify(data, null, '  '));
    await writeSample('line-number/1.html', data.html);

    expect(data.html).toMatch('<h1 data-line="0" class="code-line">');
    expect(data.html).toMatch('<h2 data-line="9" class="code-line">');
    expect(data.html).toMatch(
      '<p data-line="21" class="code-line">Some basic Git commands are:</p>',
    );

    expect(data.html).toMatch('<pre><code data-line="23" class="code-line hljs sh">');

    expect(data.html).toMatch('<p data-line="15" class="code-line">Pardon my French</p>');
    expect(data.html).toMatch('<li data-line="55" class="code-line">Second nested list item</li>');
    expect(data.html).toMatch('<table data-line="4" class="code-line">');
  });
});
