import { PluginPass } from '@babel/core';
import {
  TSAsExpression,
  TypeCastExpression,
  tsAsExpression,
} from '@babel/types';

import { convertFlowType } from './flow-type';

export function convertTypeCastExpression(
  node: TypeCastExpression,
  state: PluginPass,
): TSAsExpression {
  return tsAsExpression(
    node.expression,
    convertFlowType(node.typeAnnotation.typeAnnotation, state),
  );
}
