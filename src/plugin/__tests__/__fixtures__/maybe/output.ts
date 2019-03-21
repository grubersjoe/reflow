
type maybeAny = any | null | undefined;
type maybeAnyArray = any[] | null | undefined;

type maybeBoolean = boolean | null | undefined;
type maybeBooleanArray = boolean[] | null | undefined;

type maybeMixed = unknown | null | undefined;
type maybeMixedArray = unknown[] | null | undefined;

type maybeNumber = number | null | undefined;
type maybeNumberArray = number[] | null | undefined;

type maybeNull = null | undefined;
type maybeNullArray = null[] | null | undefined;

type maybeObject = {} | null | undefined;
type maybeObjectArray = {}[] | null | undefined;
type maybeObjectWithProps = {
  key: number;
} | null | undefined;

type maybeString = string | null | undefined;
type maybeStringArray = string[] | null | undefined;

type maybeUnion = (string | number) | null | undefined;

function functionMaybeNumber(p: number | null | undefined) {}
function functionMaybeString(p: string | null | undefined) {}
