import { resolve } from 'path';

import { getTransformOptions } from '../../../util/options';
import { runFixtureTests } from '../../runner';

describe('React', () => {
  runFixtureTests(
    resolve('src/plugin/__tests__/__fixtures__/react/'),
    getTransformOptions({
      transformOptions: {
        compact: false,
      }
    }),
  );
});
