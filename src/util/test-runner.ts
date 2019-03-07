import { transformSync, TransformOptions } from '@babel/core';
import fs, { statSync } from 'fs';
import path from 'path';

export interface TestRunnerArgs {
  babelOptions: TransformOptions;
  fixturesDirectory: string;
}

function toLines(code: Buffer | string): string[] {
  return code.toString().trim().split(/\r?\n/);
}

export function testFixtures(args: TestRunnerArgs): void {
  const { babelOptions, fixturesDirectory } = args;

  fs.readdirSync(fixturesDirectory).forEach(typeName => {
    const dir = path.join(fixturesDirectory, typeName);

    if (statSync(dir).isDirectory()) {
      const flowCode = fs.readFileSync(`${dir}/code.js`).toString();
      const output = transformSync(flowCode, babelOptions);
      const expectedCode = toLines(fs.readFileSync(`${dir}/output.ts`));

      describe(typeName, () => {
        test('Flow file could be transformed', () => {
          expect(output).not.toBeNull();
          // @ts-ignore
          expect(output.code).not.toBeNull();
        });

        // @ts-ignore
        toLines(output.code).forEach((line, lineNumber) => {
          const testNumber = (lineNumber + 1).toString().padStart(2, '0');

          test(`${typeName} #${testNumber}`, () => {
            expect(line).toMatch(expectedCode[lineNumber]);
          });
        });
      });
    }
  });
}
