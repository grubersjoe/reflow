import { VisitNodeFunction } from '@babel/traverse';
import {
  Flow,
  isOpaqueType,
  isTypeAlias,
  isTypeAnnotation,
  isDeclareOpaqueType,
  isInterfaceDeclaration,
  isTypeParameterDeclaration,
} from '@babel/types';

import { PluginWarnings, WARNINGS } from '../warnings';
import { convertInterfaceDeclaration } from '../converters/interface';
import { convertDeclareOpaqueType, convertOpaqueType } from '../converters/opaque-type';
import { convertTypeAlias } from '../converters/type-alias';
import { convertTypeAnnotation } from '../converters/type-annotation';
import { convertTypeParameterDeclaration } from '../converters/type-parameter';

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

  if (isDeclareOpaqueType(node)) {
    path.replaceWith(convertDeclareOpaqueType(node));
  }

  if (isOpaqueType(node)) {
    PluginWarnings.enable(WARNINGS.OpaqueType);
    path.replaceWith(convertOpaqueType(node));
  }

  if (isTypeParameterDeclaration(node)) {
    path.replaceWith(convertTypeParameterDeclaration(node) || path);
  }
};
