
type Numbers = 1 | 2 | 3;
type Sizes = "S" | "M" | "L" | "XL";

type SuccessPayload = {
  success: true;
  value: boolean;
}
type ErrorPayload = {
  success: false;
  error?: string
}
type TypeAliasUnion = SuccessPayload | ErrorPayload;

function functionWithUnionParam(p: string | number) {}
function functionWithUnionParamAndReturn(p: boolean | null): boolean {
  return Boolean(p);
}
function functionWithUnionReturnType(p1: {}, p2: string): string | boolean {
  return "string";
}
