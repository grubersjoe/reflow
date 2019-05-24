import { resolve } from 'path';

import { ReflowOptions } from '../../..';
import { getTransformOptions } from '../../../options';
import { runFixtureTests } from '../..';

const pluginOptions: ReflowOptions = {
  replaceDecorators: true,
}

const testFormatting = true;

describe('Formatting', () => {
  runFixtureTests(
    resolve('src/plugin/__tests__/__fixtures__/formatting/'),
    getTransformOptions({ pluginOptions }),
    pluginOptions,
    testFormatting,
  );
});
