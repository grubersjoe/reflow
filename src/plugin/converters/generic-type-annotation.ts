import {
  GenericTypeAnnotation,
  TSTypeQuery,
  TSTypeReference,
  isIdentifier,
  isQualifiedTypeIdentifier,
  isTSTypeReference,
  tsTypeQuery,
  tsTypeReference,
} from '@babel/types';

import { convertTypeParameterInstantiation } from './type-parameter';
import { convertQualifiedTypeIdentifier } from './qualified-type-identifier';

export function convertGenericTypeAnnotation(
  node: GenericTypeAnnotation,
): TSTypeReference | TSTypeQuery {
  const { id } = node;

  const typeParameters = node.typeParameters
    ? convertTypeParameterInstantiation(node.typeParameters)
    : null;

  if (isQualifiedTypeIdentifier(id)) {
    return tsTypeReference(convertQualifiedTypeIdentifier(id), typeParameters);
  }

  if (isIdentifier(id) && typeParameters) {
    switch (id.name) {
      case 'Class': {
        // Class<T> has exactly one type parameter
        const type = typeParameters.params[0];
        if (isTSTypeReference(type)) {
          return tsTypeQuery(type.typeName);
        }
      }
    }
  }

  return tsTypeReference(id, typeParameters);
}
