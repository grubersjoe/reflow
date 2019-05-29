import { resolve } from 'path';

import { getTransformOptions } from '../../../options';
import { runFixtureTests } from '../../../util/test-runner';

describe('React', () => {
  runFixtureTests(
    resolve('src/plugin/__tests__/__fixtures__/react/'),
    getTransformOptions(),
  );
});
