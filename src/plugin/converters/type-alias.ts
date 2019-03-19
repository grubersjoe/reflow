import { TSTypeAliasDeclaration, TypeAlias, tsTypeAliasDeclaration } from '@babel/types';

import { convertFlowType } from './flow-type';
import { convertTypeParameterDeclaration } from './type-parameter';

export function convertTypeAlias(node: TypeAlias): TSTypeAliasDeclaration {
  const typeAnnotation = convertFlowType(node.right);
  const typeParameters = node.typeParameters
    ? convertTypeParameterDeclaration(node.typeParameters)
    : null;

  return tsTypeAliasDeclaration(node.id, typeParameters, typeAnnotation);
}
