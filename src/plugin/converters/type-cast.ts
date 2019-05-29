import { TypeCastExpression, TSAsExpression, tsAsExpression } from '@babel/types';

import { ConverterState } from '../types';
import { convertFlowType } from './flow-type';

export function convertTypeCastExpression(
  node: TypeCastExpression,
  state: ConverterState,
): TSAsExpression {
  return tsAsExpression(
    node.expression,
    convertFlowType(node.typeAnnotation.typeAnnotation, state),
  );
}
