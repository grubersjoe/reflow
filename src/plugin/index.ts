import { ParserOptions, PluginObj, TransformOptions } from '@babel/core';
import {
  ClassDeclaration,
  Flow,
  FunctionDeclaration,
  ImportDeclaration,
  ImportSpecifier,
  Program,
} from '@babel/types';

import { setParserOptions } from './options';
import { PluginPass } from './types';

import {
  classDeclarationVisitor,
  functionDeclarationVisitor,
  importDeclarationVisitor,
  importSpecifierVisitor,
} from './visitors/base';
import { flowVisitor } from './visitors/flow';
import { programVisitor } from './visitors/program';

export interface PluginOptions {
  verbose?: boolean;
}

type VisitorNodes = Flow &
  ClassDeclaration &
  FunctionDeclaration &
  ImportDeclaration &
  ImportSpecifier &
  Program;

function buildPlugin(): PluginObj<PluginPass<VisitorNodes>> {
  return {
    name: 'transform-flow-to-typescript',
    visitor: {
      Flow: flowVisitor,
      ClassDeclaration: classDeclarationVisitor,
      FunctionDeclaration: functionDeclarationVisitor,
      ImportDeclaration: importDeclarationVisitor,
      ImportSpecifier: importSpecifierVisitor,
      Program: programVisitor,
    },
    manipulateOptions(opts: TransformOptions, parserOpts: ParserOptions) {
      setParserOptions(parserOpts);
    },
  };
}

export default buildPlugin();
