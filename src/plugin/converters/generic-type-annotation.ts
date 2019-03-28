import {
  GenericTypeAnnotation,
  TSTypeParameterInstantiation,
  TSTypeQuery,
  TSTypeReference,
  identifier,
  isIdentifier,
  isTSTypeQuery,
  isTSTypeReference,
  tsTypeQuery,
  tsTypeReference,
  Flow,
  isTypeAnnotation,
  isGenericTypeAnnotation,
} from '@babel/types';

import { convertTypeParameterInstantiation } from './type-parameter';
import { convertIdentifier } from './identifier';
import { UnexpectedError } from '../../util/error';
import { NodePath } from '@babel/traverse';

function convertClassUtility(
  typeParameters: TSTypeParameterInstantiation,
  path?: NodePath<Flow>,
): TSTypeQuery {
  // Class<T> has exactly one type parameter
  const typeParam = typeParameters.params[0];

  // type ClassType = Class<C> -> type ClassType = typeof C
  if (isTSTypeReference(typeParam)) {
    return tsTypeQuery(typeParam.typeName);
  }

  // Let c be an instance of the C class:
  // type ClassType = Class<typeof c> -> type ClassType = typeof C;
  if (isTSTypeQuery(typeParam) && isIdentifier(typeParam.exprName)) {
    if (!path) {
      throw new UnexpectedError('Expected parameter path not present');
    }

    const binding = path.scope.getBinding(typeParam.exprName.name);

    if (binding && isTypeAnnotation(binding.identifier.typeAnnotation)) {
      const flowType = binding.identifier.typeAnnotation.typeAnnotation;

      if (isGenericTypeAnnotation(flowType)) {
        return tsTypeQuery(convertIdentifier(flowType.id));
      }
    }
  }

  throw new UnexpectedError(`Unknown type parameter for Class<T> utility: ${typeParam.type}.`);
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
        return tsTypeReference(identifier('ReadonlyArray'), typeParameters);
    }
  }

  return tsTypeReference(id, typeParameters);
}
