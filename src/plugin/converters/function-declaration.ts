import { FunctionDeclaration, isAssignmentPattern, isIdentifier } from '@babel/types';

export function convertFunctionDeclaration(node: FunctionDeclaration): FunctionDeclaration {
  node.params = node.params.map(param => {
    // Flow allows optional parameters with an initializer - TypeScript does not
    if (isAssignmentPattern(param) && isIdentifier(param.left) && param.left.optional) {
      param.left.optional = false;
    }
    return param;
  });

  return node;
}
