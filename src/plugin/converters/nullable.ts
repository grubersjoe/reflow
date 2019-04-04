import {
  NullableTypeAnnotation,
  TSUnionType,
  isTSNullKeyword,
  tsNullKeyword,
  tsUndefinedKeyword,
  tsUnionType,
  isTSFunctionType,
  tsParenthesizedType,
} from '@babel/types';
import { convertFlowType } from './flow-type';

export function convertNullableTypeAnnotation(node: NullableTypeAnnotation): TSUnionType {
  const tsType = convertFlowType(node.typeAnnotation);

  return tsUnionType([
    // "?null" -> "null | undefined" not "null | null | undefined"
    // Also function types need to be wrapped in parentheses in unions
    ...(isTSNullKeyword(tsType)
      ? []
      : [isTSFunctionType(tsType) ? tsParenthesizedType(tsType) : tsType]),

    tsNullKeyword(),
    tsUndefinedKeyword(),
  ]);
}
