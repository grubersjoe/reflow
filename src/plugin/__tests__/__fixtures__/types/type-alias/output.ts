
type AliasAny = any;
type AliasNumber = number;
type AliasNumberLiteral = 5;
type AliasObjectLiteral = {
  p1: number;
  p2: string;
  p3: null;
};
type AliasString = string;
type AliasStringLiteral = "literal";
type AliasUndefined = undefined;
type AliasUnsealedObject = object;

type AliasGenericSimple<T> = T;
type AliasGeneric<T1, T2> = Map<T1, T2>;

type AliasMaybeNumber = number | null | undefined;
type AliasGenericMaybe<T> = T | null | undefined;

type MixedAlias = unknown;

type ObjectAlias = {
  p4: string;
  p5: number;
  p6: null;
};
