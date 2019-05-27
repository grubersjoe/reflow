import { resolve } from 'path';

import { ReflowOptions } from '../../..';
import { getTransformOptions } from '../../../options';
import { runFixtureTests } from '../..';

const pluginOptions: ReflowOptions = {
  replaceDecorators: true,
};

describe('Optimizations', () => {
  runFixtureTests(
    resolve('src/plugin/__tests__/__fixtures__/optimizations/'),
    getTransformOptions({ pluginOptions }),
    pluginOptions,
  );
});
