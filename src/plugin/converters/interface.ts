import { PluginPass } from '@babel/core';
import {
  DeclareInterface,
  InterfaceDeclaration,
  InterfaceExtends,
  InterfaceTypeAnnotation,
  TSExpressionWithTypeArguments,
  TSInterfaceDeclaration,
  TSTypeLiteral,
  TypeAlias,
  tsExpressionWithTypeArguments,
  tsInterfaceBody,
  tsInterfaceDeclaration,
} from '@babel/types';

import { convertIdentifier } from './identifier';
import { convertObjectTypeAnnotation } from './object';
import {
  convertTypeParameterDeclaration,
  convertTypeParameterInstantiation,
} from './type-parameter';

export interface TypeAliasForInterfaceType extends TypeAlias {
  right: InterfaceTypeAnnotation;
}

export function convertInterfaceExtends(
  node: InterfaceExtends,
  state: PluginPass,
): TSExpressionWithTypeArguments {
  const id = convertIdentifier(node.id);
  const typeParameters = convertTypeParameterInstantiation(
    node.typeParameters,
    state,
  );

  return tsExpressionWithTypeArguments(id, typeParameters);
}

export function convertInterfaceDeclaration(
  node: InterfaceDeclaration | DeclareInterface,
  state: PluginPass,
): TSInterfaceDeclaration {
  const typeParameters = convertTypeParameterDeclaration(
    node.typeParameters,
    state,
  );
  const body = tsInterfaceBody(
    convertObjectTypeAnnotation(node.body, state).members,
  );

  const _extends =
    node.extends && node.extends.length
      ? node.extends.map(interfaceExtends =>
          convertInterfaceExtends(interfaceExtends, state),
        )
      : null;

  return tsInterfaceDeclaration(node.id, typeParameters, _extends, body);
}

export function convertInterfaceTypeAlias(
  node: TypeAliasForInterfaceType,
  state: PluginPass,
): TSInterfaceDeclaration {
  const { right: _interface } = node;

  const typeParameters = convertTypeParameterDeclaration(
    node.typeParameters,
    state,
  );
  const body = tsInterfaceBody(
    convertObjectTypeAnnotation(_interface.body, state).members,
  );

  const _extends =
    _interface.extends && _interface.extends.length
      ? _interface.extends.map(_extends =>
          convertInterfaceExtends(_extends, state),
        )
      : null;

  return tsInterfaceDeclaration(node.id, typeParameters, _extends, body);
}

export function convertInterfaceTypeAnnotation(
  node: InterfaceTypeAnnotation,
  state: PluginPass,
): TSTypeLiteral {
  return convertObjectTypeAnnotation(node.body, state);
}
