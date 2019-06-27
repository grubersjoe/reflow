import {
  Flow,
  TSIndexedAccessType,
  TSTypeLiteral,
  TSTypeParameterInstantiation,
  TSTypeQuery,
  TSTypeReference,
  identifier,
  isGenericTypeAnnotation,
  isIdentifier,
  isStringLiteral,
  isTSEntityName,
  isTSLiteralType,
  isTSTypeLiteral,
  isTSTypeQuery,
  isTSTypeReference,
  isTypeAnnotation,
  tsIndexedAccessType,
  tsTypeOperator,
  tsTypeQuery,
  tsTypeReference,
  TSTypeOperator,
} from '@babel/types';
import { NodePath } from '@babel/traverse';

import { UnexpectedError } from '../../util/error';
import { convertIdentifier } from './identifier';

type UtilConvertor<R> = (typeParameters: TSTypeParameterInstantiation) => R;

export function convertClassUtility(
  typeParameters: TSTypeParameterInstantiation,
  path: NodePath<Flow>,
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

export const convertDiffUtility: UtilConvertor<TSTypeReference> = typeParameters => {
  // $Diff takes exactly two type parameters
  const secondParam = typeParameters.params[1];

  if (isTSTypeReference(secondParam) && isIdentifier(secondParam.typeName)) {
    secondParam.typeName.name = `keyof ${secondParam.typeName.name}`;
  }

  // Literals need to be wrapped in a TypeOperator
  if (isTSTypeLiteral(secondParam)) {
    const typeOperator = tsTypeOperator(secondParam);
    typeOperator.operator = 'keyof';
    typeParameters.params[1] = typeOperator;
  }

  return tsTypeReference(identifier('Omit'), typeParameters);
};

export const convertElementTypeUtility: UtilConvertor<TSIndexedAccessType> = typeParameters => {
  // $ElementType takes exactly two type parameters
  const firstParam = typeParameters.params[0];
  const secondParam = typeParameters.params[1];

  if (!isTSLiteralType(secondParam) || !isStringLiteral(secondParam.literal)) {
    throw new UnexpectedError(
      `Second type parameter ${secondParam.type} of $ElementType is not a string literal.`,
    );
  }

  if (isTSTypeReference(firstParam) && isTSEntityName(firstParam.typeName)) {
    return tsIndexedAccessType(tsTypeReference(firstParam.typeName), secondParam);
  }

  if (isTSTypeLiteral(firstParam)) {
    return tsIndexedAccessType(firstParam, secondParam);
  }

  throw new UnexpectedError(`Unexpected type parameter for $ElementType<T, K>: ${firstParam.type}`);
};

export const convertExactUtility: UtilConvertor<
  TSTypeReference | TSTypeLiteral
> = typeParameters => {
  const typeParam = typeParameters.params[0];

  if (isTSTypeReference(typeParam) || isTSTypeLiteral(typeParam)) {
    return typeParam;
  }

  throw new UnexpectedError(`Unexpected type parameter for $Exact<T>: ${typeParam.type}`);
};

export const convertKeysUtility: UtilConvertor<TSTypeOperator> = typeParameters => {
  const typeOperator = tsTypeOperator(typeParameters.params[0]);
  typeOperator.operator = 'keyof';

  return typeOperator;
};

export const convertReadOnlyArray: UtilConvertor<TSTypeReference> = typeParameters =>
  tsTypeReference(identifier('ReadonlyArray'), typeParameters);
