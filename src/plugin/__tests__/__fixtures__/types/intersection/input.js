// @flow
type T1 = {
  x: number;
};

type T2 = {
  y: ?string;
};

type T3 = {
  x: null;
  z: {
    prop: Date;
  };
};

let IntersectionVar: T1 & T2;
let IntersectionVarWithUnion: T1 & (T2 | T3);

type IntersectionWithItself = T1 & T1;
type IntersectionOfTypeAliases = T1 & T2;
type IntersectionWithOverlap = T1 & T2 & T3;
type IntersectionOfPrimitives = null & number;

type IntersectionObjectLiteral = {
  x: number;
} & {
  y: () => void;
};

type IntersectionWithFunctionType = null & () => number;

function functionWithIntersectionParameter(p: T1 & {
  x: null;
}) {
  return p;
}
