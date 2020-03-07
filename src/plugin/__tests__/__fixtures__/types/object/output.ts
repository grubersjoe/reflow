
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
  p22: string | null | undefined;
  readonly p23: string;
  readonly p24: {};
  readonly p25: null | (() => void);
};

type ObjectIndexerProperty = {
  [key: string]: number;
};

type ObjectIndexerPropertyWithName = {
  [key: string]: number;
};

type ObjectIndexerPropertyWithUnsupportedKeyType = {
  [key: number]: boolean;
  [key: string]: boolean;
};

type ObjectIndexerPropertyWithNamedUnsupportedKeyType = {
  [k: number]: boolean;
  [k: string]: boolean;
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
