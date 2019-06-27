// @flow
type TElementType = {
  p: string | null,
};

type ElementType = $ElementType<TElementType, 'p'>;
type ElementTypeLiteral = $ElementType<{
  p: null,
}, 'p'>


type ElementTypeUseless = $ElementType<TElementType, 'q'>;

