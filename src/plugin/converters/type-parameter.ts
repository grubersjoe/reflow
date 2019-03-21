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
  const typeParameter = tsTypeParameter();

  typeParameter.name = node.name;

  if (node.bound) {
    typeParameter.constraint = convertFlowType(node.bound.typeAnnotation);
  }

  if (node.default) {
    typeParameter.default = convertFlowType(node.default);
  }

  return typeParameter;
}

export function convertTypeParameterDeclaration(
  node: TypeParameterDeclaration,
): TSTypeParameterDeclaration {
  const params = node.params.map(convertTypeParameter);

  return tsTypeParameterDeclaration(params);
}

export function convertTypeParameterInstantiation(
  node: TypeParameterInstantiation,
): TSTypeParameterInstantiation {
  const params = node.params.map(convertFlowType);

  return tsTypeParameterInstantiation(params);
}
