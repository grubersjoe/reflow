import { NodePath } from '@babel/core';
import {
  ClassDeclaration,
  isClassMethod,
  isTypeParameterDeclaration,
  isTypeParameterInstantiation,
} from '@babel/types';

import { PluginPass } from '../types';
import { PluginWarnings, WARNINGS } from '../util/warning';
import {
  convertTypeParameterInstantiation,
  convertTypeParameterDeclaration,
} from './type-parameter';
import { replaceClassDecorators } from '../refactoring/replace-decorators';
import { BaseVisitorNodes } from '../visitors/base';

export function convertClassDeclaration(
  path: NodePath<ClassDeclaration>,
  state: PluginPass<BaseVisitorNodes>,
): NodePath<ClassDeclaration> {
  const { node } = path;
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
    if (isClassMethod(elem) && elem.kind === 'constructor' && elem.returnType) {
      PluginWarnings.enable(WARNINGS.class.constructorReturnType);
      elem.returnType = null;
    }
  });

  if (state.opts.replaceDecorators) {
    path.replaceWith(replaceClassDecorators(path));
  }

  return path;
}
