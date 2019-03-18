
type AliasNumber = number;
type AliasNumberLiteral = 5;
type AliasString = String;
type AliasStringLiteral = "literal";
type AliasUnsealedObject = {};
type AliasObjectLiteral = {
  p1: number;
  p2: string;
  p3: null;
};

type AliasGenericSimple<T> = T;
type AliasGeneric<S, T> = Map<S, T>;

type AliasMaybeNumber = number | null | undefined;
type AliasGenericMaybe<T> = T | null | undefined;

type ObjectAlias = {
  p4: string;
  p5: number;
  p6: null
};
