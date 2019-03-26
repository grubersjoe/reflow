// @flow
type SealedObject = {
  p1: "string",
  p2: 1,
  p3: null,
};

type UnsealedObject = {};

type ObjectSimple = {
  p4: string,
  p5: boolean,
};

type NestedObject = {
  p6: string,
  p7: {
    p8: {
      p9: number,
    },
    p10: boolean,
  },
  p11: null,
};

type OptionalObject = {
  p12?: boolean,
  p13: string,
};

type ExactObjectType = {|
  p14: number,
  p15: string
|};

type ExactObjectTypeWithOptionalProp = {|
  p16: boolean,
  p17?: string,
  p18?: number,
|};

type ObjectWithStringLiteralKey = {
  "p19": number,
  p20: null,
  "p 21": boolean,
};

type ObjectWithSpread = {
  a: string,
  ...{
    b: boolean,
    c: null,
  }
};

type ObjectWithSpreadInBetween = {
  a: string,
  ...{
    b: boolean,
    c: null,
  },
  d: null,
  e: number,
};

type ObjectWithSpreadOverwrite = {
  a: string,
  c: false,
  ...{
    a: number,
    b: "literal",
    c: true,
  }
};

type ObjectWithSpreadOverwriteInBetween = {
  a: string,
  ...{
    a: number,
    b: "literal",
    c: false,
  },
  c: true,
};

type ObjectWithSpreadOverwriteAndStringLiteralKey = {
  a: "foo",
  "b": string,
  "c": number,
  ...{
    "a": "bar",
    c: null,
    "b": number,
  }
};

type ExactObjectWithSpread = {|
  a: string,
  c: number,
  d: boolean,
  ...{|
    a: number,
    b: "literal",
    c: string,
  |}
|};

type ObjectIndexerProperty = {
  [string]: number,
};

type ObjectNamedIndexerProperty = {
  [id: number]: {},
};

type ReadOnlyObject = {
  +prop: mixed,
};

type WriteOnlyObject = {
  -prop: () => void,
};

function functionWithObjectParameter(obj: {}): void {}
function functionWithObjectInitializer(p: any, obj = {}): void {}
