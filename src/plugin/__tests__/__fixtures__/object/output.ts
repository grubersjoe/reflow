
let sealedObject = {
  a: 'string',
  b: 1,
  c: null
};

let unsealedObject: {};

let object: {
  a?: string;
  b?: boolean;
} = {};

let nestedObject: {
  a?: string;
  b?: {
    a?: {
      a?: number;
    };
    b?: boolean;
  };
  c?: null;
};

let optionalObject: {
  a?: boolean;
  b?: string;
};

let exactObjectType: {
  a: number;
  b: string;
} = {
  a: 3,
  b: 'string'
};

let exactObjectTypeWithOptional: {
  a: boolean;
  b?: string;
} = {
  a: true
}

// let objectWithSpread: {
//   a?: string;
//   b?: 'literal';
//   c?: boolean;
// };

// let objectWithSpreadOverwrite: {
//   a: string | number;
//   b?: 'literal';
//   c: boolean;
// };

// let exactObjectWithSpread: {
//   a: number,
//   b: 'literal',
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

function functionWithObjectParameter(obj: {}) {}
