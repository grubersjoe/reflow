
type CastType = number;
const value: any = undefined;

const castVar = (value as CastType);
const castVarLiteral = (value as 3);

const castObjectProperty = {
  prop: (value as CastType)
};

const castArray = ([(value as CastType), (value as CastType)] as Array<CastType>);

const castExpressionNumbers = ((2 + 3) * 4 as number);
const castExpressionArray = (['a', 'b', 'c'] as unknown);

// @ts-ignore
function doubleCast(p): {} {
  return ((p as any) as {});
}

// @ts-ignore
function typeAssertion(p): number {
  return (p as string).length;
}
