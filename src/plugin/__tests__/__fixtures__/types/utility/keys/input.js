// @flow
type TKeys = {
  p: string;
};

type KeysType = $Keys<TKeys>;
type KeysLiteralType = $Keys<{
  p: string,
}>;
type ArrayKeys = Array<$Keys<TKeys>>;
type ArrayKeysLiteral = Array<$Keys<{
  n: number;
}>>;
