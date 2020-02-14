import { MarkdownIt, Token, MarkdownOptions, MarkdownData, MarkdownPlugin } from './models';

export class Markdown {
  public static get defaultOptions(): Readonly<Required<MarkdownOptions>> {
    return {
      html: true,
      htmlBlacklist: ['base', 'head', 'link', 'meta', 'title', 'style', 'script'],
      lineBreaks: true,
    };
  }

  private readonly options: Readonly<Required<MarkdownOptions>>;
  private readonly it: MarkdownIt;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly plugins: [MarkdownPlugin, any][] = [];

  constructor(options?: MarkdownOptions) {
    const { defaultOptions } = Markdown;
    this.options = {
      ...defaultOptions,
      ...options,
    };

    const { markdownItOptions } = this;
    this.it = MarkdownIt(markdownItOptions);
  }

  /**
   * Pipe function for installing a plugin
   * @param plugin the plugin object
   * @param options the options for plugin
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public use<TOptions = any, TMeta = any>(
    plugin: MarkdownPlugin<TOptions, TMeta>,
    options?: TOptions,
  ): this {
    if (this.plugins.some(([p]) => p === plugin)) {
      return this;
    }

    if (this.plugins.some(([p]) => p.id === plugin.id)) {
      throw new Error(`Duplicated plugin ID: ${plugin.id}.`);
    }

    this.plugins.push([plugin, options]);
    if (plugin.install) {
      plugin.install(this.it, options);
    }

    return this;
  }

  public getPluginIds(): string[] {
    return this.plugins.map(([p]) => p.id);
  }

  private get markdownItOptions(): MarkdownIt.Options {
    const {
      options: { html, lineBreaks: breaks },
    } = this;
    const markdownItOptions: MarkdownIt.Options = {
      html,
      xhtmlOut: true,
      breaks,

      langPrefix: 'hljs ',

      linkify: true,
    };

    return markdownItOptions;
  }

  public parse(source: string): MarkdownData {
    const meta: MarkdownData['meta'] = {};
    const tokens = this.it.parse(source, {});

    // Generates meta data
    this.plugins.forEach(([plugin, config]) => {
      if (plugin.meta) {
        meta[plugin.id] = plugin.meta(tokens, config);
      }
    });

    const html = this.it.renderer.render(tokens, this.markdownItOptions, {});

    return {
      meta,
      tokens,
      html,
    };
  }

  public render(source: string | Token[]): string {
    if (typeof source === 'string') {
      return this.parse(source).html;
    }
    return this.it.renderer.render(source, this.markdownItOptions, {});
  }
}
