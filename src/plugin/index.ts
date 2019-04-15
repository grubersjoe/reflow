import { ParserOptions, PluginObj, TransformOptions } from '@babel/core';

import { setParserOptions } from './options';
import { PluginPass, VisitorNodes } from './types';

import {
  classDeclarationVisitor,
  functionDeclarationVisitor,
  importDeclarationVisitor,
  importSpecifierVisitor,
} from './visitors/base';

import { jsxVisitor } from './visitors/jsx';
import { flowVisitor } from './visitors/flow';

export interface PluginOptions {
  verbose?: boolean;
}

function buildPlugin(): PluginObj<PluginPass<VisitorNodes>> {
  return {
    name: 'transform-flow-to-typescript',
    visitor: {
      Flow: flowVisitor,
      ClassDeclaration: classDeclarationVisitor,
      FunctionDeclaration: functionDeclarationVisitor,
      ImportDeclaration: importDeclarationVisitor,
      ImportSpecifier: importSpecifierVisitor,
      JSX: jsxVisitor,
    },
    manipulateOptions(opts: TransformOptions, parserOpts: ParserOptions) {
      setParserOptions(parserOpts);
    },
  };
}

export default buildPlugin();
