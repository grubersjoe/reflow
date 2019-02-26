import { declare } from '@babel/helper-plugin-utils';
import { NodePath } from 'babel-traverse';

import * as types from '@babel/types';
import { BinaryExpression } from '@babel/types';

const plugin = declare(api => {
  api.assertVersion(7);

  return {
    name: 'transform-flow-to-typscript',
    visitor: {
      BinaryExpression(path: NodePath<BinaryExpression>) {
        if (path.node.operator === '===') {
          path.node.left = types.identifier('ja');
          path.node.right = types.identifier('auja');
        }
      },
    },
  };
});

export default plugin;
