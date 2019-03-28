import { TypeCastExpression, TSAsExpression, tsAsExpression } from '@babel/types';

import { convertFlowType } from './flow-type';

export function convertTypeCastExpression(node: TypeCastExpression): TSAsExpression {
  return tsAsExpression(node.expression, convertFlowType(node.typeAnnotation.typeAnnotation));
}
