import { VisitNodeFunction } from '@babel/traverse';
import { Flow, NullableTypeAnnotation } from '@babel/types';

const MyVisitor: VisitNodeFunction<Flow, NullableTypeAnnotation> = (path): void => {
  path.replaceWith(path);
};

export default MyVisitor;
