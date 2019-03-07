import { PluginObj, TransformOptions } from '@babel/core';
import { Visitor } from '@babel/traverse';

import { setParserOptions } from './options';
import { VisitorType } from './types';

import { FlowType, Program, TypeAnnotation } from './visitors';

/**
 * Plugin definition
 */
// TODO: Get this type parameter right
function buildPlugin(visitor: Visitor<VisitorType>): PluginObj<VisitorType> {
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
