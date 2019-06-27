// @flow
interface IShape {
  p: number,
}

type TShape = {
  q: null,
};

type ShapeInterface = $Shape<IShape>;
type ShapeType = $Shape<TShape>;

type ShapeLiteral = $Shape<{
  p: number,
}>;
