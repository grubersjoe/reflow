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

import { ConverterState } from '../types';
import { WARNINGS, logWarning } from '../util/warnings';
import { convertFlowType } from './flow-type';

export function convertTypeParameter(node: TypeParameter, state: ConverterState): TSTypeParameter {
  const typeParameter = tsTypeParameter(undefined, undefined, node.name || '');

  if (node.bound) {
    typeParameter.constraint = convertFlowType(node.bound.typeAnnotation, state);
  }

  if (node.default) {
    typeParameter.default = convertFlowType(node.default, state);
  }

  if (node.variance) {
    logWarning(WARNINGS.genericTypeAnnotation.variance, state.file.code, node.variance.loc);
  }

  return typeParameter;
}

export function convertTypeParameterDeclaration(
  node: TypeParameterDeclaration | null,
  state: ConverterState,
): TSTypeParameterDeclaration | null {
  if (node === null) {
    return null;
  }

  return tsTypeParameterDeclaration(node.params.map(node => convertTypeParameter(node, state)));
}

export function convertTypeParameterInstantiation(
  node: TypeParameterInstantiation | null,
  state: ConverterState,
): TSTypeParameterInstantiation | null {
  if (node === null) {
    return null;
  }

  return tsTypeParameterInstantiation(node.params.map(param => convertFlowType(param, state)));
}
