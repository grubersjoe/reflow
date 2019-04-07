import { TransformOptions, ParserOptions } from '@babel/core';

import overflowPlugin, { PluginOptions } from '..';

/**
 * Create the Babel configuration for runners using the plugin
 */
export function getTransformOptions(
  pluginOptions?: PluginOptions,
  overwrites?: TransformOptions,
): TransformOptions {
  const defaultOptions = {
    babelrc: false,
    configFile: false,
    plugins: [[overflowPlugin, pluginOptions]],
  };

  return Object.assign({}, defaultOptions, overwrites);
}

/**
 * Add Babel syntax plugins for commonly used features and technologies
 */
export function setParserOptions(parserOpts: ParserOptions): void {
  const plugins = parserOpts.plugins || [];

  plugins.push('classProperties');
  plugins.push([
    'decorators',
    {
      decoratorsBeforeExport: true,
    },
  ]);
  plugins.push('dynamicImport');
  plugins.push('flow');
  plugins.push('jsx');

  parserOpts.plugins = plugins;

  parserOpts.startLine = 0;
}
