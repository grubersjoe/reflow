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

import { convertFlowType } from './flow-type';
import { convertTypeParameterDeclaration } from './type-parameter';
import { convertTypeAnnotation } from './type-annotation';

export function functionTypeParamToIdentifier(
  param: FunctionTypeParam,
  fallbackName: string,
): Identifier {
  // In contrast to TypeScript, parameter names in function types are optional
  // in Flow.
  const id = identifier(isIdentifier(param.name) ? param.name.name : fallbackName);

  id.optional = param.optional;
  id.typeAnnotation = convertTypeAnnotation(param);

  return id;
}

export function functionTypeParametersToIdentifiers(
  params: FunctionTypeParam[] | null,
): Identifier[] | null {
  if (params === null) {
    return null;
  }

  return params.map((param, i) => {
    return functionTypeParamToIdentifier(param, params.length > 1 ? `p${i + 1}` : `p`);
  });
}

export function convertFunctionTypeRestParam(param: FunctionTypeParam): RestElement {
  const id = identifier(isIdentifier(param.name) ? param.name.name : 'rest');
  const restElem = restElement(id);

  restElem.typeAnnotation = convertTypeAnnotation(param);

  return restElem;
}

export function convertFunctionTypeAnnotation(node: FunctionTypeAnnotation): TSFunctionType {
  const typeParameters = convertTypeParameterDeclaration(node.typeParameters);
  const functionParameters = functionTypeParametersToIdentifiers(node.params) || [];
  const restParameters = node.rest ? [convertFunctionTypeRestParam(node.rest)] : [];
  const returnType = tsTypeAnnotation(convertFlowType(node.returnType));

  return tsFunctionType(typeParameters, [...functionParameters, ...restParameters], returnType);
}

// Flow allows *optional* parameters to be initialized - TypeScript does not.
export function convertOptionalFunctionParameters<
  F extends FunctionDeclaration | FunctionExpression | ArrowFunctionExpression
>(node: F): F {
  node.params = node.params.map(param => {
    if (isAssignmentPattern(param) && isIdentifier(param.left) && param.left.optional) {
      param.left.optional = false;
    }

    return param;
  });

  return node;
}
