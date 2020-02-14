import { githubSlugify } from '../../src';

describe('utils/slugify.ts', () => {
  test('githubSlugify', () => {
    [
      ['@void-aurora/eslint-config', 'void-auroraeslint-config'],
      ['Usage', 'usage'],
      ['Parsing error related to project config', 'parsing-error-related-to-project-config'],
      ['Install', 'install'],
      ['Config file', 'config-file'],

      ['@vue/cli-plugin-typescript', 'vuecli-plugin-typescript'],
      ['配置', '配置'],
      ['注入的命令', '注入的命令'],
      ['缓存', '缓存'],
      ['并行执行', '并行执行'],
      ['在已创建的项目中安装', '在已创建的项目中安装'],
      ['注入的 webpack-chain 规则', '注入的-webpack-chain-规则'],
    ].forEach(([content, id]) => {
      expect(githubSlugify(content)).toEqual(id);
    });
  });
});
