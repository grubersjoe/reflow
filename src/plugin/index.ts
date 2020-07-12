import { ParserOptions, TransformOptions } from '@babel/core';

import { getParserPlugins } from './util/options';

import {
  classDeclarationVisitor,
  exportDeclarationVisitor,
  functionVisitor,
  importDeclarationVisitor,
  importSpecifierVisitor,
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
    ExportDeclaration: exportDeclarationVisitor,
    Flow: flowVisitor,
    FunctionDeclaration: functionVisitor,
    FunctionExpression: functionVisitor,
    ImportDeclaration: importDeclarationVisitor,
    ImportSpecifier: importSpecifierVisitor,
    JSX: jsxVisitor,
    Program: programVisitor,
  },
  manipulateOptions(opts: TransformOptions, parserOpts: ParserOptions): void {
    parserOpts.plugins = getParserPlugins('flow');
  },
};

export default reflowPlugin;
