import { TransformOptions } from '@babel/core';
import { NodePath, Scope, VisitNodeFunction } from '@babel/traverse';
import { File, Flow, JSX, Program } from '@babel/types';

import { ReflowOptions } from './index';
import { BaseVisitorNode } from './visitors/base';

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

export type VisitorNodes = BaseVisitorNode & Flow & JSX & Program;
export type VisitorFunction<T> = VisitNodeFunction<PluginPass<T>, T>;
export type ConverterState = PluginPass<BaseVisitorNode | Flow>;
