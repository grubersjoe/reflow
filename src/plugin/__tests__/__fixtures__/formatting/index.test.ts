import { resolve } from 'path';

import { getTransformOptions } from '../../../options';
import { runFixtureTests } from '../..';

describe('Formatting', () => {
  runFixtureTests(
    resolve('src/plugin/__tests__/__fixtures__/formatting/'),
    getTransformOptions(),
    true,
  );
});
