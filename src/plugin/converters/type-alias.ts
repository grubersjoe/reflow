import { PluginPass } from '@babel/core';
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
import {
  TypeAliasForInterfaceType,
  convertInterfaceTypeAlias,
} from './interface';
import { convertTypeParameterDeclaration } from './type-parameter';

export function convertTypeAlias(
  node: TypeAlias,
  path: NodePath<Flow>,
  state: PluginPass,
): TSTypeAliasDeclaration | TSInterfaceDeclaration {
  const typeParameters = convertTypeParameterDeclaration(
    node.typeParameters,
    state,
  );
  const typeAnnotation = convertFlowType(node.right, state, path);

  // A type alias for an interface type is not allowed in TypeScript. Replace
  // the type alias with an equivalent interface declaration in this case.
  if (isInterfaceTypeAnnotation(node.right)) {
    return convertInterfaceTypeAlias(node as TypeAliasForInterfaceType, state);
  }

  return tsTypeAliasDeclaration(node.id, typeParameters, typeAnnotation);
}
