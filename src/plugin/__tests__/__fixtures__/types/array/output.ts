

const arrayGenericVar: Array<number> = new Array(1, 2);
const arrayGenericLiteralVar: Array<number> = [2, 4, 8];
const arrayGenericEmptyVar: Array<any> = [];


const arrayConstructorVar: number[] = new Array(2, 4, 8);
const arrayVar: number[] = [3, 6, 9];
const arrayEmptyVar: string[] = [];

type ArrayGenericMixed = Array<unknown>;
type ArrayMixed = unknown[];

type ArrayGenericMaybe = Array<string> | null | undefined;
type ArrayMaybe = string[] | null | undefined;

type ArrayGenericUnion = Array<object> | Array<Date> | null;
type ArrayUnion = object[] | Date[] | null;

type ArrayReadOnly = ReadonlyArray<number>;
