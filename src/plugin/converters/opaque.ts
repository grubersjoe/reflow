import {
  DeclareOpaqueType,
  OpaqueType,
  TSTypeAliasDeclaration,
  tsAnyKeyword,
  tsTypeAliasDeclaration,
} from '@babel/types';

import { convertFlowType } from './flow-type';
import { convertTypeParameterDeclaration } from './type-parameter';

export function convertOpaqueType(node: OpaqueType): TSTypeAliasDeclaration {
  // Supertype must be ignored (node.supertype).
  const typeParameters = convertTypeParameterDeclaration(node.typeParameters);

  return tsTypeAliasDeclaration(node.id, typeParameters, convertFlowType(node.impltype));
}

export function convertDeclareOpaqueType(node: DeclareOpaqueType): TSTypeAliasDeclaration {
  // Supertype must be ignored (node.supertype).
  const typeParameters = convertTypeParameterDeclaration(node.typeParameters);
  const tsTypeAlias = tsTypeAliasDeclaration(node.id, typeParameters, tsAnyKeyword());

  tsTypeAlias.declare = true;

  return tsTypeAlias;
}
