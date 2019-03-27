import {
  FunctionDeclaration,
  FunctionTypeAnnotation,
  FunctionTypeParam,
  Identifier,
  RestElement,
  TSFunctionType,
  identifier,
  isAssignmentPattern,
  isIdentifier,
  restElement,
  tsFunctionType,
  tsTypeAnnotation,
} from '@babel/types';

import { convertFlowType } from './flow-type';
import { convertTypeParameterDeclaration } from './type-parameter';
import { convertTypeAnnotation } from './type-annotation';

export function convertFunctionTypeParam(
  param: FunctionTypeParam,
  defaultName: string,
): Identifier {
  // The parameter might not have a name (param.name === null). This is possible, because Flow does
  // not require parameter names in function types - TypeScript does, however.
  const id = identifier(isIdentifier(param.name) ? param.name.name : defaultName);

  id.optional = param.optional;
  id.typeAnnotation = convertTypeAnnotation(param);

  return id;
}

export function convertFunctionTypeRestParam(param: FunctionTypeParam): RestElement {
  const id = identifier(isIdentifier(param.name) ? param.name.name : 'rest');
  const restElem = restElement(id);

  restElem.typeAnnotation = convertTypeAnnotation(param);

  return restElem;
}

export function convertFunctionTypeAnnotation(node: FunctionTypeAnnotation): TSFunctionType {
  const typeParameters = convertTypeParameterDeclaration(node.typeParameters);

  let functionParameters: (Identifier | RestElement)[] = node.params
    ? node.params.map((param, i) => convertFunctionTypeParam(param, `p${i + 1}`))
    : [];

  if (node.rest) {
    functionParameters = functionParameters.concat(convertFunctionTypeRestParam(node.rest));
  }

  const returnType = tsTypeAnnotation(convertFlowType(node.returnType));

  return tsFunctionType(typeParameters, functionParameters, returnType);
}

/**
 * Flow allows optional parameters with an initializer - TypeScript does not!
 * (x: string, y: ?number = 1) ... => (x: string, y: number = 1) ...
 */
export function convertFunctionDeclaration(node: FunctionDeclaration): FunctionDeclaration {
  node.params = node.params.map(param => {
    if (isAssignmentPattern(param) && isIdentifier(param.left) && param.left.optional) {
      param.left.optional = false;
    }
    return param;
  });

  return node;
}
