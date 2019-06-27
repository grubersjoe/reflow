
interface IShape {
  p: number;
}

type TShape = {
  q: null;
};

type ShapeInterface = Partial<IShape>;
type ShapeType = Partial<TShape>;

type ShapeLiteral = Partial<{
  p: number;
}>;
