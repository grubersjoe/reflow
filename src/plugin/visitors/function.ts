import { FunctionDeclaration } from '@babel/types';

import { VisitorFunction } from '../types';
import { convertFunctionDeclaration } from '../converters/function';

export const functionDeclarationVisitor: VisitorFunction<FunctionDeclaration> = (path): void => {
  path.replaceWith(convertFunctionDeclaration(path.node));
};
