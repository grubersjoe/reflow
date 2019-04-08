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
import { PluginWarnings, WARNINGS } from '../util/warning';

export function convertTypeParameter(node: TypeParameter): TSTypeParameter {
  const typeParameter = tsTypeParameter();

  typeParameter.name = node.name;

  if (node.bound) {
    typeParameter.constraint = convertFlowType(node.bound.typeAnnotation);
  }

  if (node.default) {
    typeParameter.default = convertFlowType(node.default);
  }

  if (node.variance) {
    PluginWarnings.enable(WARNINGS.GenericTypeAnnotation.Variance);
  }

  return typeParameter;
}

export function convertTypeParameterDeclaration(
  node: TypeParameterDeclaration | null,
): TSTypeParameterDeclaration | null {
  if (node === null) {
    return null;
  }

  return tsTypeParameterDeclaration(node.params.map(convertTypeParameter));
}

export function convertTypeParameterInstantiation(
  node: TypeParameterInstantiation | null,
): TSTypeParameterInstantiation | null {
  if (node === null) {
    return null;
  }

  return tsTypeParameterInstantiation(node.params.map(param => convertFlowType(param)));
}
