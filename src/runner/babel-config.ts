import { PluginObj, TransformOptions } from '@babel/core';

export type BabelPlugins =
  | 'OVERFLOW'
  | 'PROPOSAL_CLASS_DECORATORS'
  | 'PROPOSAL_CLASS_PROPERTIES'
  | 'PROPOSAL_OBJECT_REST_SPREAD'
  | 'SYNTAX_DYNAMIC_IMPORT'
  | 'SYNTAX_DYNAMIC_IMPORT'
  | 'SYNTAX_JSX'
  | 'SYNTAX_FLOW';

export type BabelPluginList = {
  [key in BabelPlugins]: PluginObj
};

export const BABEL_PLUGINS: { [key in BabelPlugins]: PluginObj } = {
  OVERFLOW                    : require('../plugin/index.ts'),
  PROPOSAL_CLASS_DECORATORS   : require('@babel/plugin-proposal-decorators'),
  PROPOSAL_CLASS_PROPERTIES   : require('@babel/plugin-proposal-class-properties'),
  PROPOSAL_OBJECT_REST_SPREAD : require('@babel/plugin-proposal-object-rest-spread'),
  SYNTAX_DYNAMIC_IMPORT       : require('@babel/plugin-syntax-dynamic-import'),
  SYNTAX_JSX                  : require('@babel/plugin-syntax-flow'),
  SYNTAX_FLOW                 : require('@babel/plugin-syntax-jsx'),
};

export function getBabelOptions(): TransformOptions {
  return {
    configFile: false,
    plugins: [
      BABEL_PLUGINS.OVERFLOW,
      [
        BABEL_PLUGINS.PROPOSAL_CLASS_DECORATORS,
        {
          legacy: true,
        },
      ],
      BABEL_PLUGINS.PROPOSAL_CLASS_PROPERTIES,
      BABEL_PLUGINS.PROPOSAL_OBJECT_REST_SPREAD,
      BABEL_PLUGINS.SYNTAX_DYNAMIC_IMPORT,
      BABEL_PLUGINS.SYNTAX_FLOW,
      BABEL_PLUGINS.SYNTAX_JSX,
    ],
    retainLines: true,
  };
}
