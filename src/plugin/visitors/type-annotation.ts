import { VisitNodeFunction } from '@babel/traverse';
import { Flow, TypeAnnotation } from '@babel/types';

const visitor: VisitNodeFunction<Flow, TypeAnnotation> = (path): void => {
  path.replaceWith(path);
};

export default visitor;
