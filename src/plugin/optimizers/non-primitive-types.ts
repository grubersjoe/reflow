/**
 * The non-primitive types Boolean, Number, Object and String should not be
 * used, but their primitive counterpart (or `object`):
 *
 * https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html
 */
export function replaceNonPrimitiveType(type: string): string {
  switch (type) {
    case 'Boolean':
    case 'Number':
    case 'Object':
    case 'String':
      return type.toLowerCase();
    default:
      return type;
  }
}
