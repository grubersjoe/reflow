// @flow
type TKeys = number;

type KeysType = $Keys<TKeys>;
type KeysLiteralType = $Keys<{
  p: string,
}>;
