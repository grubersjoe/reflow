// @flow
type CastType = number;
const value: any = undefined;

const castVar = (value: CastType);
const castVarLiteral = (value: 3);

const castObjectProperty = {
  prop: (value: CastType),
};

const castArray = ([(value: CastType), (value: CastType)]: Array<CastType>);

const castExpressionNumbers = ((2 + 3) * 4: number);
const castExpressionArray = (['a', 'b', 'c']: mixed);

//
function doubleCast(p): {} {
  return ((p: any): {});
}

//
function typeAssertion(p): number {
  return (p: string).length;
}
