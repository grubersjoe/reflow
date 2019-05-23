import { resolve } from 'path';

import { getTransformOptions } from '../../../options';
import { runFixtureTests } from '../..';

describe('Optimizations', () => {
  runFixtureTests(
    resolve('src/plugin/__tests__/__fixtures__/optimizations/'),
    getTransformOptions({
      pluginOptions: {
        replaceDecorators: true,
      },
      transformOptions: {
        comments: false
      },
    }),
  );
});
