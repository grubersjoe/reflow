import { declare } from '@babel/helper-plugin-utils';
import { NodePath } from '@babel/traverse';
import { BinaryExpression, Flow, identifier } from '@babel/types';

const plugin = declare(api => {
  api.assertVersion(7);

  return {
    name: 'transform-flow-to-typscript',
    visitor: {
      Flow(path: NodePath<Flow>) {
        // console.log('+++');
        // console.log(path.node);
        // console.log('+++');
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
