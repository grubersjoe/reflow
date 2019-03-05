import { PluginObj, TransformOptions } from '@babel/core';
import { Visitor } from '@babel/traverse';
import types from '@babel/types';

import { setTransformOptions } from './options';
import { FlowType, TypeAnnotation } from './visitors';

export interface OverflowOptions {
  verbose?: boolean;
}

/**
 * Plugin definition
 */
function buildPlugin(visitor: Visitor<types.FlowType>): PluginObj<types.FlowType> {
  return {
    name: 'transform-flow-to-typescript',
    visitor,
    manipulateOptions(opts: TransformOptions, parserOpts: TransformOptions) {
      setTransformOptions(parserOpts);
    },
  };
}

export default () =>
  buildPlugin({
    FlowType,
    TypeAnnotation,
  });
