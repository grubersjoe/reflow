import {
  Flow,
  TSInterfaceDeclaration,
  TSTypeAliasDeclaration,
  TypeAlias,
  isInterfaceTypeAnnotation,
  tsTypeAliasDeclaration,
} from '@babel/types';
import { NodePath } from '@babel/traverse';

import { convertFlowType } from './flow-type';
import { convertInterfaceTypeAlias, TypeAliasForInterfaceType } from './interface';
import { convertTypeParameterDeclaration } from './type-parameter';

export function convertTypeAlias(
  node: TypeAlias,
  path?: NodePath<Flow>,
): TSTypeAliasDeclaration | TSInterfaceDeclaration {
  const typeParameters = convertTypeParameterDeclaration(node.typeParameters);
  const typeAnnotation = convertFlowType(node.right, path);

  // A type alias for an interface type is not allowed in TypeScript.
  // Replace the type alias with an equivalent interface declaration in this case.
  if (isInterfaceTypeAnnotation(node.right)) {
    return convertInterfaceTypeAlias(node as TypeAliasForInterfaceType);
  }

  return tsTypeAliasDeclaration(node.id, typeParameters, typeAnnotation);
}
