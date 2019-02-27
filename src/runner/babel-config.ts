import pluginProposalClassProperties  from '@babel/plugin-proposal-class-properties';
import pluginProposalDecorators       from '@babel/plugin-proposal-decorators';
import pluginProposalObjectRestSpread from '@babel/plugin-proposal-object-rest-spread';
import pluginSyntaxDynamicImport      from '@babel/plugin-syntax-dynamic-import';
import pluginSyntaxFlow               from '@babel/plugin-syntax-flow';
import pluginSyntaxJSX                from '@babel/plugin-syntax-jsx';

import pluginOverflow from '../plugin';

export interface BabelConfiguration {
  configFile: false;
  plugins: Configuration<BABEL_PLUGINS>[];
  retainLines?: boolean;
}

// Just the plugin or the plugin and its configuration
type Configuration<T> = T | [T, object];

export enum BABEL_PLUGINS {
  OVERFLOW                    = pluginOverflow,
  PROPOSAL_CLASS_DECORATORS   = pluginProposalDecorators,
  PROPOSAL_CLASS_PROPERTIES   = pluginProposalClassProperties,
  PROPOSAL_OBJECT_REST_SPREAD = pluginProposalObjectRestSpread,
  SYNTAX_DYNAMIC_IMPORT       = pluginSyntaxDynamicImport,
  SYNTAX_JSX                  = pluginSyntaxJSX,
  SYNTAX_FLOW                 = pluginSyntaxFlow,
}

export function getBabelOptions(): BabelConfiguration {
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
