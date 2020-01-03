import { TransformOptions } from '@babel/core';
import { ParserPlugin } from '@babel/parser';

import reflowPlugin, { ReflowOptions } from '..';

/**
 * Create the Babel configuration for runners using the plugin
 */
export function getTransformOptions(
  overwrites: {
    pluginOptions?: ReflowOptions;
    transformOptions?: TransformOptions;
  } = {},
): TransformOptions {
  const defaultOptions: TransformOptions = {
    babelrc: false,
    comments: false,
    configFile: false,
    plugins: [[reflowPlugin, overwrites.pluginOptions]],
  };

  return Object.assign({}, defaultOptions, overwrites.transformOptions);
}

/**
 * Add Babel syntax plugins for commonly used features and technologies
 */
export function getParserPlugins(typeSystem: 'flow' | 'typescript'): ParserPlugin[] {
  // The `all` option for Flow is imported to avoid parsing errors!
  // See https://babeljs.io/docs/en/babel-parser#plugins-options
  // prettier-ignore
  const typePlugin: ParserPlugin = typeSystem === 'flow'
    ? ['flow', { all: true }]
    : 'typescript';

  return [
    typePlugin,
    'classProperties',
    'dynamicImport',
    'jsx',
    'nullishCoalescingOperator',
    'optionalChaining',
    [
      'decorators',
      {
        decoratorsBeforeExport: true,
      },
    ],
  ];
}
