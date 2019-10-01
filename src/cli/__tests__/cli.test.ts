import { resolve } from 'path';

import { transpileFiles } from '../runner';
import { existsSync, unlinkSync } from 'fs';

const baseDir = resolve('src/cli/__tests__/__fixtures__/');

describe('Runner', () => {
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

  // test('should ');
});
