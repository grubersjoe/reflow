import { resolve } from 'path';

import { isValidSource, validateArgs } from '../util';

const baseDir = resolve('src/cli/__tests__/__fixtures__/');

describe('isValidSource()', () => {
  test('should return true for valid sources', () => {
    const sources = [`${baseDir}/module.js`, `${baseDir}/script.js`];
    expect(isValidSource(...sources)).toBe(true);
  });

  test('should return false for invalid sources', () => {
    const sources = [`${baseDir}/invalid.json`];
    expect(isValidSource(...sources)).toBe(false);
  });

  test('should return false for non existing sources', () => {
    const sources = [`${baseDir}/non-existing.js`];
    expect(isValidSource(...sources)).toBe(false);
  });
});

describe('validateArgs()', () => {
  test('should return false if source is empty array', () => {
    expect(validateArgs([])).toBe(false);
  });

  test('should return false if source does not exist', () => {
    const sources = [`${baseDir}/non-existing.js`];
    expect(validateArgs(sources)).toBe(false);
  });

  test('should return false if source is invalid', () => {
    const sources = [`${baseDir}/invalid.json`];
    expect(validateArgs(sources)).toBe(false);
  });
});
