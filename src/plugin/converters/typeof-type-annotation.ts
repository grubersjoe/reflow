import {
  TSTypeQuery,
  TSUndefinedKeyword,
  TypeofTypeAnnotation,
  isGenericTypeAnnotation,
  isIdentifier,
  tsTypeQuery,
  tsUndefinedKeyword,
} from '@babel/types';

import { UnexpectedError } from '../../util/error';
import { getQualifiedName } from './qualified-type-identifier';

export function convertTypeofTypeAnnotation(
  node: TypeofTypeAnnotation,
): TSTypeQuery | TSUndefinedKeyword {
  const { argument } = node;

  if (isGenericTypeAnnotation(argument)) {
    const { id } = argument;

    if (isIdentifier(id)) {
      if (id.name === 'undefined') {
        return tsUndefinedKeyword();
      } else {
        return tsTypeQuery(id);
      }
    } else {
      return tsTypeQuery(getQualifiedName(id));
    }
  }

  throw new UnexpectedError('TypeofTypeAnnoatation with unexpected argument');
}
