import {
  ClassDeclaration,
  isTypeParameterInstantiation,
  isTypeParameterDeclaration,
} from '@babel/types';
import {
  convertTypeParameterInstantiation,
  convertTypeParameterDeclaration,
} from './type-parameter';

export function convertClassDeclaration(node: ClassDeclaration): ClassDeclaration {
  const { superTypeParameters, typeParameters } = node;

  if (isTypeParameterInstantiation(superTypeParameters)) {
    node.superTypeParameters = convertTypeParameterInstantiation(superTypeParameters);
  }

  if (isTypeParameterDeclaration(typeParameters)) {
    node.typeParameters = convertTypeParameterDeclaration(typeParameters);
  }

  return node;
}
