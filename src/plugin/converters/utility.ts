import {
  Flow,
  TSTypeParameterInstantiation,
  TSTypeQuery,
  TSTypeReference,
  identifier,
  isGenericTypeAnnotation,
  isIdentifier,
  isTSTypeQuery,
  isTSTypeReference,
  isTypeAnnotation,
  tsTypeQuery,
  tsTypeReference,
} from '@babel/types';
import { NodePath } from '@babel/traverse';

import { UnexpectedError } from '../../util/error';
import { convertIdentifier } from './identifier';

export function convertClassUtility(
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
      throw new UnexpectedError('Expected argument typeof NodePath<Flow> not given.');
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

export function convertReadOnlyArray(
  typeParameters: TSTypeParameterInstantiation,
): TSTypeReference {
  return tsTypeReference(identifier('ReadonlyArray'), typeParameters);
}
