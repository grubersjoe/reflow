import { VisitNodeFunction } from '@babel/traverse';
import t from '@babel/types';
import { convertTypeAnnotation } from '../converters';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TypeAnnotation: VisitNodeFunction<any, t.TypeAnnotation> = (path): void => {
  path.replaceWith(convertTypeAnnotation(path));
};

export { TypeAnnotation };

// export function TypeAlias(path: NodePath<TypeAlias>): void {
//   path.replaceWith(convertTypeAlias(path))
// }
