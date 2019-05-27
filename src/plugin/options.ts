import { TransformOptions } from '@babel/core';
import { ParserPlugin } from '@babel/parser';

import reflowPlugin, { ReflowOptions } from '.';

/**
 * Create the Babel configuration for runners using the plugin
 */
export function getTransformOptions(
  args: {
    pluginOptions?: ReflowOptions;
    transformOptions?: TransformOptions;
  } = {},
): TransformOptions {
  const defaultOptions: TransformOptions = {
    babelrc: false,
    configFile: false,
    comments: false,
    plugins: [[reflowPlugin, args.pluginOptions]],
  };

  return Object.assign({}, defaultOptions, args.transformOptions);
}

/**
 * Add Babel syntax plugins for commonly used features and technologies
 */
export function getParserPlugins(): ParserPlugin[] {
  return [
    'classProperties',
    'dynamicImport',
    'jsx',
    [
      'decorators',
      {
        decoratorsBeforeExport: true,
      },
    ],
  ];
}
