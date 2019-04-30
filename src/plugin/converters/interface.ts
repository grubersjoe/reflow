import {
  BaseNode,
  DeclareInterface,
  Identifier,
  InterfaceDeclaration,
  InterfaceExtends,
  InterfaceTypeAnnotation,
  TSExpressionWithTypeArguments,
  TSInterfaceDeclaration,
  TypeParameterDeclaration,
  tsExpressionWithTypeArguments,
  tsInterfaceBody,
  tsInterfaceDeclaration,
} from '@babel/types';

import { convertObjectTypeAnnotation } from './object';
import { convertIdentifier } from './identifier';
import {
  convertTypeParameterDeclaration,
  convertTypeParameterInstantiation,
} from './type-parameter';

export interface TypeAliasForInterfaceType extends BaseNode {
  type: 'TypeAlias';
  id: Identifier;
  typeParameters: TypeParameterDeclaration | null;
  right: InterfaceTypeAnnotation;
}

export function convertInterfaceExtends(node: InterfaceExtends): TSExpressionWithTypeArguments {
  const id = convertIdentifier(node.id);
  const typeParameters = convertTypeParameterInstantiation(node.typeParameters);

  return tsExpressionWithTypeArguments(id, typeParameters);
}

export function convertInterfaceDeclaration(
  node: InterfaceDeclaration | DeclareInterface,
): TSInterfaceDeclaration {
  const typeParameters = convertTypeParameterDeclaration(node.typeParameters);
  const body = tsInterfaceBody(convertObjectTypeAnnotation(node.body).members);

  const _extends =
    node.extends && node.extends.length
      ? node.extends.map(interfaceExtends => convertInterfaceExtends(interfaceExtends))
      : null;

  return tsInterfaceDeclaration(node.id, typeParameters, _extends, body);
}

export function convertInterfaceTypeAlias(node: TypeAliasForInterfaceType): TSInterfaceDeclaration {
  const { right: _interface } = node;

  const typeParameters = convertTypeParameterDeclaration(node.typeParameters);
  const body = tsInterfaceBody(convertObjectTypeAnnotation(_interface.body).members);

  const _extends =
    _interface.extends && _interface.extends.length
      ? _interface.extends.map(_extends => convertInterfaceExtends(_extends))
      : null;

  return tsInterfaceDeclaration(node.id, typeParameters, _extends, body);
}
