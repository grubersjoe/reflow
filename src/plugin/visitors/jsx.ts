import { JSX } from '@babel/types';

import { VisitorFunction } from '../types';
import { FileTypes } from '../util/file';

export const jsxVisitor: VisitorFunction<JSX> = (path, state): void => {
  // Files using JSX need to get the ".tsx" file extension
  if (state.filename) {
    FileTypes.set(state.filename, '.tsx');
  }
};
