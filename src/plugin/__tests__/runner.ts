import { TransformOptions, transformFileSync } from '@babel/core';
import chalk from 'chalk';
import startCase from 'lodash/startCase';
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { cwd } from 'process';
import { relative, resolve } from 'path';

import { splitFixtureLines } from '../../util/string';

const FIXTURE_INPUT_FILENAME = 'input.js';
const FIXTURE_OUTPUT_FILENAME = 'output.ts';

function relPath(...pathSegments: string[]): string {
  return relative(cwd(), resolve(...pathSegments));
}

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
    const dir = relPath(rootDir, testDir);

    if (statSync(dir).isDirectory()) {
      const testName = parentDirs
        .concat(testDir)
        .map(startCase)
        .join('/');

      const inputFile = relPath(dir, FIXTURE_INPUT_FILENAME);
      const outputFile = relPath(dir, FIXTURE_OUTPUT_FILENAME);

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
            splitFixtureLines(babelOutput.code).forEach((line, i) => {
              const padLength = Math.min(String(expectedLines.length).length, 2);
              const testNumber = String(i + 1).padStart(padLength, '0');

              // console.warn(chalk.yellow(`### ${inputFile} - ${testName}:${testNumber} │ ${line}`));

              test(`${testName}:${testNumber} │ ${line}`, () => {
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
