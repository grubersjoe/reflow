import { resolve } from 'path';

import { getTransformOptions } from '../../../util/options';
import { runFixtureTests } from '../../runner';

describe('Syntax', () => {
  runFixtureTests(
    resolve('src/plugin/__tests__/__fixtures__/syntax/'),
    getTransformOptions({
      transformOptions: {
        compact: false,
      }
    }),
  );
});
