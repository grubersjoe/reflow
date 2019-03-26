import { VisitNodeFunction } from '@babel/traverse';
import {
  Flow,
  isOpaqueType,
  isTypeAlias,
  isTypeAnnotation,
  isDeclareOpaqueType,
  isInterfaceDeclaration,
} from '@babel/types';

import { convertTypeAlias } from '../converters/type-alias';
import { convertTypeAnnotation } from '../converters/type-annotation';
import { convertDeclareOpaqueType, convertOpaqueType } from '../converters/opaque-type';
import { convertInterfaceDeclaration } from '../converters/interface';

export const flowVisitor: VisitNodeFunction<object, Flow> = (path): void => {
  const { node } = path;

  if (isInterfaceDeclaration(node)) {
    path.replaceWith(convertInterfaceDeclaration(node));
  }

  if (isTypeAlias(node)) {
    path.replaceWith(convertTypeAlias(node));
  }

  if (isTypeAnnotation(node)) {
    path.replaceWith(convertTypeAnnotation(node));
  }

  if (isOpaqueType(node)) {
    path.replaceWith(convertOpaqueType(node));
  }

  if (isDeclareOpaqueType(node)) {
    path.replaceWith(convertDeclareOpaqueType(node));
  }
};
