
type TElementTypeArray = Array<string | null>;
type TElementTypeTuple = [number, null];
type TElementTypeObject = {
  p: string | null;
};

type ElementTypeArray = TElementTypeArray[3];
type ElementTypeTuple = TElementTypeTuple[1];
type ElementTypeObject = TElementTypeObject["p"];

type ElementTypeArrayLiteral = number[][2];
type ElementTypeTupleLiteral = [boolean][0];
type ElementTypeObjectLiteral = {
  p: null;
}["p"];
