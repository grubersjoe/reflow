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

export type VisitorNodes = ClassDeclaration &
  Flow &
  FunctionDeclaration &
  ImportDeclaration &
  ImportSpecifier &
  JSX;

export type VisitorFunction<T> = VisitNodeFunction<PluginPass<T>, T>;
