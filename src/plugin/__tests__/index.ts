import { TransformOptions, transformFileSync } from '@babel/core';
import chalk from 'chalk';
import glob from 'glob';
import startCase from 'lodash/startCase';
import { readdirSync, readFileSync, statSync } from 'fs';

import { ReflowOptions } from '..';
import { TestError } from '../../util/error';
import { relativePath as relPath, splitFixtureLines } from '../util/file';
import { formatOutputCode } from '../util/format';

const INPUT_FIXTURE_GLOB = 'input.js';
const OUTPUT_FIXTURE_GLOB = 'output.{ts,tsx}';

export function runFixtureTests(
  rootDir: string,
  babelOptions: TransformOptions,
  pluginOptions: ReflowOptions = {},
  testFormatting = false,
  parentDirs: string[] = [],
): void {
  const files = readdirSync(rootDir);

  if (files.length === 0) {
    throw new Error(`No fixture directories or files found in ${rootDir}`);
  }

  files.forEach(testDir => {
    const dir = relPath(rootDir, testDir);

    if (statSync(dir).isDirectory()) {
      const testName = parentDirs
        .concat(testDir)
        .map(startCase)
        .join(' › ');

      const inputGlob = glob.sync(INPUT_FIXTURE_GLOB, { absolute: true, cwd: dir });
      const inputFile = inputGlob.length === 1 ? inputGlob[0] : null;

      const outputGlob = glob.sync(OUTPUT_FIXTURE_GLOB, { absolute: true, cwd: dir });
      const outputFile = outputGlob.length === 1 ? outputGlob[0] : null;

      if (inputFile && outputFile) {
        const babelOutput = transformFileSync(inputFile, babelOptions);

        const expectedLines = splitFixtureLines(
          String(readFileSync(outputFile)),
          'typescript',
          !testFormatting,
        );

        describe(chalk.underline(testName), () => {
          if (!babelOutput) {
            throw new TestError(`Unable to transform file ${inputFile}.`);
          }

          if (babelOutput.code) {
            const outputCode = testFormatting
              ? formatOutputCode(babelOutput.code, String(readFileSync(inputFile)), pluginOptions)
              : babelOutput.code;

            splitFixtureLines(outputCode, 'typescript', !testFormatting).forEach((line, i) => {
              const padLength = Math.min(String(expectedLines.length).length, 2);
              const testNumber = String(i + 1).padStart(padLength, '0');

              test(`${testName}:${testNumber} │ ${line} === ${expectedLines[i]}`, () => {
                expect(line).toEqual(expectedLines[i]);
              });
            });
          } else {
            console.warn(chalk.yellow(`Input file ${inputFile} seems to be empty.`));
          }
        });
      } else if (inputFile) {
        throw new TestError(`Fixture output file ${outputFile} does not exist.`);
      } else if (outputFile) {
        throw new TestError(`Fixture input file ${inputFile} does not exist.`);
      } else {
        // Descend in next directory level
        runFixtureTests(dir, babelOptions, pluginOptions, testFormatting, [...parentDirs, testDir]);
      }
    }
  });
}
