import { transformSync, TransformOptions } from '@babel/core';
import fs, { statSync } from 'fs';
import path from 'path';

export interface TestRunnerArgs {
  babelOptions: TransformOptions;
  fixturesRoot: string;
}

function splitLines(code: Buffer | string): string[] {
  return code.toString().trim().split(/\r?\n/);
}

export function runFixtureTests(args: TestRunnerArgs): void {
  const { babelOptions, fixturesRoot } = args;

  fs.readdirSync(fixturesRoot).forEach(typeName => {
    const dir = path.join(fixturesRoot, typeName);

    if (statSync(dir).isDirectory()) {
      const input = fs.readFileSync(`${dir}/code.js`).toString();
      const output = transformSync(input, babelOptions);
      const expectedOutput = splitLines(fs.readFileSync(`${dir}/output.ts`));

      describe(typeName, () => {
        test('Flow file could be transformed', () => {
          expect(output).not.toBeNull();
          // @ts-ignore
          expect(output.code).not.toBeNull();
        });

        // @ts-ignore
        splitLines(output.code).forEach((line, lineNumber) => {
          const testNumber = (lineNumber + 1).toString().padStart(2, '0');

          test(`${typeName} #${testNumber}`, () => {
            expect(line).toMatch(expectedOutput[lineNumber]);
          });
        });
      });
    }
  });
}
