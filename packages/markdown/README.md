# @void-aurora/markdown

Markdown renderer based on markdown-it and highlight.js.

## Plugins

### Uss plugins

```js
import { Markdown, PluginTitle } from '@void-aurora/markdown';

const src = `
# This is title
This is the first paragraph.
`;

const md = new Markdown();
md.use(PluginTitle, { hideHeading1: true });

const { meta, html } = md.parse(src);

console.log(meta);
// { title: "This is title" }

console.log(html);
// <p>This is the first paragraph.</p>
```

### All Plugins

| Plugin           | Description                                 |
| ---------------- | ------------------------------------------- |
| PluginAbbr       | Abbreviation (`<abbr>`) tag plugin.         |
| PluginIns        | `<ins>` tag plugin.                         |
| PluginMark       | Mark text (`<mark>`) tag plugin.            |
| PluginSub        | Subscript (`<sub>`) tag plugin.             |
| PluginSup        | Superscript (`<sup>`) tag plugin.           |
| PluginTitle      | Extract the document title to `meta.title`. |
| PluginLineNumber | Add line number to each block elements.     |
| PluginAnchor     | _WIP_                                       |
| PluginTOC        | _WIP_                                       |
| PluginHighlight  | _WIP_                                       |
| PluginEmoji      | _WIP_                                       |
