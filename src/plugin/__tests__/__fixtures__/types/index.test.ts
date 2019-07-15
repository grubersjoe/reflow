import { resolve } from 'path';

import { getTransformOptions } from '../../../util/options';
import { runFixtureTests } from '../../runner';

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
