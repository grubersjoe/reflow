
type TCall = () => string;
type TCallPolymorphic = <T>(arg: T) => T;

type CallType = ReturnType<TCall>;
type CallTypeLiteral = ReturnType<(arg: boolean) => number>;

type CallTypePolymorphic = ReturnType<TCallPolymorphic>;
type CallTypeLiteralPolymorphic = ReturnType<<Q>() => Q>;
