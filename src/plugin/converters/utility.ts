import {
  Flow,
  identifier,
  isGenericTypeAnnotation,
  isIdentifier,
  isTSPropertySignature,
  isTSTypeLiteral,
  isTSTypeQuery,
  isTSTypeReference,
  isTypeAnnotation,
  stringLiteral,
  TSIndexedAccessType,
  tsIndexedAccessType,
  tsLiteralType,
  TSTypeLiteral,
  TSTypeOperator,
  tsTypeOperator,
  tsTypeParameterInstantiation,
  TSTypeParameterInstantiation,
  tsTypeQuery,
  TSTypeQuery,
  tsTypeReference,
  TSTypeReference,
  tsUnionType,
} from '@babel/types';
import { NodePath } from '@babel/traverse';

import { UnexpectedError } from '../../util/error';
import { convertIdentifier } from './identifier';

type UtilConvertor<R> = (typeParameters: TSTypeParameterInstantiation) => R;

export const convertCallUtility: UtilConvertor<TSTypeReference> = typeParameters =>
  tsTypeReference(identifier('ReturnType'), typeParameters);

export function convertClassUtil(
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

export const convertDiffUtil: UtilConvertor<TSTypeReference> = typeParameters => {
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

export const convertElementTypeUtil: UtilConvertor<TSIndexedAccessType> = typeParameters =>
  tsIndexedAccessType(typeParameters.params[0], typeParameters.params[1]);

export const convertExactUtil: UtilConvertor<TSTypeReference | TSTypeLiteral> = typeParameters => {
  const typeParam = typeParameters.params[0];

  if (isTSTypeReference(typeParam) || isTSTypeLiteral(typeParam)) {
    return typeParam;
  }

  throw new UnexpectedError(`Unexpected type parameter for $Exact<T>: ${typeParam.type}`);
};

export const convertKeysUtil: UtilConvertor<TSTypeOperator> = typeParameters => {
  const typeOperator = tsTypeOperator(typeParameters.params[0]);
  typeOperator.operator = 'keyof';

  return typeOperator;
};

export const convertNonMaybeTypeUtil: UtilConvertor<TSTypeReference> = typeParameters =>
  tsTypeReference(identifier('NonNullable'), typeParameters);

export const convertPropertyTypeUtil: UtilConvertor<TSIndexedAccessType> = typeParameters =>
  tsIndexedAccessType(typeParameters.params[0], typeParameters.params[1]);

export const convertReadOnlyArrayUtil: UtilConvertor<TSTypeReference> = typeParameters =>
  tsTypeReference(identifier('ReadonlyArray'), typeParameters);

export const convertRestUtil: UtilConvertor<TSTypeReference> = typeParameters => {
  const [typeName, restArg] = typeParameters.params;

  const omitArg = isTSTypeLiteral(restArg)
    ? tsUnionType(
        restArg.members.map(typeElem => {
          return tsLiteralType(
            stringLiteral(
              isTSPropertySignature(typeElem) && isIdentifier(typeElem.key)
                ? typeElem.key.name
                : '',
            ),
          );
        }),
      )
    : restArg;

  return tsTypeReference(identifier('Omit'), tsTypeParameterInstantiation([typeName, omitArg]));
};

export const convertShapeUtil: UtilConvertor<TSTypeReference> = typeParameters =>
  tsTypeReference(identifier('Partial'), typeParameters);
