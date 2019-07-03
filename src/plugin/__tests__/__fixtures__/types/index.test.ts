import { resolve } from 'path';

import { getTransformOptions } from '../../../options';
import { runFixtureTests } from '../../../util/test-runner';

describe('Types', () => {
  runFixtureTests(
    resolve('src/plugin/__tests__/__fixtures__/types/'),
    getTransformOptions({
      transformOptions: {
        compact: false,
      }
    }),
  );
});
