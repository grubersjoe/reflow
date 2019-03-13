// @flow
let sealedObject = {
  a: 'string',
  b: 1,
  c: null,
};

let unsealedObject: {};

let object: {
  a: string,
  b: boolean,
} = {};

let nestedObject: {
  a: string,
  b: {
    a: {
      a: number,
    },
    b: boolean,
  },
  c: null,
};

let optionalObject: {
  a?: boolean,
  b: string,
} = {};

let exactObjectType: {|
  a: number,
  b: string
|} = {
  a: 3,
  b: 'string',
};

let exactObjectTypeWithOptional: {|
  a: boolean,
  b?: string,
|} = {
  a: true,
}

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
//     b: 'bar',
//     c: true,
//   }
// };

// let exactObjectWithSpread: {|
//   a: string,
//   ...{|
//     a: number,
//     b: 'literal',
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

function functionWithObjectParameter(obj: {}) {}
