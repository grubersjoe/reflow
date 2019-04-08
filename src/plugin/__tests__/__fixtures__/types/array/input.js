// @flow
// $FlowFixMe
const arrayGenericVar: Array<number> = new Array(1, 2);
const arrayGenericLiteralVar: Array<number> = [2, 4, 8];
const arrayGenericEmptyVar: Array<any> = [];

// $FlowFixMe
const arrayConstructorVar: number[] = new Array(2, 4, 8);
const arrayVar: number[] = [3, 6, 9];
const arrayEmptyVar: string[] = [];

type ArrayGenericMixed = Array<mixed>;
type ArrayMixed = mixed[];

type ArrayGenericMaybe = ?Array<string>;
type ArrayMaybe = ?string[];

type ArrayGenericUnion = Array<{}> | Array<Date> | null;
type ArrayUnion = {}[] | Date[] | null;

type ArrayReadOnly = $ReadOnlyArray<number>;
