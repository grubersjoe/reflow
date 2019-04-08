import { resolve } from 'path';

import { getTransformOptions } from '../../../options';
import { runFixtureTests } from '../..';

runFixtureTests(
  resolve('src/plugin/__tests__/__fixtures__/formatting/'),
  getTransformOptions(undefined),
);
