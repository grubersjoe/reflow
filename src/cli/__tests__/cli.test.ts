import { resolve } from 'path';

import { transpileFiles } from '../runner';
import { existsSync, unlinkSync } from 'fs';

const consoleError = jest.spyOn(console, 'error').mockImplementation();
const consoleLog = jest.spyOn(console, 'log').mockImplementation();

const baseDir = resolve('src/cli/__tests__/__fixtures__/');

describe('The CLI', () => {
  afterEach(() => {
    consoleError.mockReset();
    consoleLog.mockReset();
  });

  test('should generate `.d.ts` files for Flow declaration files', () => {
    const writtenFiles = transpileFiles({
      sources: [`${baseDir}/declaration.js`],
    });

    expect(writtenFiles).toHaveLength(1);
    expect(existsSync(`${baseDir}/declaration.d.ts`)).toBe(true);

    writtenFiles.forEach(unlinkSync);
  });

  test('should generate `.tsx` files for JSX files', () => {
    const writtenFiles = transpileFiles({
      sources: [`${baseDir}/jsx.js`],
    });

    expect(writtenFiles).toHaveLength(1);
    expect(existsSync(`${baseDir}/jsx.tsx`)).toBe(true);

    writtenFiles.forEach(unlinkSync);
  });

  test('should generate `.ts` files for modules and scripts', () => {
    const writtenFiles = transpileFiles({
      sources: [`${baseDir}/module.js`, `${baseDir}/script.js`],
    });

    expect(writtenFiles).toHaveLength(2);
    expect(existsSync(`${baseDir}/module.ts`)).toBe(true);
    expect(existsSync(`${baseDir}/script.ts`)).toBe(true);

    writtenFiles.forEach(unlinkSync);
  });

  test('should handle whole directories', () => {
    const writtenFiles = transpileFiles({
      sources: [baseDir],
    });

    expect(writtenFiles).toHaveLength(4);
    expect(existsSync(`${baseDir}/declaration.d.ts`)).toBe(true);
    expect(existsSync(`${baseDir}/jsx.tsx`)).toBe(true);
    expect(existsSync(`${baseDir}/module.ts`)).toBe(true);
    expect(existsSync(`${baseDir}/script.ts`)).toBe(true);

    writtenFiles.forEach(unlinkSync);
  });

  test('should skip invalid files', () => {
    const writtenFiles = transpileFiles({
      sources: [`${baseDir}/module.js`, `${baseDir}/invalid.json`],
      includePattern: '**/*.{js,jsx,json}',
    });

    expect(writtenFiles).toHaveLength(1);
  });

  test('should skip input files with syntax errors and log an error', () => {
    const writtenFiles = transpileFiles({
      sources: [`${baseDir}/syntax-error.js`],
    });

    expect(consoleError).toHaveBeenCalled();
    expect(writtenFiles).toHaveLength(0);
  });

  test('should log TypeScript code to stdout when setting dryRun option', () => {
    const writtenFiles = transpileFiles({
      sources: [`${baseDir}/module.js`],
      dryRun: true,
    });

    expect(consoleLog).toHaveBeenCalled();
    expect(writtenFiles).toHaveLength(0);
  });
});
