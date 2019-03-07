import path from 'path';
import { testFixtures } from '../../util/test-runner';
import { getTransformOptions } from '../../cli/runner';

testFixtures({
  babelOptions: getTransformOptions(),
  fixturesDirectory: path.resolve('src/plugin/__tests__/__fixtures__/'),
});
