import { NodePath } from '@babel/core';
import {
  ClassDeclaration,
  isClassMethod,
  isTypeParameterDeclaration,
  isTypeParameterInstantiation,
} from '@babel/types';

import { ConverterState } from '../types';
import { replaceClassDecorators } from '../optimizers/decorators';
import { WARNINGS, logWarning } from '../util/warnings';
import { convertOptionalFunctionParameters } from './function';
import {
  convertTypeParameterInstantiation,
  convertTypeParameterDeclaration,
} from './type-parameter';

export function convertClassDeclaration(
  path: NodePath<ClassDeclaration>,
  state: ConverterState,
): NodePath<ClassDeclaration> {
  const { node } = path;
  const { body, superTypeParameters, typeParameters } = node;

  if (isTypeParameterInstantiation(superTypeParameters)) {
    node.superTypeParameters = convertTypeParameterInstantiation(superTypeParameters, state);
  }

  if (isTypeParameterDeclaration(typeParameters)) {
    node.typeParameters = convertTypeParameterDeclaration(typeParameters, state);
  }

  body.body.forEach(node => {
    if (isClassMethod(node)) {
      // Flow allows *optional* parameters to be initialized - TypeScript does not.
      node = convertOptionalFunctionParameters(node);

      // Flow allows to specify the return type of constructor functions. This is
      // forbidden in TypeScript. So the the type annotation needs to be removed.
      if (node.kind === 'constructor' && node.returnType) {
        logWarning(WARNINGS.class.constructorReturnType, state.file.code, node.loc);
        node.returnType = null;
      }
    }
  });

  if (state.opts.replaceDecorators) {
    path.replaceWith(replaceClassDecorators(path));
  }

  return path;
}
