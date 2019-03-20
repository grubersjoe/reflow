import { BaseNode, FlowType, TSTypeAnnotation, tsTypeAnnotation } from '@babel/types';

import { convertFlowType } from './flow-type';

interface FlowTypeAnnotation extends BaseNode {
  typeAnnotation: FlowType;
}

export function convertTypeAnnotation(node: FlowTypeAnnotation): TSTypeAnnotation {
  return tsTypeAnnotation(convertFlowType(node.typeAnnotation));
}
