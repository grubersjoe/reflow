import { NodePath } from '@babel/traverse';
import {
  TypeParameterInstantiation,
  TSTypeParameterInstantiation,
  FlowType,
  tsTypeParameterInstantiation,
  TypeParameter,
  TSTypeParameter,
  tsTypeParameter,
  TypeParameterDeclaration,
  TSTypeParameterDeclaration,
  tsTypeParameterDeclaration,
} from '@babel/types';

import { convertFlowType } from './flow-type';

export function convertTypeParameter(path: NodePath<TypeParameter>): TSTypeParameter {
  const tsNode = tsTypeParameter();

  // if (path.node.bound) tsNode.constraint = convertFlowType(path.get('bound').get('typeAnnotation'));
  tsNode.name = path.node.name;

  return tsNode;
}

export function convertTypeParameterInstantiation(
  path: NodePath<TypeParameterInstantiation>,
): TSTypeParameterInstantiation {
  const params = path.node.params.map((_, i) =>
    convertFlowType(path.get(`params.${i}`) as NodePath<FlowType>),
  );

  return tsTypeParameterInstantiation(params);
}

export function convertTypeParameterDeclaration(
  path: NodePath<TypeParameterDeclaration>,
): TSTypeParameterDeclaration {
  const params = path.node.params.map((_, i) =>
    convertTypeParameter(path.get(`params.${i}`) as NodePath<TypeParameter>),
  );

  return tsTypeParameterDeclaration(params);
}
