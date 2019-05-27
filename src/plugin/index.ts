import { ParserOptions, PluginObj, TransformOptions } from '@babel/core';

import { getParserPlugins } from './options';
import { PluginPass, VisitorNodes } from './types';

import { baseVisitor } from './visitors/base';
import { jsxVisitor } from './visitors/jsx';
import { flowVisitor } from './visitors/flow';

export interface ReflowOptions {
  verbose?: boolean;
  replaceDecorators?: boolean;
}

function buildPlugin(): PluginObj<PluginPass<VisitorNodes>> {
  return {
    name: 'reflow',
    visitor: {
      ArrowFunctionExpression: baseVisitor,
      ClassDeclaration: baseVisitor,
      FunctionDeclaration: baseVisitor,
      FunctionExpression: baseVisitor,
      ImportDeclaration: baseVisitor,
      ImportSpecifier: baseVisitor,
      // @ts-ignore
      Flow: flowVisitor,
      JSX: jsxVisitor,
    },
    manipulateOptions(opts: TransformOptions, parserOpts: ParserOptions) {
      parserOpts.plugins = [...getParserPlugins(), 'flow'];
    },
  };
}

export default buildPlugin();
