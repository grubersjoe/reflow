import { PluginObj, TransformOptions } from '@babel/core';
import { Visitor } from '@babel/traverse';
import types from '@babel/types';

import { setParserOptions } from './options';
import { FlowType, FunctionDeclaration, Program, TypeAlias, TypeAnnotation } from './visitors';

export interface PluginOptions {
  verbose?: boolean;
}

export type VisitorType = types.FlowType | types.Program;

function buildPlugin(visitor: Visitor<VisitorType>): PluginObj<VisitorType> {
  return {
    name: 'transform-flow-to-typescript',
    visitor,
    manipulateOptions(opts: TransformOptions, parserOpts: TransformOptions) {
      setParserOptions(parserOpts);
    },
  };
}

const plugin = buildPlugin({
  FlowType,
  FunctionDeclaration,
  Program,
  TypeAlias,
  TypeAnnotation,
});

export default plugin;
