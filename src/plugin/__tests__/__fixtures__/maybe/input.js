// @flow
type maybeAny = ?any;
type maybeAnyArray = ?any[];

type maybeBoolean = ?boolean;
type maybeBooleanArray = ?boolean[];

type maybeMixed = ?mixed;
type maybeMixedArray = ?mixed[];

type maybeNumber = ?number;
type maybeNumberArray = ?number[];

type maybeNull = ?null;
type maybeNullArray = ?null[];

type maybeObject = ?{};
type maybeObjectArray = ?{}[];
type maybeObjectWithProps = ?{
  key: number,
};

type maybeString = ?string;
type maybeStringArray = ?string[];

type maybeUnion = ?(string | number);

function functionMaybeNumber(p: ?number) {}
function functionMaybeString(p: ?string) {}
