/* eslint-disable init-declarations */
import { readSample, writeSample } from '../../scripts/samples';
import { Markdown, PluginAbbr, PluginIns, PluginMark, PluginSub, PluginSup } from '../../src';

describe('plugins/simples', () => {
  test('abbr', () => {
    const markdown = new Markdown().use(PluginAbbr);
    const { html } = markdown.parse(`
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
`);
    expect(html.trim()).toEqual(
      `
<p>The <abbr title="Hyper Text Markup Language">HTML</abbr> specification<br />
is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.</p>
`.trim(),
    );
  });

  test('ins', () => {
    const markdown = new Markdown().use(PluginIns);
    const { html } = markdown.parse('++inserted++');
    expect(html).toMatch('<ins>inserted</ins>');
  });

  test('mark', () => {
    const markdown = new Markdown().use(PluginMark);
    const { html } = markdown.parse('==marked==');
    expect(html).toMatch('<mark>marked</mark>');
  });

  test('sub', () => {
    const markdown = new Markdown().use(PluginSub);
    const { html } = markdown.parse('H~2~O');
    expect(html).toMatch('H<sub>2</sub>O');
  });

  test('sup', () => {
    const markdown = new Markdown().use(PluginSup);
    const { html } = markdown.parse('29^th^');
    expect(html).toMatch('29<sup>th</sup>');
  });
});
