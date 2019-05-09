import { JSX } from '@babel/types';

import { VisitorFunction } from '../types';
import { Metrics } from '../util/metric';

// Files using JSX need to get the ".tsx" file extension
export const jsxVisitor: VisitorFunction<JSX> = (path, state): void => {
  if (state.filename) {
    Metrics.fileTypes.set(state.filename, '.tsx');
  }
};
