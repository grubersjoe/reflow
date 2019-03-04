import { PluginObj } from '@babel/core';
import { Visitor } from '@babel/traverse';
import { Flow as FlowType } from '@babel/types';

import { Flow, NullableTypeAnnotation } from './visitors';

export interface OverflowOptions {
  verbose?: boolean;
}

interface ApiHelper {
  assertVersion: (version: number) => void;
}

export function buildPlugin(visitor: Visitor<FlowType>): PluginObj<FlowType> {
  return {
    name: 'transform-flow-to-typescript',
    visitor,

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    manipulateOptions(opts: any, parserOpts: any) {
      parserOpts.plugins.push('flow');
      parserOpts.plugins.push('jsx');
    },
  };
}

export default () => buildPlugin({
  Flow,
  NullableTypeAnnotation,
});

// export default declare((api: ApiHelper) => {
//   api.assertVersion(7);
//
//   return buildPlugin({
//     Flow,
//     NullableTypeAnnotation,
//   });
// });
