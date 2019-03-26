import {
  InterfaceDeclaration,
  InterfaceExtends,
  TSExpressionWithTypeArguments,
  TSInterfaceDeclaration,
  isIdentifier,
  tsExpressionWithTypeArguments,
  tsInterfaceBody,
  tsInterfaceDeclaration,
} from '@babel/types';

import { convertObjectTypeAnnotation } from './object-type-annotation';
import { convertQualifiedTypeIdentifier } from './qualified-type-identifier';
import {
  convertTypeParameterDeclaration,
  convertTypeParameterInstantiation,
} from './type-parameter';

export function convertInterfaceExtends(node: InterfaceExtends): TSExpressionWithTypeArguments {
  const id = isIdentifier(node.id) ? node.id : convertQualifiedTypeIdentifier(node.id);

  const typeParameters = node.typeParameters
    ? convertTypeParameterInstantiation(node.typeParameters)
    : null;

  return tsExpressionWithTypeArguments(id, typeParameters);
}

export function convertInterfaceDeclaration(node: InterfaceDeclaration): TSInterfaceDeclaration {
  const typeParameters = node.typeParameters
    ? convertTypeParameterDeclaration(node.typeParameters)
    : null;

  const _extends =
    node.extends && node.extends.length
      ? node.extends.map(interfaceExtends => convertInterfaceExtends(interfaceExtends))
      : null;

  const body = tsInterfaceBody(convertObjectTypeAnnotation(node.body).members);

  return tsInterfaceDeclaration(node.id, typeParameters, _extends, body);
}
