import {
  ArrowFunctionExpression,
  ClassDeclaration,
  FunctionDeclaration,
  FunctionExpression,
  ImportDeclaration,
  ImportSpecifier,
} from '@babel/types';

import { VisitorFunction, ConverterState } from '../types';
import { convertClassDeclaration } from '../converters/class';
import { convertImportDeclaration, convertImportSpecifier } from '../converters/module';
import { convertOptionalFunctionParameters } from '../converters/function';

export type BaseVisitorNode = ClassDeclaration & FunctionLike & ImportDeclaration & ImportSpecifier;

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
