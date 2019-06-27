// @flow
type TElementTypeArray = Array<string | null>;
type TElementTypeTuple = [number, null];
type TElementTypeObject = {
  p: string | null,
};

type ElementTypeArray = $ElementType<TElementTypeArray, 3>;
type ElementTypeTuple = $ElementType<TElementTypeTuple, 1>;
type ElementTypeObject = $ElementType<TElementTypeObject, 'p'>;

type ElementTypeArrayLiteral = $ElementType<number[], 2>;
type ElementTypeTupleLiteral = $ElementType<[boolean], 0>;
type ElementTypeObjectLiteral = $ElementType<{
  p: null,
}, 'p'>
