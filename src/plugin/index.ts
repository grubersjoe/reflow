import { declare } from '@babel/helper-plugin-utils';
import { NodePath } from 'babel-traverse';

import { BinaryExpression, TypeAlias, identifier } from '@babel/types';

const plugin = declare(api => {
  api.assertVersion(7);

  return {
    name: 'transform-flow-to-typscript',
    visitor: {
      Flow(path: NodePath<TypeAlias>) {
        console.log('+++');
        console.log(path.node);
        console.log('+++');
      },
      BinaryExpression(path: NodePath<BinaryExpression>) {
        if (path.node.operator === '===') {
          path.node.left = identifier('ja');
          path.node.right = identifier('auja');
        }
      },
    },
  };
});

export default plugin;
