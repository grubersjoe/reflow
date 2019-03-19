import { transformSync, TransformOptions } from '@babel/core';
import chalk from 'chalk';
import fs, { statSync } from 'fs';
import startCase from 'lodash/startCase';
import path from 'path';

export interface FixtureTestRunnerArgs {
  babelOptions: TransformOptions;
  fixturesRoot: string;
  inputFilename?: string;
  outputFilename?: string;
}

export const defaultFixtureRunnerArgs = {
  inputFilename: 'input.js',
  outputFilename: 'output.ts',
};

export function splitLines(code: Buffer | string): string[] {
  const BLANK_LINE = /^\s*$/;
  const LINE_COMMENT = /^\s*\/\/.*/;
  const LINE_BREAK = /\r?\n/;

  return code
    .toString()
    .split(LINE_BREAK)
    .filter(line => !line.match(BLANK_LINE) && !line.match(LINE_COMMENT))
    .map(line => line.trim());
}

export function runFixtureTests(args: FixtureTestRunnerArgs): void {
  const mergedArgs = Object.assign({}, defaultFixtureRunnerArgs, args);
  const { babelOptions, fixturesRoot, inputFilename, outputFilename } = mergedArgs;

  fs.readdirSync(fixturesRoot).forEach(dirName => {
    const dir = path.join(fixturesRoot, dirName);

    if (statSync(dir).isDirectory()) {
      const testName = startCase(dirName);
      const inputFilePath = path.join(dir, inputFilename);
      const outputFilePath = path.join(dir, outputFilename);

      if (!fs.existsSync(inputFilePath)) {
        throw new Error(`Fixture input file ${inputFilePath} does not exist.`);
      }

      if (!fs.existsSync(outputFilePath)) {
        throw new Error(`Fixture output file ${outputFilePath} does not exist.`);
      }

      const input = fs.readFileSync(inputFilePath).toString();
      const babelOutput = transformSync(input, babelOptions);
      const expectedLines = splitLines(fs.readFileSync(outputFilePath));

      describe(testName.toUpperCase(), () => {
        if (!babelOutput) {
          throw new Error(`Unable to transform file ${inputFilePath}.`);
        }

        if (babelOutput.code) {
          splitLines(babelOutput.code).forEach((line, i) => {
            const padLength = Math.min(String(expectedLines.length).length, 2);
            const number = String(i + 1).padStart(padLength, '0');

            test(`${testName}:${number} │ ${line}  ===  ${expectedLines[i]}`, () => {
              expect(line).toMatch(expectedLines[i]);
            });
          });
        } else {
          console.warn(chalk.yellow(`Input file ${inputFilePath} seems to be empty.`));
        }
      });
    }
  });
}
