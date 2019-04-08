// @flow

// Note: most of generics functionality is tested in other fixtures
// (Class, Interface, TypeAlias)

function genericFunctionIdentity<T>(p: T): T {
  return p;
}

const genericFunctionCall = genericFunctionIdentity<null>(null);

class Animal {}
function genericFunctionWithBound<T: Animal>(p: T): void {}

type GenericTypeAlias = <T>(p: T) => T;

type GenericTypeAliasWithBound<T: number> = {
  amount: T,
};

type GenericTypeAliasWithBoundAndDefault<T: number = 100> = {
  amount: T,
};

type GenericWithOtherTypes = Map<?Set<typeof Animal>, Array<Date>>;

type GenericCovariant<+T1, T2> = T1;
type GenericContravariant<T1, -T2> = T1;
type GenericVarianceMixed<T1, -T2, +T3, +T4> = T1;
