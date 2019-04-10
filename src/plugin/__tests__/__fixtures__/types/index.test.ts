import { resolve } from 'path';

import { getTransformOptions } from '../../../options';
import { runFixtureTests } from '../..';

describe('Types', () => {
  runFixtureTests(
    resolve('src/plugin/__tests__/__fixtures__/types/'),
    getTransformOptions(undefined, {
      comments: false,
    }),
  );
});
