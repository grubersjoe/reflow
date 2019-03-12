
type AliasNumber = number;
type AliasString = String;
type AliasLiteral = "literal";

type AliasGenericSimple<T> = T;
type AliasGeneric<S, T> = Map<S, T>;

type AliasMaybeNumber = number | null | undefined;
type AliasGenericMaybe<T> = T | null | undefined;
