import { PluginObj, TransformOptions } from '@babel/core';
import { FunctionDeclaration, Flow, Program } from '@babel/types';

import { setParserOptions } from './options';
import { PluginPass } from './types';

import { flowVisitor } from './visitors/flow';
import { functionDeclarationVisitor } from './visitors/function';
import { programVisitor } from './visitors/program';

export interface PluginOptions {
  verbose?: boolean;
}

function buildPlugin(): PluginObj<PluginPass<FunctionDeclaration & Flow & Program>> {
  return {
    name: 'transform-flow-to-typescript',
    visitor: {
      Flow: flowVisitor,
      FunctionDeclaration: functionDeclarationVisitor,
      Program: programVisitor,
    },
    manipulateOptions(opts: TransformOptions, parserOpts: TransformOptions) {
      setParserOptions(parserOpts);
    },
  };
}

export default buildPlugin();
