// @flow
type O = {};
type F = () => void;
type T = [boolean, ?number];

type ObjMapAlias = $ObjMap<O, F>;
type ObjMapAliasLiteral = $ObjMap<{}, () => number>;
type ObjMapiAlias = $ObjMapi<O, F>;
type TupleMapAliasTuple = $ObjMapi<T, F>;
type TupleMapAliasObj = $ObjMapi<O, F>;

let ObjMapTypeAnnotation: $ObjMap<O, F>;
