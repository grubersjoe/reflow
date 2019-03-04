import { PluginObj } from '@babel/core';
import { declare } from '@babel/helper-plugin-utils';
import { Visitor } from '@babel/traverse';
import { Flow as FlowType } from '@babel/types';

import { Flow, NullableTypeAnnotation } from './visitors';

export interface OverflowOptions {
  verbose?: boolean;
}

interface ApiHelper {
  assertVersion: (version: number) => void;
}

function buildPlugin(visitor: Visitor<FlowType>): PluginObj<FlowType> {
  return {
    name: 'transform-flow-to-typescript',
    visitor,
  };
}

export default declare((api: ApiHelper) => {
  api.assertVersion(7);

  return buildPlugin({
    Flow,
    NullableTypeAnnotation,
  });
});
