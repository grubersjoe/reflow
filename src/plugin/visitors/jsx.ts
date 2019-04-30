import { JSX } from '@babel/types';

import { VisitorFunction } from '../types';
import { Metrics } from '../util/metric';

/**
 * To avoid syntax errors when using angle brackets it's important to give
 * output TypeScript code the "correct" file extension (.ts vs .tsx).
 *
 * So track which files are actually using JSX.
 */
export const jsxVisitor: VisitorFunction<JSX> = (path, state): void => {
  if (state.filename) {
    Metrics.jsxFiles.add(state.filename);
  }
};
