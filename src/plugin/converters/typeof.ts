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
import { convertIdentifier } from './identifier';

export function convertTypeofTypeAnnotation(
  node: TypeofTypeAnnotation,
): TSTypeQuery | TSUndefinedKeyword {
  if (isGenericTypeAnnotation(node.argument)) {
    const id = convertIdentifier(node.argument.id);

    if (isIdentifier(id) && id.name === 'undefined') {
      return tsUndefinedKeyword();
    }

    return tsTypeQuery(id);
  }

  throw new UnexpectedError('TypeofTypeAnnotation with unexpected argument.');
}
