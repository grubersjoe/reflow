
type Maybe = string | null | undefined;
type Union = {} | null;

type NonMaybeTypeMaybe = NonNullable<Maybe>;
type NonMaybeTypeUnion = NonNullable<Union>;
type NonMaybeLiteralTypeMaybe = NonNullable<number | null | undefined>;
type NonMaybeLiteralTypeUnion = NonNullable<boolean | undefined>;
