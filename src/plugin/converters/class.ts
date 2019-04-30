import {
  ClassDeclaration,
  isClassMethod,
  isTypeParameterDeclaration,
  isTypeParameterInstantiation,
} from '@babel/types';
import {
  convertTypeParameterInstantiation,
  convertTypeParameterDeclaration,
} from './type-parameter';

export function convertClassDeclaration(node: ClassDeclaration): ClassDeclaration {
  const { body, superTypeParameters, typeParameters } = node;

  if (isTypeParameterInstantiation(superTypeParameters)) {
    node.superTypeParameters = convertTypeParameterInstantiation(superTypeParameters);
  }

  if (isTypeParameterDeclaration(typeParameters)) {
    node.typeParameters = convertTypeParameterDeclaration(typeParameters);
  }

  // Flow allows to specify the return type of constructor functions. This is
  // forbidden in TypeScript. So the the type annotation needs to be removed.
  body.body.forEach(elem => {
    if (isClassMethod(elem) && elem.kind === 'constructor') {
      elem.returnType = null;
    }
  });

  return node;
}
