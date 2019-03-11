import path from 'path';
import { runFixtureTests } from '../../util/test-runner';
import { getTransformOptions } from '../../cli/runner';

runFixtureTests({
  babelOptions: getTransformOptions(),
  fixturesRoot: path.resolve('src/plugin/__tests__/__fixtures__/'),
});
