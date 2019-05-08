import {
  ClassDeclaration,
  FunctionDeclaration,
  ImportDeclaration,
  ImportSpecifier,
  isFunctionDeclaration,
  isImportDeclaration,
  isImportSpecifier,
} from '@babel/types';

import { VisitorFunction } from '../types';
import { convertClassDeclaration } from '../converters/class';
import { convertImportDeclaration, convertImportSpecifier } from '../converters/module';
import { convertFunctionDeclaration } from '../converters/function';

export type BaseVisitorTypes =
  | ClassDeclaration
  | FunctionDeclaration
  | ImportDeclaration
  | ImportSpecifier;

export const baseVisitor: VisitorFunction<BaseVisitorTypes> = (path, state): void => {
  const { node } = path;

  if (path.isClassDeclaration()) {
    path.replaceWith(convertClassDeclaration(path, state));
  }

  if (isFunctionDeclaration(node)) {
    path.replaceWith(convertFunctionDeclaration(node));
  }

  if (isImportDeclaration(node) && path.isImportDeclaration()) {
    path.replaceWith(convertImportDeclaration(node, path));
  }

  if (isImportSpecifier(node) && path.isImportSpecifier()) {
    path.replaceWith(convertImportSpecifier(node, path));
  }
};
