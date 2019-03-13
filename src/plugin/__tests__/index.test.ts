import path from 'path';

import { getTransformOptions } from '../options';
import { runFixtureTests } from '../../util/test-runner';

runFixtureTests({
  babelOptions: getTransformOptions(undefined, { comments: false }),
  fixturesRoot: path.resolve('src/plugin/__tests__/__fixtures__/'),
});
