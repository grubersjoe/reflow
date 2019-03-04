import { PluginObj, TransformOptions } from '@babel/core';

import { OverflowOptions } from '../plugin';

export type BabelPlugins =
  | 'OVERFLOW'
  | 'PROPOSAL_CLASS_DECORATORS'
  | 'PROPOSAL_CLASS_PROPERTIES'
  | 'PROPOSAL_OBJECT_REST_SPREAD'
  | 'SYNTAX_DYNAMIC_IMPORT'
  | 'SYNTAX_DYNAMIC_IMPORT';

type PluginMap = { [key in BabelPlugins]: PluginObj };

export const BABEL_PLUGINS: { [key in BabelPlugins]: PluginObj } = {
  OVERFLOW                    : require('../plugin/index.ts'),
  PROPOSAL_CLASS_DECORATORS   : require('@babel/plugin-proposal-decorators'),
  PROPOSAL_CLASS_PROPERTIES   : require('@babel/plugin-proposal-class-properties'),
  PROPOSAL_OBJECT_REST_SPREAD : require('@babel/plugin-proposal-object-rest-spread'),
  SYNTAX_DYNAMIC_IMPORT       : require('@babel/plugin-syntax-dynamic-import'),
};
/**
 * Create the Babel configuration for the runner
 * @param options Plugin options for Overflow
 */
export function getTransformOptions(options: OverflowOptions): TransformOptions {
  return {
    configFile: false,
    plugins: [
      [
        BABEL_PLUGINS.OVERFLOW,
        options
      ],
      [
        BABEL_PLUGINS.PROPOSAL_CLASS_DECORATORS,
        {
          legacy: true,
        },
      ],
      BABEL_PLUGINS.PROPOSAL_CLASS_PROPERTIES,
      BABEL_PLUGINS.PROPOSAL_OBJECT_REST_SPREAD,
      BABEL_PLUGINS.SYNTAX_DYNAMIC_IMPORT,
    ],
    retainLines: true,
  };
}
