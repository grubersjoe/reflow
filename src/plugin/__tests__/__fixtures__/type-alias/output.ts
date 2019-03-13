
type AliasNumber = number;
type AliasNumberLiteral = 5;
type AliasString = String;
type AliasStringLiteral = "literal";
type AliasUnsealedObject = {};
type AliasObjectLiteral = {
  a?: number;
  b?: string;
  c?: null;
};

type AliasGenericSimple<T> = T;
type AliasGeneric<S, T> = Map<S, T>;

type AliasMaybeNumber = number | null | undefined;
type AliasGenericMaybe<T> = T | null | undefined;
