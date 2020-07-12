import { PluginPass } from '@babel/core';
import {
  NullableTypeAnnotation,
  TSUnionType,
  isTSFunctionType,
  isTSNullKeyword,
  tsNullKeyword,
  tsParenthesizedType,
  tsUndefinedKeyword,
  tsUnionType,
} from '@babel/types';

import { convertFlowType } from './flow-type';

export function convertNullableTypeAnnotation(
  node: NullableTypeAnnotation,
  state: PluginPass,
): TSUnionType {
  const tsType = convertFlowType(node.typeAnnotation, state);

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
