import { resolve } from 'path';

import { ReflowOptions } from '../../..';
import { getTransformOptions } from '../../../util/options';
import { runFixtureTests } from '../../runner';

const pluginOptions: ReflowOptions = {
  replaceDecorators: true,
};

describe('Optimizations', () => {
  runFixtureTests(
    resolve('src/plugin/__tests__/__fixtures__/optimizations/'),
    getTransformOptions({
      transformOptions: {
        compact: false,
      },
      pluginOptions,
    }),
    pluginOptions,
  );
});
