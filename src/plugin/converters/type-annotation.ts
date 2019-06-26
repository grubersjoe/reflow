import {
  BaseNode,
  FlowType,
  GenericTypeAnnotation,
  TSIndexedAccessType,
  TSTypeAnnotation,
  TSTypeOperator,
  TSTypeQuery,
  TSTypeReference,
  isIdentifier,
  tsTypeAnnotation,
  tsTypeReference,
} from '@babel/types';
import { NodePath } from '@babel/traverse';

import { ConverterState } from '../types';
import {
  convertClassUtility,
  convertDiffUtility,
  convertElementTypeUtility,
  convertReadOnlyArray,
} from './utility';
import { replaceNonPrimitiveType } from '../optimizers/non-primitive-types';
import { convertFlowType } from './flow-type';
import { convertIdentifier } from './identifier';
import { convertTypeParameterInstantiation } from './type-parameter';

type TSGenericTypeAnnotation = TSIndexedAccessType | TSTypeOperator | TSTypeQuery | TSTypeReference;

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
  path: NodePath<GenericTypeAnnotation>,
): TSGenericTypeAnnotation {
  const id = convertIdentifier(node.id);

  const typeParameters = node.typeParameters
    ? convertTypeParameterInstantiation(node.typeParameters, state)
    : null;

  if (isIdentifier(id)) {
    if (typeParameters) {
      switch (id.name) {
        case 'Class':
          return convertClassUtility(typeParameters, path);

        case '$Diff':
          return convertDiffUtility(typeParameters);

        case '$ElementType':
          return convertElementTypeUtility(typeParameters);

        case '$ReadOnlyArray':
          return convertReadOnlyArray(typeParameters);
      }
    }

    id.name = replaceNonPrimitiveType(id.name);
  }

  return tsTypeReference(id, typeParameters);
}
