/* eslint-disable no-param-reassign */
import { PrismComponent } from '../models';

export const react: PrismComponent = prism => {
  prism.languages.react = prism.languages.jsx;
  prism.languages.javascriptreact = prism.languages.jsx;
  prism.languages.typescriptreact = prism.languages.tsx;
};
