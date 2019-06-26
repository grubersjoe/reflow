
type O = {
  p: string | null;
};

type ElementType = O["p"];
type ElementTypeLiteral = {
  p: null;
}["p"];

// @ts-ignore
type ElementTypeUseless = O["q"];
