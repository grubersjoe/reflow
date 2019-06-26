// @flow
type O = {
  p: string | null,
};

type ElementType = $ElementType<O, 'p'>;
type ElementTypeLiteral = $ElementType<{
  p: null,
}, 'p'>


type ElementTypeUseless = $ElementType<O, 'q'>;

