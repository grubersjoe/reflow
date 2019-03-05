import { NodePath } from '@babel/traverse';
import types from '@babel/types';
import { convertTypeAnnotation } from '../converters';

export function TypeAnnotation(path: NodePath<types.TypeAnnotation>): void {
  path.replaceWith(convertTypeAnnotation(path));
}

// export function TypeAlias(path: NodePath<TypeAlias>): void {
//   path.replaceWith(convertTypeAlias(path))
// }
