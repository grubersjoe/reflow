import {
  ClassDeclaration,
  FunctionDeclaration,
  ImportDeclaration,
  ImportSpecifier,
  isClassDeclaration,
  isFunctionDeclaration,
  isImportDeclaration,
  isImportSpecifier,
} from '@babel/types';

import { VisitorFunction } from '../types';
import { convertClassDeclaration } from '../converters/class';
import { convertImportDeclaration, convertImportSpecifier } from '../converters/module';
import { convertFunctionDeclaration } from '../converters/function';

export const baseVisitor: VisitorFunction<
  ClassDeclaration | FunctionDeclaration | ImportDeclaration | ImportSpecifier
> = (path): void => {
  const { node } = path;

  if (isClassDeclaration(node)) {
    path.replaceWith(convertClassDeclaration(node));
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
