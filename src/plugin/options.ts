import { TransformOptions } from '@babel/core';

import overflowPlugin, { PluginOptions } from '.';

/**
 * Create the Babel configuration for runner using the plugin
 * @param options Plugin options for Overflow
 */
export function getTransformOptions(
  options?: PluginOptions,
  overwrites?: TransformOptions,
): TransformOptions {
  const defaults = {
    babelrc: false,
    configFile: false,
    plugins: [[overflowPlugin, options]],
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
