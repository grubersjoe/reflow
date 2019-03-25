import { OpaqueType, TSTypeAliasDeclaration, tsTypeAliasDeclaration } from '@babel/types';

import { convertFlowType } from './flow-type';
import { convertTypeParameterDeclaration } from './type-parameter';

export function convertOpaqueType(node: OpaqueType): TSTypeAliasDeclaration {
  const typeParameters = node.typeParameters
    ? convertTypeParameterDeclaration(node.typeParameters)
    : null;

  return tsTypeAliasDeclaration(node.id, typeParameters, convertFlowType(node.impltype));
}
