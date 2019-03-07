import { VisitNodeFunction } from '@babel/traverse';
import { TypeAnnotation } from '@babel/types';

import { convertTypeAnnotation } from '../converters';

const typeAnnotationVisitor: VisitNodeFunction<object, TypeAnnotation> = (path): void => {
  path.replaceWith(convertTypeAnnotation(path));
};

// export function TypeAlias(path: NodePath<TypeAlias>): void {
//   path.replaceWith(convertTypeAlias(path))
// }

export { typeAnnotationVisitor };
