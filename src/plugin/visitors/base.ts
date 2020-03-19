import {
  ArrowFunctionExpression,
  ClassDeclaration,
  FunctionDeclaration,
  FunctionExpression,
  ImportDeclaration,
  ImportSpecifier,
  ExportDeclaration,
} from '@babel/types';

import { VisitorFunction, ConverterState } from '../types';
import { convertClassDeclaration } from '../converters/class';
import {
  convertImportDeclaration,
  convertImportSpecifier,
  convertExportDeclaration,
} from '../converters/module';
import { convertOptionalFunctionParameters } from '../converters/function';

export type BaseVisitorNodes = ArrowFunctionExpression &
  ClassDeclaration &
  FunctionDeclaration &
  FunctionExpression &
  ImportDeclaration &
  ImportSpecifier;

type FunctionLike = ArrowFunctionExpression | FunctionDeclaration | FunctionExpression;

export const classDeclarationVisitor: VisitorFunction<ClassDeclaration> = (path, state) => {
  path.replaceWith(convertClassDeclaration(path, state as ConverterState));
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
