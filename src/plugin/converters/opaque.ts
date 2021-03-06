import { PluginPass } from '@babel/core';
import {
  DeclareOpaqueType,
  OpaqueType,
  TSTypeAliasDeclaration,
  tsAnyKeyword,
  tsTypeAliasDeclaration,
} from '@babel/types';

import { convertFlowType } from './flow-type';
import { convertTypeParameterDeclaration } from './type-parameter';

export function convertOpaqueType(
  node: OpaqueType,
  state: PluginPass,
): TSTypeAliasDeclaration {
  // Supertype must be ignored (node.supertype).
  const typeParameters = convertTypeParameterDeclaration(
    node.typeParameters,
    state,
  );

  return tsTypeAliasDeclaration(
    node.id,
    typeParameters,
    convertFlowType(node.impltype, state),
  );
}

export function convertDeclareOpaqueType(
  node: DeclareOpaqueType,
  state: PluginPass,
): TSTypeAliasDeclaration {
  // Supertype must be ignored (node.supertype).
  const typeParameters = convertTypeParameterDeclaration(
    node.typeParameters,
    state,
  );
  const tsTypeAlias = tsTypeAliasDeclaration(
    node.id,
    typeParameters,
    tsAnyKeyword(),
  );

  tsTypeAlias.declare = true;

  return tsTypeAlias;
}
