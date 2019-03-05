import { PluginObj, TransformOptions } from '@babel/core';
import { Visitor } from '@babel/traverse';
import t from '@babel/types';

import { setParserOptions } from './options';
import { FlowType, Program, TypeAnnotation } from './visitors';

export interface OverflowOptions {
  verbose?: boolean;
}

/**
 * Plugin definition
 */
// TODO: Get this type parameter right
function buildPlugin(visitor: Visitor<t.Node>): PluginObj<t.Node> {
  return {
    name: 'transform-flow-to-typescript',
    visitor,
    manipulateOptions(opts: TransformOptions, parserOpts: TransformOptions) {
      setParserOptions(parserOpts);
    },
  };
}

export default () =>
  buildPlugin({
    FlowType,
    Program,
    TypeAnnotation,
  });
