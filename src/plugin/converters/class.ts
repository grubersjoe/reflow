import { NodePath } from '@babel/core';
import {
  ClassDeclaration,
  isClassMethod,
  isTypeParameterDeclaration,
  isTypeParameterInstantiation,
} from '@babel/types';

import { PluginPass } from '../types';
import { replaceClassDecorators } from '../optimizers/decorators';
import { WARNINGS, logWarning } from '../util/warnings';
import { BaseNode } from '../visitors/base';
import {
  convertTypeParameterInstantiation,
  convertTypeParameterDeclaration,
} from './type-parameter';

export function convertClassDeclaration(
  path: NodePath<ClassDeclaration>,
  state: PluginPass<BaseNode>,
): NodePath<ClassDeclaration> {
  const { node } = path;
  const { body, superTypeParameters, typeParameters } = node;

  if (isTypeParameterInstantiation(superTypeParameters)) {
    node.superTypeParameters = convertTypeParameterInstantiation(superTypeParameters, state);
  }

  if (isTypeParameterDeclaration(typeParameters)) {
    node.typeParameters = convertTypeParameterDeclaration(typeParameters, state);
  }

  // Flow allows to specify the return type of constructor functions. This is
  // forbidden in TypeScript. So the the type annotation needs to be removed.
  body.body.forEach(elem => {
    if (isClassMethod(elem) && elem.kind === 'constructor' && elem.returnType) {
      logWarning(WARNINGS.class.constructorReturnType, state.file.code, node.loc);
      elem.returnType = null;
    }
  });

  if (state.opts.replaceDecorators) {
    path.replaceWith(replaceClassDecorators(path));
  }

  return path;
}
