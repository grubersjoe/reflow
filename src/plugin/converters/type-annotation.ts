import { TSTypeAnnotation, TypeAnnotation, tsTypeAnnotation } from '@babel/types';

import { convertFlowType } from './flow-type';

export function convertTypeAnnotation(node: TypeAnnotation): TSTypeAnnotation {
  return tsTypeAnnotation(convertFlowType(node.typeAnnotation));
}
