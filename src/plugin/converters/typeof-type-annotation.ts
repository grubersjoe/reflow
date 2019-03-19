import {
  TypeofTypeAnnotation,
  TSTypeQuery,
  tsTypeQuery,
  TSUndefinedKeyword,
  tsUndefinedKeyword,
  isGenericTypeAnnotation,
  isIdentifier,
  isQualifiedTypeIdentifier,
} from '@babel/types';
import { NotImplementedError, UnexpectedError } from '../../util/error';

export function convertTypeofTypeAnnotation(
  node: TypeofTypeAnnotation,
): TSTypeQuery | TSUndefinedKeyword {
  const { argument } = node;

  if (isGenericTypeAnnotation(argument)) {
    if (isIdentifier(argument.id)) {
      if (argument.id.name === 'undefined') {
        return tsUndefinedKeyword();
      } else {
        return tsTypeQuery(argument.id);
      }
    }

    if (isQualifiedTypeIdentifier(argument.id)) {
      throw new NotImplementedError('QualifiedTypeIdentifier');
    }
  }

  throw new UnexpectedError('TypeofTypeAnnoatation with unexpected argument');
}
