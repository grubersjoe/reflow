import { FunctionDeclaration, isAssignmentPattern, isIdentifier } from '@babel/types';

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
