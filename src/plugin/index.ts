import { ParserOptions, TransformOptions } from '@babel/core';

import { getParserPlugins } from './util/options';

import {
  classDeclarationVisitor,
  importSpecifierVisitor,
  importDeclarationVisitor,
  functionVisitor,
  exportDeclarationVisitor,
} from './visitors/base';
import { flowVisitor } from './visitors/flow';
import { jsxVisitor } from './visitors/jsx';
import { programVisitor } from './visitors/program';

export interface ReflowOptions {
  replaceDecorators?: boolean;
}

const reflowPlugin = {
  name: 'reflow',
  visitor: {
    ArrowFunctionExpression: functionVisitor,
    ClassDeclaration: classDeclarationVisitor,
    FunctionDeclaration: functionVisitor,
    FunctionExpression: functionVisitor,
    ImportDeclaration: importDeclarationVisitor,
    ImportSpecifier: importSpecifierVisitor,
    ExportDeclaration: exportDeclarationVisitor,
    Flow: flowVisitor,
    JSX: jsxVisitor,
    Program: programVisitor,
  },
  manipulateOptions(opts: TransformOptions, parserOpts: ParserOptions) {
    parserOpts.plugins = getParserPlugins('flow');
  },
};

export default reflowPlugin;
