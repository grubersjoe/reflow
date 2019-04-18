import { TransformOptions, ParserOptions } from '@babel/core';

import overflowPlugin, { PluginOptions } from '.';

/**
 * Create the Babel configuration for runners using the plugin
 */
export function getTransformOptions(
  args: {
    pluginOptions?: PluginOptions;
    transformOptions?: TransformOptions;
  } = {},
): TransformOptions {
  const defaultOptions: TransformOptions = {
    babelrc: false,
    configFile: false,
    plugins: [[overflowPlugin, args.pluginOptions]],
  };

  return Object.assign({}, defaultOptions, args.transformOptions);
}

/**
 * Add Babel syntax plugins for commonly used features and technologies
 */
export function setParserOptions(parserOpts: ParserOptions): void {
  const plugins = parserOpts.plugins || [];

  plugins.push('classProperties', 'dynamicImport', 'flow', 'jsx');
  plugins.push([
    'decorators',
    {
      decoratorsBeforeExport: true,
    },
  ]);

  parserOpts.plugins = plugins;
}
