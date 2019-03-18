
let sealedObject = {
  p1: "string",
  p2: 1,
  p3: null
};

let unsealedObject: {};

let object: {
  p4: string;
  p5: boolean
};

let nestedObject: {
  p6: string;
  p7: {
    p8: {
      p9: number;
    };
    p10: boolean;
  };
  p11: null
};

let optionalObject: {
  p12?: boolean;
  p13: string
};

let exactObjectType: {
  p14: number;
  p15: string
};

let exactObjectTypeWithOptionalProp: {
  p16: boolean;
  p17?: string;
  p18?: number
};

// let objectWithSpread: {
//   a?: string;
//   b?: "literal";
//   c?: boolean;
// };

// let objectWithSpreadOverwrite: {
//   a: string | number;
//   b?: "literal";
//   c: boolean;
// };

// let exactObjectWithSpread: {
//   a: number,
//   b: "literal",
// }

let objectIndexerPropertyString: {
  [key: string]: number
};

let objectIndexerPropertyNumber: {
  [key: number]: {}
};

let objectNamedIndexerPropertyString: {
  [id: string]: boolean
};

let objectNamedIndexerPropertyNumber: {
  [timestamp: number]: {}
};

function functionWithObjectParameter(obj: {}): void {}
