import {
  isDeclareClass,
  isDeclareFunction,
  isDeclareInterface,
  isDeclareOpaqueType,
  isDeclareTypeAlias,
  isInterfaceDeclaration,
  isOpaqueType,
  isTypeAlias,
  isTypeAnnotation,
  isTypeCastExpression,
  isTypeParameterDeclaration,
  isDeclareModule,
  Flow,
} from '@babel/types';

import { VisitorFunction } from '../types';
import { FileTypes } from '../util/file';
import { WARNINGS, logWarning } from '../util/warnings';

import {
  convertDeclareClass,
  convertDeclareFunction,
  convertDeclareModule,
  convertDeclareInterface,
  convertDeclareTypeAlias,
} from '../converters/declaration';
import { convertInterfaceDeclaration } from '../converters/interface';
import { convertDeclareOpaqueType, convertOpaqueType } from '../converters/opaque';
import { convertTypeAlias } from '../converters/type-alias';
import { convertTypeAnnotation } from '../converters/type-annotation';
import { convertTypeCastExpression } from '../converters/type-cast';
import { convertTypeParameterDeclaration } from '../converters/type-parameter';

export const flowVisitor: VisitorFunction<Flow> = (path, state) => {
  const { node } = path;

  if (!path.isFlow()) {
    return;
  }

  if (isDeclareClass(node)) {
    path.replaceWith(convertDeclareClass(node, state));
  }

  if (isDeclareFunction(node)) {
    path.replaceWith(convertDeclareFunction(node, state));
  }

  if (isDeclareInterface(node)) {
    path.replaceWith(convertDeclareInterface(node, state));
  }

  if (isDeclareModule(node)) {
    path.replaceWith(convertDeclareModule(node, state));
  }

  if (isDeclareTypeAlias(node)) {
    path.replaceWith(convertDeclareTypeAlias(node, state));
  }

  if (isDeclareOpaqueType(node)) {
    path.replaceWith(convertDeclareOpaqueType(node, state));
  }

  if (isInterfaceDeclaration(node)) {
    path.replaceWith(convertInterfaceDeclaration(node, state));
  }

  if (isOpaqueType(node)) {
    logWarning(WARNINGS.opaqueType, state.file.code, node.loc);
    path.replaceWith(convertOpaqueType(node, state));
  }

  if (isTypeAlias(node)) {
    path.replaceWith(convertTypeAlias(node, path, state));
  }

  if (isTypeAnnotation(node)) {
    path.replaceWith(convertTypeAnnotation(node, state));
  }

  if (isTypeCastExpression(node)) {
    path.replaceWith(convertTypeCastExpression(node, state));
  }

  if (isTypeParameterDeclaration(node)) {
    path.replaceWith(convertTypeParameterDeclaration(node, state) || path);
  }

  // Declaration files need to get the ".d.ts" file extension
  if (state.filename) {
    switch (node.type) {
      case 'DeclareClass':
      case 'DeclareFunction':
      case 'DeclareInterface':
      case 'DeclareModule':
      case 'DeclareTypeAlias':
      case 'DeclareVariable':
        FileTypes.set(state.filename, '.d.ts');
    }
  }
};
