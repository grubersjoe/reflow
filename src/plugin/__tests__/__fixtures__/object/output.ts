
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

let objectWithStringLiteralKey: {
  "p19": number;
  p20: null;
  "p 21": boolean
}

let objectWithSpread: {
  a: string;
  b: boolean;
  c: null;
};

let objectWithSpreadInBetween: {
  a: string;
  d: null;
  e: number;
  b: boolean;
  c: null
};

let objectWithSpreadOverwrite: {
  a: string | number;
  c: false | true;
  b: "literal"
};

let objectWithSpreadOverwriteInBetween: {
  a: string | number;
  c: true | false;
  b: "literal";
};

let objectWithSpreadOverwriteAndStringLiteralKey: {
  "a": "foo" | "bar";
  "b": string | number;
  c: number | null
};

let exactObjectWithSpread: {
  a: number;
  c: string;
  d: boolean
  b: "literal"
}

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

type ReadOnlyObject = {
  readonly prop: any;
};

type WriteOnlyObject = {
  prop: any;
};

function functionWithObjectParameter(obj: {}): void {}
