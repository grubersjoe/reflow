import {
  Flow,
  isDeclareOpaqueType,
  isInterfaceDeclaration,
  isOpaqueType,
  isTypeAlias,
  isTypeAnnotation,
  isTypeCastExpression,
  isTypeParameterDeclaration,
} from '@babel/types';

import { VisitorFunction } from '../types';
import { PluginWarnings, WARNINGS } from '../warnings';

import { convertInterfaceDeclaration } from '../converters/interface';
import { convertDeclareOpaqueType, convertOpaqueType } from '../converters/opaque';
import { convertTypeAlias } from '../converters/type-alias';
import { convertTypeAnnotation } from '../converters/type-annotation';
import { convertTypeCastExpression } from '../converters/type-cast';
import { convertTypeParameterDeclaration } from '../converters/type-parameter';

export const flowVisitor: VisitorFunction<Flow> = (path): void => {
  const { node } = path;

  // TODO: Go through all Flow type nodes and check out which ones need to be handled!

  if (isInterfaceDeclaration(node)) {
    path.replaceWith(convertInterfaceDeclaration(node));
  }

  if (isTypeAlias(node)) {
    path.replaceWith(convertTypeAlias(node, path));
  }

  if (isTypeAnnotation(node)) {
    path.replaceWith(convertTypeAnnotation(node));
  }

  if (isTypeCastExpression(node)) {
    path.replaceWith(convertTypeCastExpression(node));
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
