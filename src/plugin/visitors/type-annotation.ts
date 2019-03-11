import { VisitNodeFunction } from '@babel/traverse';
import { TypeAnnotation } from '@babel/types';

import { convertTypeAnnotation } from '../converters/type-annotation';

export const typeAnnotationVisitor: VisitNodeFunction<object, TypeAnnotation> = (path): void => {
  path.replaceWith(convertTypeAnnotation(path));
};
