import {
  ClassDeclaration,
  FunctionDeclaration,
  ImportDeclaration,
  ImportSpecifier,
} from '@babel/types';

import { VisitorFunction } from '../types';
import { convertClassDeclaration } from '../converters/class';
import { convertFunctionDeclaration } from '../converters/function';
import { convertImportDeclaration, convertImportSpecifier } from '../converters/module';

export const classDeclarationVisitor: VisitorFunction<ClassDeclaration> = (path): void => {
  path.replaceWith(convertClassDeclaration(path.node));
};

export const functionDeclarationVisitor: VisitorFunction<FunctionDeclaration> = (path): void => {
  path.replaceWith(convertFunctionDeclaration(path.node));
};

// Note: There is no need to convert export declarations
export const importDeclarationVisitor: VisitorFunction<ImportDeclaration> = (path): void => {
  path.replaceWith(convertImportDeclaration(path.node, path));
};

export const importSpecifierVisitor: VisitorFunction<ImportSpecifier> = (path): void => {
  path.replaceWith(convertImportSpecifier(path.node, path));
};
