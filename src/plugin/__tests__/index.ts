import { TransformOptions, transformFileSync } from '@babel/core';
import chalk from 'chalk';
import startCase from 'lodash/startCase';
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';

import { relativePath, splitFixtureLines } from '../util/file';
import { formatOutputCode } from '../util/format';

const FIXTURE_INPUT_FILENAME = 'input.js';
const FIXTURE_OUTPUT_FILENAME = 'output.ts';

export function runFixtureTests(
  rootDir: string,
  babelOptions: TransformOptions,
  parentDirs: string[] = [],
): void {
  const files = readdirSync(rootDir);

  if (files.length === 0) {
    throw new Error(`No fixture directories or files found in ${rootDir}`);
  }

  files.forEach(testDir => {
    const dir = relativePath(rootDir, testDir);

    if (statSync(dir).isDirectory()) {
      const testName = parentDirs
        .concat(testDir)
        .map(startCase)
        .join('/');

      const inputFile = relativePath(dir, FIXTURE_INPUT_FILENAME);
      const outputFile = relativePath(dir, FIXTURE_OUTPUT_FILENAME);

      const inputFileExists = existsSync(inputFile);
      const outputFileExists = existsSync(outputFile);

      if (inputFileExists && outputFileExists) {
        const babelOutput = transformFileSync(inputFile, babelOptions);
        const expectedLines = splitFixtureLines(readFileSync(outputFile));

        describe(chalk.underline(testName), () => {
          if (!babelOutput) {
            throw new Error(`Unable to transform file ${inputFile}.`);
          }

          if (babelOutput.code) {
            // Tests concerning the formatting should be ... formatted
            if (testName.includes('formatting')) {
              babelOutput.code = formatOutputCode(babelOutput.code, inputFile);
            }

            splitFixtureLines(babelOutput.code).forEach((line, i) => {
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
      } else if (inputFileExists) {
        throw new Error(`Fixture output file ${outputFile} does not exist.`);
      } else if (outputFileExists) {
        throw new Error(`Fixture input file ${inputFile} does not exist.`);
      } else {
        // Descend in next directory level
        runFixtureTests(dir, babelOptions, [...parentDirs, testDir]);
      }
    }
  });
}
