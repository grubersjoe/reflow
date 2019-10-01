import { TransformOptions } from '@babel/core';

import { getTransformOptions } from '../util/options';
import reflowPlugin from '..';
import { logWarning, WARNINGS } from '../util/warnings';

const defaultOptions: TransformOptions = {
  babelrc: false,
  comments: false,
  compact: true,
  configFile: false,
  plugins: [[reflowPlugin, undefined]],
};

describe('getTransformOptions()', () => {
  test('should return default options when no arguments are given', () => {
    expect(getTransformOptions()).toStrictEqual(defaultOptions);
  });

  test('should return correct options when plugin options are set', () => {
    const expected = Object.assign({}, defaultOptions, {
      plugins: [
        [
          reflowPlugin,
          {
            replaceDecorators: true,
          },
        ],
      ],
    });

    const actual = getTransformOptions({
      pluginOptions: {
        replaceDecorators: true,
      },
    });

    expect(actual).toStrictEqual(expected);
  });

  test('should return correct options when transform options are set', () => {
    const expected = Object.assign({}, defaultOptions, {
      comments: true,
      compact: false,
    });

    const actual = getTransformOptions({
      transformOptions: {
        comments: true,
        compact: false,
      },
    });

    expect(actual).toStrictEqual(expected);
  });
});

describe('logWarning()', () => {
  const code = '//';
  const loc = {
    start: {
      line: 0,
      column: 0,
    },
    end: {
      line: 1,
      column: 10,
    },
  };

  const consoleLog = jest.spyOn(console, 'log').mockImplementation();

  afterEach(() => {
    consoleLog.mockReset();
  });

  test('should log a warning', () => {
    logWarning(WARNINGS.unsupportedUtility, code, loc);
    expect(consoleLog).toBeCalledTimes(1);
  });

  test('should throw an exception if no location is given', () => {
    expect(() => logWarning(WARNINGS.opaqueType, code, null)).toThrow();
  });
});
