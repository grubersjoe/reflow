
const tupleVar: [any] = [null];
const tupleConst: [string, number] = ['string', 1];

type TupleType = [number, number, boolean];
type TupleWithUnion = [number, number | null];
type TupleWithMaybe = [number, number, null | undefined];
