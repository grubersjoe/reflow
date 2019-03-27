import {
  TSInterfaceDeclaration,
  TSTypeAliasDeclaration,
  TypeAlias,
  tsTypeAliasDeclaration,
  isInterfaceTypeAnnotation,
} from '@babel/types';

import { convertFlowType } from './flow-type';
import { convertInterfaceTypeAlias, TypeAliasForInterfaceType } from './interface';
import { convertTypeParameterDeclaration } from './type-parameter';

export function convertTypeAlias(node: TypeAlias): TSTypeAliasDeclaration | TSInterfaceDeclaration {
  const typeParameters = convertTypeParameterDeclaration(node.typeParameters);
  const typeAnnotation = convertFlowType(node.right);

  // A type alias for an interface type is not allowed in TypeScript.
  // Replace the type alias with an equivalent interface declaration in this case.
  if (isInterfaceTypeAnnotation(node.right)) {
    return convertInterfaceTypeAlias(node as TypeAliasForInterfaceType);
  }

  return tsTypeAliasDeclaration(node.id, typeParameters, typeAnnotation);
}
