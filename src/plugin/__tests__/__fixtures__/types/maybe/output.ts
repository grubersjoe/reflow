
type MaybeAny = any | null | undefined;
type MaybeAnyArray = any[] | null | undefined;

type MaybeBoolean = boolean | null | undefined;
type MaybeBooleanArray = boolean[] | null | undefined;

type MaybeMixed = unknown | null | undefined;
type MaybeMixedArray = unknown[] | null | undefined;

type MaybeNumber = number | null | undefined;
type MaybeNumberArray = number[] | null | undefined;

type MaybeNull = null | undefined;
type MaybeNullArray = null[] | null | undefined;

type MaybeObject = object | null | undefined;
type MaybeObjectArray = object[] | null | undefined;
type MaybeObjectWithProps = {
  key: number;
} | null | undefined;

type MaybeString = string | null | undefined;
type MaybeStringArray = string[] | null | undefined;

type MaybeVoid = void | null | undefined;
type MaybeVoidArray = void[] | null | undefined;

type MaybeFunction = (() => number) | null | undefined;
type MaybeFunctionWitParens = (() => number) | null | undefined;
type MaybeGenericArray = Array<number | null | undefined>;
type MaybeUnion = (string | number) | null | undefined;

function functionMaybeParameter(p: number | null | undefined) {}
function functionMaybeReturn(): string[] | null | undefined {
  return undefined;
}
