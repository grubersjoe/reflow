import {
  DeclareOpaqueType,
  OpaqueType,
  TSTypeAliasDeclaration,
  tsAnyKeyword,
  tsTypeAliasDeclaration,
} from '@babel/types';

import { ConverterState } from '../types';
import { convertFlowType } from './flow-type';
import { convertTypeParameterDeclaration } from './type-parameter';

export function convertOpaqueType(node: OpaqueType, state: ConverterState): TSTypeAliasDeclaration {
  // Supertype must be ignored (node.supertype).
  const typeParameters = convertTypeParameterDeclaration(node.typeParameters, state);

  return tsTypeAliasDeclaration(node.id, typeParameters, convertFlowType(node.impltype, state));
}

export function convertDeclareOpaqueType(
  node: DeclareOpaqueType,
  state: ConverterState,
): TSTypeAliasDeclaration {
  // Supertype must be ignored (node.supertype).
  const typeParameters = convertTypeParameterDeclaration(node.typeParameters, state);
  const tsTypeAlias = tsTypeAliasDeclaration(node.id, typeParameters, tsAnyKeyword());

  tsTypeAlias.declare = true;

  return tsTypeAlias;
}
