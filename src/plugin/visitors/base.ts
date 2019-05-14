import {
  ArrowFunctionExpression,
  ClassDeclaration,
  FunctionDeclaration,
  FunctionExpression,
  ImportDeclaration,
  ImportSpecifier,
} from '@babel/types';

import { VisitorFunction } from '../types';
import { convertClassDeclaration } from '../converters/class';
import { convertImportDeclaration, convertImportSpecifier } from '../converters/module';
import { convertOptionalFunctionParameters } from '../converters/function';

export type BaseVisitorNodes =
  | ArrowFunctionExpression
  | ClassDeclaration
  | FunctionExpression
  | FunctionDeclaration
  | ArrowFunctionExpression
  | ImportDeclaration
  | ImportSpecifier;

export const baseVisitor: VisitorFunction<BaseVisitorNodes> = (path, state): void => {
  if (path.isClassDeclaration()) {
    path.replaceWith(convertClassDeclaration(path, state));
  }

  if (
    path.isFunctionDeclaration() ||
    path.isFunctionExpression() ||
    path.isArrowFunctionExpression()
  ) {
    path.replaceWith(convertOptionalFunctionParameters(path.node));
  }

  if (path.isImportDeclaration() && path.isImportDeclaration()) {
    path.replaceWith(convertImportDeclaration(path));
  }

  if (path.isImportSpecifier() && path.isImportSpecifier()) {
    path.replaceWith(convertImportSpecifier(path));
  }
};
