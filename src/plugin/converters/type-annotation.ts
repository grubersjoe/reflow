import {
  BaseNode,
  FlowType,
  GenericTypeAnnotation,
  TSTypeAnnotation,
  TSTypeQuery,
  TSTypeReference,
  isIdentifier,
  tsTypeAnnotation,
  tsTypeReference,
} from '@babel/types';
import { NodePath } from '@babel/traverse';

import { ConverterState } from '../types';
import { convertClassUtility, convertReadOnlyArray } from './utility';
import { replaceNonPrimitiveType } from '../optimizers/non-primitive-types';
import { convertFlowType } from './flow-type';
import { convertIdentifier } from './identifier';
import { convertTypeParameterInstantiation } from './type-parameter';

interface TypeAnnotationWithFlowType extends BaseNode {
  typeAnnotation: FlowType;
}

export function convertTypeAnnotation(
  node: TypeAnnotationWithFlowType,
  state: ConverterState,
): TSTypeAnnotation {
  return tsTypeAnnotation(convertFlowType(node.typeAnnotation, state));
}

export function convertGenericTypeAnnotation(
  node: GenericTypeAnnotation,
  state: ConverterState,
  path?: NodePath<GenericTypeAnnotation>,
): TSTypeReference | TSTypeQuery {
  const id = convertIdentifier(node.id);

  const typeParameters = node.typeParameters
    ? convertTypeParameterInstantiation(node.typeParameters, state)
    : null;

  if (isIdentifier(id)) {
    if (typeParameters) {
      // Utility types
      switch (id.name) {
        case 'Class':
          return convertClassUtility(typeParameters, path);

        case '$ReadOnlyArray':
          return convertReadOnlyArray(typeParameters);
      }
    }

    id.name = replaceNonPrimitiveType(id.name);
  }

  return tsTypeReference(id, typeParameters);
}
