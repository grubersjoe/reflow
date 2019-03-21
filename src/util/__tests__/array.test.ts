import { insertIf } from '../array';

describe('array util', () => {
  test('insertIf() returns empty array for true condition and no input parameters', () => {
    expect(insertIf(true)).toEqual([]);
  });

  test('insertIf() returns number array for true condition and numeric parameters', () => {
    expect(insertIf(true, 1, 2, 3)).toEqual([1, 2, 3]);
  });

  test('insertIf() returns empty array for false condition and any parameters', () => {
    expect(insertIf(false)).toEqual([]);
    expect(insertIf(false, {})).toEqual([]);
    expect(insertIf(false, null)).toEqual([]);
    expect(insertIf(false, 1)).toEqual([]);
    expect(insertIf(false, 1, 2, 3)).toEqual([]);
  });
});
