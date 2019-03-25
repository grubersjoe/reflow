import path from 'path';

import { getTransformOptions } from '../options';
import { runFixtureTests } from './runner';

const rootDir = path.resolve('src/plugin/__tests__/__fixtures__/');
const babelOptions = getTransformOptions(undefined, { comments: false });

runFixtureTests(rootDir, babelOptions);
