
type EmptyObject = {};
type EmptyExactObject = {};

type SealedObject = {
  p1: "string";
  p2: 1;
  p3: null;
};

type ObjectSimple = {
  p4: string;
  p5: boolean;
};

type NestedObject = {
  p6: string;
  p7: {
    p8: {
      p9: number;
    };
    p10: boolean;
  };
  p11: null;
};

type OptionalObject = {
  p12?: boolean;
  p13: string;
};

type ExactObjectType = {
  p14: number;
  p15: string;
};

type ExactObjectTypeWithOptionalProp = {
  p16: boolean;
  p17?: string;
  p18?: number;
};

type ObjectWithStringLiteralKey = {
  "p19": number;
  p20: null;
  "p 21": boolean;
};

export type ComplexObject = {
  buttonIcon: string | null | undefined;
  readonly messageId: string;
  readonly placeholder: object;
  readonly callback: null | (() => void);
};

type ObjectWithSpread = {
  a: string;
  b: boolean;
  c: null;
};

type ObjectWithSpreadInBetween = {
  a: string;
  d: null;
  e: number;
  b: boolean;
  c: null;
};

type ObjectWithSpreadOverwrite = {
  a: string | number;
  c: false | true;
  b: "literal";
};

type ObjectWithSpreadOverwriteInBetween = {
  a: string | number;
  c: true | false;
  b: "literal";
};

type ObjectWithSpreadOverwriteAndStringLiteralKey = {
  "a": "foo" | "bar";
  "b": string | number;
  c: number | null;
};

type ExactObjectWithSpread = {
  a: number;
  c: string;
  d: boolean;
  b: "literal";
};

type ObjectIndexerProperty = {
  [key: string]: number;
};

type ObjectNamedIndexerProperty = {
  [id: number]: {};
};

type ReadOnlyObject = {
  readonly prop: unknown;
};

type WriteOnlyObject = {
  prop: () => void;
};

function functionWithObjectParameter(obj: {}): void {}
function functionWithObjectInitializer(p: any, obj = {}): void {}
