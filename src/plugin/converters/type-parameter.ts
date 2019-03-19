import {
  TSTypeParameter,
  TSTypeParameterDeclaration,
  TSTypeParameterInstantiation,
  TypeParameter,
  TypeParameterDeclaration,
  TypeParameterInstantiation,
  tsTypeParameter,
  tsTypeParameterDeclaration,
  tsTypeParameterInstantiation,
} from '@babel/types';

import { convertFlowType } from './flow-type';

export function convertTypeParameter(node: TypeParameter): TSTypeParameter {
  const { bound, name } = node;
  const tsNode = tsTypeParameter();

  tsNode.name = name;

  if (bound) {
    tsNode.constraint = convertFlowType(bound.typeAnnotation);
  }

  return tsNode;
}

export function convertTypeParameterDeclaration(
  node: TypeParameterDeclaration,
): TSTypeParameterDeclaration {
  const params = node.params.map(param => convertTypeParameter(param));

  return tsTypeParameterDeclaration(params);
}

export function convertTypeParameterInstantiation(
  node: TypeParameterInstantiation,
): TSTypeParameterInstantiation {
  const params = node.params.map(param => convertFlowType(param));

  return tsTypeParameterInstantiation(params);
}
