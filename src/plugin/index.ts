import { PluginObj } from '@babel/core';
import { declare } from '@babel/helper-plugin-utils';
import { NodePath } from '@babel/traverse';
import { BinaryExpression, Flow, identifier } from '@babel/types';

export interface OverflowOptions {
  verbose?: boolean;
}

interface ApiHelper {
  assertVersion: (version: number) => void;
}

export default declare((api: ApiHelper) => {
  api.assertVersion(7);

  const name = 'transform-flow-to-typscript';
  const plugin: PluginObj<Flow> = {
    name,
    visitor: {
      Flow(path: NodePath<Flow>, state: any) {
        const options = (state.opts as OverflowOptions);

        if (options.verbose) {
          console.log(`  - ${path.node.type}`);
        }
      },
      BinaryExpression(path: NodePath<BinaryExpression>) {
        if (path.node.operator === '===') {
          path.node.left = identifier('ja');
          path.node.right = identifier('auja');
        }
      },
    },
  };

  return plugin;
});
