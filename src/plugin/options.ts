import { TransformOptions } from '@babel/core';

import overflowPlugin, { OverflowOptions } from '.';

/**
 * Create the Babel configuration for runner using the plugin
 * @param overflowOptions Plugin options for Overflow
 */
export function getTransformOptions(
  overflowOptions?: OverflowOptions,
  overwrites?: TransformOptions,
): TransformOptions {
  const defaults = {
    babelrc: false,
    configFile: false,
    plugins: [[overflowPlugin, overflowOptions]],
    ...overwrites,
  };

  return Object.assign({}, defaults, overwrites);
}

/**
 * Add Babel syntax plugins for commonly used features and technologies
 * @param parserOpts
 */
export function setParserOptions(parserOpts: TransformOptions): void {
  if (!parserOpts.plugins) {
    throw new Error('Unexpected error');
  }

  parserOpts.plugins.push('classProperties');
  parserOpts.plugins.push([
    'decorators',
    {
      decoratorsBeforeExport: true,
    },
  ]);
  parserOpts.plugins.push('dynamicImport');
  parserOpts.plugins.push('flow');
  parserOpts.plugins.push('jsx');
}
