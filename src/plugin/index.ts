import { declare } from '@babel/helper-plugin-utils';
import * as t from '@babel/types';

const plugin = declare(api => {
  api.assertVersion(7);

  return {
    name: 'transform-flow-to-typscript',
    visitor: {
      BinaryExpression(path) {
        if (path.node.operator !== '===') {
          return;
        }

        path.node.left = t.identifier('ja');
        path.node.right = t.identifier('auja');
      },
    },
  };
});

export default plugin;
