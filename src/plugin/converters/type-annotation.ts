import { NodePath } from '@babel/traverse';
import { TypeAnnotation, TSTypeAnnotation, tsTypeAnnotation } from '@babel/types';

import { convertFlowType } from '.';

export function convertTypeAnnotation(path: NodePath<TypeAnnotation>): TSTypeAnnotation {
  return tsTypeAnnotation(convertFlowType(path.get('typeAnnotation')));
}
