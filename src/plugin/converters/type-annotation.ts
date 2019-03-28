import {
  BaseNode,
  Flow,
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

import { convertIdentifier } from './identifier';
import { convertFlowType } from './flow-type';
import { convertTypeParameterInstantiation } from './type-parameter';
import { convertClassUtility, convertReadOnlyArray } from './utility';

interface TypeAnnotationWithFlowType extends BaseNode {
  typeAnnotation: FlowType;
}

export function convertTypeAnnotation(node: TypeAnnotationWithFlowType): TSTypeAnnotation {
  return tsTypeAnnotation(convertFlowType(node.typeAnnotation));
}

export function convertGenericTypeAnnotation(
  node: GenericTypeAnnotation,
  path?: NodePath<Flow>,
): TSTypeReference | TSTypeQuery {
  const id = convertIdentifier(node.id);

  const typeParameters = node.typeParameters
    ? convertTypeParameterInstantiation(node.typeParameters)
    : null;

  if (isIdentifier(id) && typeParameters) {
    switch (id.name) {
      case 'Class':
        return convertClassUtility(typeParameters, path);

      case '$ReadOnlyArray':
        return convertReadOnlyArray(typeParameters);
    }
  }

  return tsTypeReference(id, typeParameters);
}
