import path from 'path';

import { getTransformOptions } from '../options';
import { runFixtureTests } from './runner';

runFixtureTests({
  babelOptions: getTransformOptions(undefined, { comments: false }),
  fixturesRoot: path.resolve('src/plugin/__tests__/__fixtures__/'),
});
