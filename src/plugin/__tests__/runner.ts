import { transformSync, TransformOptions } from '@babel/core';
import fs, { statSync } from 'fs';
import path from 'path';

import { upperCamelCase } from '../../util/string';

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

function splitLines(code: Buffer | string): string[] {
  const BLANK_LINES = /^\s*\n/gm;
  const LINE_BREAKS = /\r?\n/;

  return code
    .toString()
    .trim()
    .replace(BLANK_LINES, '')
    .split(LINE_BREAKS);
}

export function runFixtureTests(args: FixtureTestRunnerArgs): void {
  const mergedArgs = Object.assign({}, defaultFixtureRunnerArgs, args);
  const { babelOptions, fixturesRoot, inputFilename, outputFilename } = mergedArgs;

  fs.readdirSync(fixturesRoot).forEach(dirName => {
    const dir = path.join(fixturesRoot, dirName);

    if (statSync(dir).isDirectory()) {
      const testName = upperCamelCase(dirName);
      const filePath = path.join(dir, inputFilename);

      const input = fs.readFileSync(filePath).toString();
      const output = transformSync(input, babelOptions);
      const expectedOutput = splitLines(fs.readFileSync(`${dir}/${outputFilename}`));

      describe(testName, () => {
        if (!output) {
          throw new Error(`Unable to transform file ${filePath}.`);
        }

        if (!output.code) {
          throw new Error(`Emitted code for file ${filePath} is empty.`);
        }

        const outputLines = splitLines(output.code);

        if (outputLines.length !== expectedOutput.length) {
          throw new Error('Input and output files do not contain the same number of fixtures.');
        }

        outputLines.forEach((line, i) => {
          // + 1 because first line of input files is always the @flow directive
          const padLength = Math.min(String(expectedOutput.length).length, 2);
          const lineNumber = String(i + 1).padStart(padLength, '0');

          test(`${testName}:${lineNumber} is equals expected output`, () => {
            expect(line).toMatch(expectedOutput[i]);
          });
        });
      });
    }
  });
}
