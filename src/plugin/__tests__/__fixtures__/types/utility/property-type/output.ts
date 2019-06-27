
type TPropertyType = {
  p: Date;
};

type PropertyType = TPropertyType["p"];
type PropertyTypeLiteral = {
  p: null;
}["p"];

// @ts-ignore
type PropertyTypeNonExisting = TPropertyType["q"];
