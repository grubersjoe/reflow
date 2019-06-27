// @flow
type TCall = () => string;
type TCallPolymorphic = <T>(arg: T) => T;

type CallType = $Call<TCall>;
type CallTypeLiteral = $Call<(arg: boolean) => number>;

type CallTypePolymorphic = $Call<TCallPolymorphic>;
type CallTypeLiteralPolymorphic = $Call<<Q>() => Q>;
