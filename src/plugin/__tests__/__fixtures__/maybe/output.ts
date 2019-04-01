
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

type MaybeObject = {} | null | undefined;
type MaybeObjectArray = {}[] | null | undefined;
type MaybeObjectWithProps = {
  key: number;
} | null | undefined;

type MaybeString = string | null | undefined;
type MaybeStringArray = string[] | null | undefined;

type MaybeUnion = (string | number) | null | undefined;

function functionMaybeParameter(p: number | null | undefined) {}
function functionMaybeReturn(): string[] | null | undefined {
  return undefined;
}
