import {
  BaseNode,
  DeclareInterface,
  Identifier,
  InterfaceDeclaration,
  InterfaceExtends,
  InterfaceTypeAnnotation,
  TSExpressionWithTypeArguments,
  TSInterfaceDeclaration,
  TSTypeLiteral,
  TypeParameterDeclaration,
  tsExpressionWithTypeArguments,
  tsInterfaceBody,
  tsInterfaceDeclaration,
} from '@babel/types';

import { ConverterState } from '../types';
import { convertIdentifier } from './identifier';
import { convertObjectTypeAnnotation } from './object';
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

export function convertInterfaceExtends(
  node: InterfaceExtends,
  state: ConverterState,
): TSExpressionWithTypeArguments {
  const id = convertIdentifier(node.id);
  const typeParameters = convertTypeParameterInstantiation(node.typeParameters, state);

  return tsExpressionWithTypeArguments(id, typeParameters);
}

export function convertInterfaceDeclaration(
  node: InterfaceDeclaration | DeclareInterface,
  state: ConverterState,
): TSInterfaceDeclaration {
  const typeParameters = convertTypeParameterDeclaration(node.typeParameters, state);
  const body = tsInterfaceBody(convertObjectTypeAnnotation(node.body, state).members);

  const _extends =
    node.extends && node.extends.length
      ? node.extends.map(interfaceExtends => convertInterfaceExtends(interfaceExtends, state))
      : null;

  return tsInterfaceDeclaration(node.id, typeParameters, _extends, body);
}

export function convertInterfaceTypeAlias(
  node: TypeAliasForInterfaceType,
  state: ConverterState,
): TSInterfaceDeclaration {
  const { right: _interface } = node;

  const typeParameters = convertTypeParameterDeclaration(node.typeParameters, state);
  const body = tsInterfaceBody(convertObjectTypeAnnotation(_interface.body, state).members);

  const _extends =
    _interface.extends && _interface.extends.length
      ? _interface.extends.map(_extends => convertInterfaceExtends(_extends, state))
      : null;

  return tsInterfaceDeclaration(node.id, typeParameters, _extends, body);
}

export function convertInterfaceTypeAnnotation(
  node: InterfaceTypeAnnotation,
  state: ConverterState,
): TSTypeLiteral {
  return convertObjectTypeAnnotation(node.body, state);
}
