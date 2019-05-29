import { TransformOptions } from '@babel/core';
import { NodePath, Scope, VisitNodeFunction } from '@babel/traverse';
import { File, Flow, JSX } from '@babel/types';

import { ReflowOptions } from './index';
import { BaseNode } from './visitors/base';

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
  opts: TransformOptions & ReflowOptions;
}

export type VisitorNodes = BaseNode & Flow & JSX;
export type VisitorFunction<T> = VisitNodeFunction<PluginPass<T>, T>;
export type ConverterState = PluginPass<Flow | BaseNode>;
