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

// let objectWithSpread: {
//   a: string,
//   ...{
//     b: boolean,
//     c: null,
//   }
// } = {};

// let objectWithSpreadOverwrite: {
//   a: string,
//   c: false,
//   ...{
//     a: number,
//     b: "bar",
//     c: true,
//   }
// };

// let exactObjectWithSpread: {|
//   a: string,
//   ...{|
//     a: number,
//     b: "literal",
//   |}
// |};

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

function functionWithObjectParameter(obj: {}): void {}
