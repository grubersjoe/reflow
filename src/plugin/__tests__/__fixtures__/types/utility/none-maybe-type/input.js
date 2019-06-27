// @flow
type Maybe = ?string;
type Union = {} | null;

type NonMaybeTypeMaybe = $NonMaybeType<Maybe>;
type NonMaybeTypeUnion = $NonMaybeType<Union>;
type NonMaybeLiteralTypeMaybe = $NonMaybeType<?number>;
type NonMaybeLiteralTypeUnion = $NonMaybeType<boolean | typeof undefined>;
