import path from 'path';

import pluginTester from 'babel-plugin-tester';
import OverflowPlugin from '..';

pluginTester({
  babelOptions: {
    sourceType: 'script',
  },
  fixtures: path.join(__dirname, '__fixtures__'),
  plugin: OverflowPlugin,
});
