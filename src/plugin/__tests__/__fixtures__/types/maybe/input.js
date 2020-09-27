// @flow
type MaybeAny = ?any;
type MaybeAnyArray = ?any[];

type MaybeBoolean = ?boolean;
type MaybeBooleanArray = ?boolean[];

type MaybeMixed = ?mixed;
type MaybeMixedArray = ?mixed[];

type MaybeNumber = ?number;
type MaybeNumberArray = ?number[];

type MaybeNull = ?null;
type MaybeNullArray = ?null[];

type MaybeObject = ?{};
type MaybeObjectArray = ?{}[];
type MaybeObjectWithProps = ?{
  key: number,
};

type MaybeString = ?string;
type MaybeStringArray = ?string[];

type MaybeVoid = ?void;
type MaybeVoidArray = ?void[];

type MaybeFunction = ?() => number;
type MaybeFunctionWitParens = ?(() => number);
type MaybeGenericArray = Array<?number>;
type MaybeUnion = ?(string | number);

function functionMaybeParameter(p: ?number) {}
function functionMaybeReturn(): ?string[] {
  return undefined;
}

type ObjectWithOptionalMaybeProp = {
  value?: ?string;
};
