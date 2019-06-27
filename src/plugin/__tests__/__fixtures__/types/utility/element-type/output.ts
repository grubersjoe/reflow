
type TElementType = {
  p: string | null;
};

type ElementType = TElementType["p"];
type ElementTypeLiteral = {
  p: null;
}["p"];

// @ts-ignore
type ElementTypeUseless = TElementType["q"];
