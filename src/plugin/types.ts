import { TransformOptions } from '@babel/core';
import { NodePath, Scope } from '@babel/traverse';
import { File, FlowType, Program } from '@babel/types';

export interface OverflowOptions {
  verbose?: boolean;
}

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
  filename: string | undefined;
  key: string;
  opts: OverflowOptions;
}

export type VisitorType = FlowType | Program;
