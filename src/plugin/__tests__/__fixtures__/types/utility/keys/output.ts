
type TKeys = {
  p: string;
};

type KeysType = keyof TKeys;
type KeysLiteralType = keyof {
  p: string;
};
type ArrayKeys = Array<keyof TKeys>;
type ArrayKeysLiteral = Array<keyof {
  n: number;
}>;
