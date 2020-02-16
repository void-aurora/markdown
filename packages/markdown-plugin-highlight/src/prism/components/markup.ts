/* eslint-disable no-param-reassign */
import { PrismComponent } from '../models';

export const markup: PrismComponent = prism => {
  prism.languages.htm = prism.languages.html;
  prism.languages.xhtml = prism.languages.html;
};
