import { VisitNodeFunction } from '@babel/traverse';
import { Flow, isOpaqueType, isTypeAlias, isTypeAnnotation } from '@babel/types';

import { convertTypeAlias } from '../converters/type-alias';
import { convertTypeAnnotation } from '../converters/type-annotation';
import { convertOpaqueType } from '../converters/opaque-type';

export const flowVisitor: VisitNodeFunction<object, Flow> = (path): void => {
  const { node } = path;

  if (isTypeAlias(node)) {
    path.replaceWith(convertTypeAlias(node));
  }

  if (isTypeAnnotation(node)) {
    path.replaceWith(convertTypeAnnotation(node));
  }

  if (isOpaqueType(node)) {
    path.replaceWith(convertOpaqueType(node));
  }
};
