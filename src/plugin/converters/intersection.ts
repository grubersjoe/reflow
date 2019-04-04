import {
  IntersectionTypeAnnotation,
  TSIntersectionType,
  isTSFunctionType,
  tsIntersectionType,
  tsParenthesizedType,
} from '@babel/types';
import { convertFlowType } from './flow-type';

export function convertIntersectionTypeAnnotation(
  node: IntersectionTypeAnnotation,
): TSIntersectionType {
  return tsIntersectionType(
    node.types.map(type => {
      const tsType = convertFlowType(type);

      // Function types need to be wrapped in parentheses in intersections
      return isTSFunctionType(tsType) ? tsParenthesizedType(tsType) : tsType;
    }),
  );
}
