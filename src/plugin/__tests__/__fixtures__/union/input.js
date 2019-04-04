// @flow
type NumberUnion = 1 | 2 | 3;
type StringUnion = "S" | "M" | "L" | "XL";

type AliasT1 = {
  success: true,
  value: boolean,
};
type AliasT2 = {
  success: false,
  error?: string,
};
type TypeAliasUnion = AliasT1 | AliasT2;

function functionWithUnionParam(p: string | number) {}
function functionWithUnionParamAndReturn(p: boolean | null): boolean {
  return Boolean(p);
}
function functionWithUnionReturnType(p1: {}, p2: string): string | boolean {
  return "string";
}

type UnionFunctionType = (() => null) | ((x: number) => void);
