module.exports = {
  '*.{js,jsx,mjs,ts,tsx}': 'eslint',

  '*.css': 'stylelint --allow-empty-input',
  '*.scss': 'stylelint --allow-empty-input --syntax=scss',

  '*.{js,jsx,mjs,ts,tsx,json,yaml,css,scss,less,html,vue,graphql,gql,md}': 'prettier --write',

  'package.json': 'prettier-package-json --write',
};
