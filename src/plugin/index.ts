import { ParserOptions, PluginObj, TransformOptions } from '@babel/core';

import { getParserPlugins } from './util/options';
import { PluginPass, VisitorNodes } from './types';

import {
  classDeclarationVisitor,
  importSpecifierVisitor,
  importDeclarationVisitor,
  functionVisitor,
} from './visitors/base';
import { flowVisitor } from './visitors/flow';
import { jsxVisitor } from './visitors/jsx';

export interface ReflowOptions {
  replaceDecorators?: boolean;
}

function buildPlugin(): PluginObj<PluginPass<VisitorNodes>> {
  return {
    name: 'reflow',
    visitor: {
      ArrowFunctionExpression: functionVisitor,
      ClassDeclaration: classDeclarationVisitor,
      FunctionDeclaration: functionVisitor,
      FunctionExpression: functionVisitor,
      ImportDeclaration: importDeclarationVisitor,
      ImportSpecifier: importSpecifierVisitor,
      Flow: flowVisitor,
      JSX: jsxVisitor,
    },
    manipulateOptions(opts: TransformOptions, parserOpts: ParserOptions) {
      parserOpts.plugins = getParserPlugins('flow');
    },
  };
}

export default buildPlugin();
