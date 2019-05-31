import {
  ArrowFunctionExpression,
  FunctionDeclaration,
  FunctionExpression,
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

import { ConverterState } from '../types';
import { convertFlowType } from './flow-type';
import { convertTypeParameterDeclaration } from './type-parameter';
import { convertTypeAnnotation } from './type-annotation';

export function functionTypeParamToIdentifier(
  param: FunctionTypeParam,
  fallbackName: string,
  state: ConverterState,
): Identifier {
  // In contrast to TypeScript, parameter names in function types are optional
  // in Flow.
  const id = identifier(isIdentifier(param.name) ? param.name.name : fallbackName);

  id.optional = param.optional;
  id.typeAnnotation = convertTypeAnnotation(param, state);

  return id;
}

export function functionTypeParametersToIdentifiers(
  params: FunctionTypeParam[] | null,
  state: ConverterState,
): Identifier[] | null {
  if (params === null) {
    return null;
  }

  return params.map((param, i) => {
    return functionTypeParamToIdentifier(param, params.length > 1 ? `p${i + 1}` : `p`, state);
  });
}

export function convertFunctionTypeRestParam(
  param: FunctionTypeParam,
  state: ConverterState,
): RestElement {
  const id = identifier(isIdentifier(param.name) ? param.name.name : 'rest');
  const restElem = restElement(id);

  restElem.typeAnnotation = convertTypeAnnotation(param, state);

  return restElem;
}

export function convertFunctionTypeAnnotation(
  node: FunctionTypeAnnotation,
  state: ConverterState,
): TSFunctionType {
  const typeParameters = convertTypeParameterDeclaration(node.typeParameters, state);
  const functionParameters = functionTypeParametersToIdentifiers(node.params, state) || [];
  const restParameters = node.rest ? [convertFunctionTypeRestParam(node.rest, state)] : [];
  const returnType = tsTypeAnnotation(convertFlowType(node.returnType, state));

  return tsFunctionType(typeParameters, [...functionParameters, ...restParameters], returnType);
}

// Flow allows *optional* parameters to be initialized - TypeScript does not.
export function convertOptionalFunctionParameters<
  Fn extends ArrowFunctionExpression | FunctionDeclaration | FunctionExpression
>(node: Fn): Fn {
  node.params = node.params.map(param => {
    if (isAssignmentPattern(param) && isIdentifier(param.left) && param.left.optional) {
      param.left.optional = false;
    }

    return param;
  });

  return node;
}
