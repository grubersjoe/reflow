import { PluginPass } from '@babel/core';
import {
  TSUnionType,
  UnionTypeAnnotation,
  isTSFunctionType,
  tsParenthesizedType,
  tsUnionType,
} from '@babel/types';

import { convertFlowType } from './flow-type';

export function convertUnionTypeAnnotation(
  node: UnionTypeAnnotation,
  state: PluginPass,
): TSUnionType {
  return tsUnionType(
    node.types.map(type => {
      const tsType = convertFlowType(type, state);

      // Function types need to be wrapped in parentheses in unions
      return isTSFunctionType(tsType) ? tsParenthesizedType(tsType) : tsType;
    }),
  );
}
