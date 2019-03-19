// @flow
type AliasAny = any;
type AliasNumber = number;
type AliasNumberLiteral = 5;
type AliasObjectLiteral = {
  p1: number,
  p2: string,
  p3: null,
};
type AliasString = String;
type AliasStringLiteral = "literal";
type AliasUndefined = typeof undefined;
type AliasUnsealedObject = {};

type AliasGenericSimple<T> = T;
type AliasGeneric<S, T> = Map<S, T>;

type AliasMaybeNumber = ?number;
type AliasGenericMaybe<T> = ?T;

type MixedAlias = mixed;

type ObjectAlias = {
  p4: string,
  p5: number,
  p6: null,
};
