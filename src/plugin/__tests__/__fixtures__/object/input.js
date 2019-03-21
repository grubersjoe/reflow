// @flow
let sealedObject = {
  p1: "string",
  p2: 1,
  p3: null,
};

let unsealedObject: {};

let object: {
  p4: string,
  p5: boolean,
};

let nestedObject: {
  p6: string,
  p7: {
    p8: {
      p9: number,
    },
    p10: boolean,
  },
  p11: null,
};

let optionalObject: {
  p12?: boolean,
  p13: string,
};

let exactObjectType: {|
  p14: number,
  p15: string
|};

let exactObjectTypeWithOptionalProp: {|
  p16: boolean,
  p17?: string,
  p18?: number,
|};

let objectWithStringLiteralKey: {
  "p19": number,
  p20: null,
  "p 21": boolean,
}

let objectWithSpread: {
  a: string,
  ...{
    b: boolean,
    c: null,
  }
};

let objectWithSpreadInBetween: {
  a: string,
  ...{
    b: boolean,
    c: null,
  },
  d: null,
  e: number,
};

let objectWithSpreadOverwrite: {
  a: string,
  c: false,
  ...{
    a: number,
    b: "literal",
    c: true,
  }
};

let objectWithSpreadOverwriteInBetween: {
  a: string,
  ...{
    a: number,
    b: "literal",
    c: false,
  },
  c: true,
};

let objectWithSpreadOverwriteAndStringLiteralKey: {
  a: "foo",
  "b": string,
  "c": number,
  ...{
    "a": "bar",
    c: null,
    "b": number,
  }
};

let exactObjectWithSpread: {|
  a: string,
  c: number,
  d: boolean,
  ...{|
    a: number,
    b: "literal",
    c: string,
  |}
|};

let objectIndexerPropertyString: {
  [string]: number,
};

let objectIndexerPropertyNumber: {
  [number]: {}
};

let objectNamedIndexerPropertyString: {
  [id: string]: boolean,
};

let objectNamedIndexerPropertyNumber: {
  [timestamp: number]: {}
};

type ReadOnlyObject = {
  +prop: any,
};

type WriteOnlyObject = {
  -prop: any,
};

function functionWithObjectParameter(obj: {}): void {}
