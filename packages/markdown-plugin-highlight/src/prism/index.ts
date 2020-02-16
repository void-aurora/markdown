/* eslint-disable import/no-unassigned-import */
import { Prism } from './core';

import * as allAdditionalComponents from './components';

Object.values(allAdditionalComponents).forEach(comp => comp(Prism));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Prism as any).manual = true;

export { Prism };
export * from './renderer';
