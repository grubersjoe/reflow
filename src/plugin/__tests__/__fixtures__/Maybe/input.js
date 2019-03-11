// @flow
const maybeBoolean: ?boolean = true;
const maybeBooleanNull: ?boolean = null;
const maybeBooleanUndefined: ?boolean = undefined;
const maybeBooleanArray: ?boolean[] = [true, false];
const maybeBooleanArrayEmpty: ?boolean[] = [];
const maybeBooleanArrayNull: ?boolean[] = null;
const maybeBooleanArrayUndefined: ?boolean[] = undefined;

const maybeNumber: ?number = 1;
const maybeNumberNull: ?number = null;
const maybeNumberUndefined: ?number = undefined;
const maybeNumberArray: ?number[] = [1, 2, 3];
const maybeNumberArrayEmpty: ?number[] = [];
const maybeNumberArrayNull: ?number[] = null;
const maybeNumberArrayUndefined: ?number[] = undefined;

const maybeNull: ?null = null;
const maybeNullUndefined: ?null = undefined;
const maybeNullArray: ?null[] = [null, null, null];
const maybeNullArrayEmpty: ?null[] = [];
const maybeNullArrayNull: ?null[] = null;
const maybeNullArrayUndefined: ?null[] = undefined;

const maybeString: ?string = 'a';
const maybeStringNull: ?string = null;
const maybeStringUndefined: ?string = undefined;
const maybeStringArray: ?string[] = ['a', 'b', 'c'];
const maybeStringArrayEmpty: ?string[] = [];
const maybeStringArrayNull: ?string[] = null;
const maybeStringArrayUndefined: ?string[] = undefined;

function funcMaybeNumber(value: ?number) {}
function funcMaybeString(value: ?string) {}
