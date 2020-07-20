import {
  ArrowFunctionExpression,
  ClassDeclaration,
  ExportDeclaration,
  FunctionDeclaration,
  FunctionExpression,
  ImportDeclaration,
  ImportSpecifier,
} from '@babel/types';

import { VisitorFunction } from '../types';
import { convertClassDeclaration } from '../converters/class';
import {
  convertExportDeclaration,
  convertImportDeclaration,
  convertImportSpecifier,
} from '../converters/module';
import { convertOptionalFunctionParameters } from '../converters/function';

export type BaseVisitorNodes = ArrowFunctionExpression &
  ClassDeclaration &
  FunctionDeclaration &
  FunctionExpression &
  ImportDeclaration &
  ImportSpecifier;

type FunctionLike =
  | ArrowFunctionExpression
  | FunctionDeclaration
  | FunctionExpression;

export const classDeclarationVisitor: VisitorFunction<ClassDeclaration> = (
  path,
  state,
) => {
  path.replaceWith(convertClassDeclaration(path, state));
};

export const functionVisitor: VisitorFunction<FunctionLike> = path => {
  path.replaceWith(convertOptionalFunctionParameters(path.node));
};

export const importDeclarationVisitor: VisitorFunction<ImportDeclaration> = path => {
  path.replaceWith(convertImportDeclaration(path));
};

export const importSpecifierVisitor: VisitorFunction<ImportSpecifier> = path => {
  path.replaceWith(convertImportSpecifier(path));
};

export const exportDeclarationVisitor: VisitorFunction<ExportDeclaration> = path => {
  path.replaceWith(convertExportDeclaration(path));
};
