import { VisitNodeFunction } from '@babel/traverse';
import { TypeAlias } from '@babel/types';

import { convertTypeAlias } from '../converters/type-alias';

export const typeAliasVisitor: VisitNodeFunction<object, TypeAlias> = (path): void => {
  path.replaceWith(convertTypeAlias(path.node));
};
