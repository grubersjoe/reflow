import {
  TSUnionType,
  UnionTypeAnnotation,
  isTSFunctionType,
  tsParenthesizedType,
  tsUnionType,
} from '@babel/types';
import { convertFlowType } from './flow-type';

export function convertUnionTypeAnnotation(node: UnionTypeAnnotation): TSUnionType {
  return tsUnionType(
    node.types.map(type => {
      const tsType = convertFlowType(type);

      // Function types need to be wrapped in parentheses in unions
      return isTSFunctionType(tsType) ? tsParenthesizedType(tsType) : tsType;
    }),
  );
}
