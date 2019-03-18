import {
  TypeParameterInstantiation,
  TSTypeParameterInstantiation,
  tsTypeParameterInstantiation,
  TypeParameter,
  TSTypeParameter,
  tsTypeParameter,
  TypeParameterDeclaration,
  TSTypeParameterDeclaration,
  tsTypeParameterDeclaration,
} from '@babel/types';

import { convertFlowType } from './flow-type';

export function convertTypeParameterInstantiation(
  node: TypeParameterInstantiation,
): TSTypeParameterInstantiation {
  const params = node.params.map(param => convertFlowType(param));

  return tsTypeParameterInstantiation(params);
}

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
