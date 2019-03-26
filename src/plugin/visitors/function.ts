import { VisitNodeFunction } from '@babel/traverse';
import { FunctionDeclaration } from '@babel/types';

import { convertFunctionDeclaration } from '../converters/function-declaration';

export const functionDeclarationVisitor: VisitNodeFunction<object, FunctionDeclaration> = (
  path,
): void => {
  path.replaceWith(convertFunctionDeclaration(path.node));
};
