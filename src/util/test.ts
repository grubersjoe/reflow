import { transformSync, TransformOptions } from '@babel/core';
import chalk from 'chalk';
import fs, { statSync } from 'fs';
import startCase from 'lodash/startCase';
import path from 'path';

import { splitFixtureLines } from './string';

const FIXTURE_INPUT_FILENAME = 'input.js';
const FIXTURE_OUTPUT_FILENAME = 'output.ts';

export function runFixtureTests(rootDir: string, babelOptions: TransformOptions): void {
  const files = fs.readdirSync(rootDir);

  if (files.length === 0) {
    throw new Error(`No fixture directories or files found in ${rootDir}`);
  }

  files.forEach(dirName => {
    const dir = path.resolve(rootDir, dirName);

    if (statSync(dir).isDirectory()) {
      const testName = startCase(dirName);

      const inputFile = path.resolve(dir, FIXTURE_INPUT_FILENAME);
      const outputFile = path.resolve(dir, FIXTURE_OUTPUT_FILENAME);

      const inputFileExists = fs.existsSync(inputFile);
      const outputFileExists = fs.existsSync(outputFile);

      if (inputFileExists && outputFileExists) {
        const input = fs.readFileSync(inputFile).toString();
        const babelOutput = transformSync(input, babelOptions);
        const expectedLines = splitFixtureLines(fs.readFileSync(outputFile));

        describe(testName.toUpperCase(), () => {
          if (!babelOutput) {
            throw new Error(`Unable to transform file ${inputFile}.`);
          }

          if (babelOutput.code) {
            splitFixtureLines(babelOutput.code).forEach((line, i) => {
              const padLength = Math.min(String(expectedLines.length).length, 2);
              const testNumber = String(i + 1).padStart(padLength, '0');

              test(`${testName}:${testNumber} │ ${line}  ===  ${expectedLines[i]}`, () => {
                expect(line).toMatch(expectedLines[i]);
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
        runFixtureTests(dir, babelOptions);
      }
    }
  });
}
