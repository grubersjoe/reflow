import { resolve } from 'path';

import { getTransformOptions } from '../../../options';
import { runFixtureTests } from '../..';

describe('React', () => {
  runFixtureTests(
    resolve('src/plugin/__tests__/__fixtures__/react/'),
    getTransformOptions({ transformOptions: { comments: false } }),
  );
});
