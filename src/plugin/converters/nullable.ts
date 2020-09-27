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
  options = {
    skipUndefined: false,
  },
): TSUnionType {
  const tsType = convertFlowType(node.typeAnnotation, state);
  const unionElements = [];

  // "?null" -> "null | undefined" not "null | null | undefined"
  // Also function types need to be wrapped in parentheses in unions
  if (!isTSNullKeyword(tsType)) {
    unionElements.push(
      isTSFunctionType(tsType) ? tsParenthesizedType(tsType) : tsType,
    );
  }

  unionElements.push(tsNullKeyword());

  if (!options.skipUndefined) {
    unionElements.push(tsUndefinedKeyword());
  }

  return tsUnionType(unionElements);
}
