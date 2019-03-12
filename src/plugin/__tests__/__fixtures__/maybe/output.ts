
const maybeBoolean: boolean | null | undefined = true;
const maybeBooleanNull: boolean | null | undefined = null;
const maybeBooleanUndefined: boolean | null | undefined = undefined;
const maybeBooleanArray: boolean[] | null | undefined = [true, false];
const maybeBooleanArrayEmpty: boolean[] | null | undefined = [];
const maybeBooleanArrayNull: boolean[] | null | undefined = null;
const maybeBooleanArrayUndefined: boolean[] | null | undefined = undefined;

const maybeNumber: number | null | undefined = 1;
const maybeNumberNull: number | null | undefined = null;
const maybeNumberUndefined: number | null | undefined = undefined;
const maybeNumberArray: number[] | null | undefined = [1, 2, 3];
const maybeNumberArrayEmpty: number[] | null | undefined = [];
const maybeNumberArrayNull: number[] | null | undefined = null;
const maybeNumberArrayUndefined: number[] | null | undefined = undefined;

const maybeNull: null | undefined = null;
const maybeNullUndefined: null | undefined = undefined;
const maybeNullArray: null[] | null | undefined = [null, null, null];
const maybeNullArrayEmpty: null[] | null | undefined = [];
const maybeNullArrayNull: null[] | null | undefined = null;
const maybeNullArrayUndefined: null[] | null | undefined = undefined;

const maybeString: string | null | undefined = 'a';
const maybeStringNull: string | null | undefined = null;
const maybeStringUndefined: string | null | undefined = undefined;
const maybeStringArray: string[] | null | undefined = ['a', 'b', 'c'];
const maybeStringArrayEmpty: string[] | null | undefined = [];
const maybeStringArrayNull: string[] | null | undefined = null;
const maybeStringArrayUndefined: string[] | null | undefined = undefined;

function funcMaybeNumber(p: number | null | undefined) {}
function funcMaybeString(p: string | null | undefined) {}
