import { TransformOptions } from '@babel/core';
import { NodePath, Scope, VisitNodeFunction } from '@babel/traverse';
import {
  File,
  Flow,
  ClassDeclaration,
  FunctionDeclaration,
  ImportDeclaration,
  ImportSpecifier,
  JSX,
  Program,
} from '@babel/types';

// Missing in @types/babel__core
export interface PluginPass<T> {
  cwd: string;
  file: {
    ast: File;
    code: string;
    declarations: object;
    hub: object;
    inputMap?: object;
    metadata: object;
    opts: TransformOptions;
    path: NodePath<T>;
    scope: Scope;
    shebang: string;
  };
  filename?: string;
  key: string;
  opts: TransformOptions;
}

export type VisitorNodes = Flow &
  ClassDeclaration &
  FunctionDeclaration &
  ImportDeclaration &
  ImportSpecifier &
  JSX &
  Program;

export type VisitorFunction<T> = VisitNodeFunction<PluginPass<T>, T>;
