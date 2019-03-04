import { PluginObj, TransformOptions } from '@babel/core';
import { Visitor } from '@babel/traverse';
import { Flow as FlowType } from '@babel/types';

import { Flow, NullableTypeAnnotation } from './visitors';
import { setTransformOptions } from './options';

export interface OverflowOptions {
  verbose?: boolean;
}

/**
 * Plugin definition
 */
function buildPlugin(visitor: Visitor<FlowType>): PluginObj<FlowType> {
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
    Flow,
    NullableTypeAnnotation,
  });
