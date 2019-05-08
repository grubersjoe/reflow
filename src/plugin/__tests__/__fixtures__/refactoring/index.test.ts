import { resolve } from 'path';

import { getTransformOptions } from '../../../options';
import { runFixtureTests } from '../..';

describe('Refactoring', () => {
  runFixtureTests(
    resolve('src/plugin/__tests__/__fixtures__/refactoring/'),
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
