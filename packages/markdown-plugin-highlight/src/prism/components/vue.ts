/* eslint-disable no-param-reassign */
import { PrismComponent } from '../models';

export const vue: PrismComponent = prism => {
  prism.languages.vue = prism.languages.markup;
};
