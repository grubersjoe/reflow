




function genericFunctionIdentity<T>(p: T): T {
  return p;
}

const genericFunctionCall = genericFunctionIdentity<null>(null);

class Animal {}
function genericFunctionWithBound<T extends Animal>(p: T): void {}

type GenericTypeAlias = <T>(p: T) => T;

type GenericTypeAliasWithBound<T extends number> = {
  amount: T;
};

type GenericTypeAliasWithBoundAndDefault<T extends number = 100> = {
  amount: T;
};

type GenericWithOtherTypes = Map<Set<typeof C1> | null | undefined, Array<Date>>;

type GenericCovariant<T1, T2> = T1;
type GenericContravariant<T1, T2> = T1;
type GenericVarianceMixed<T1, T2, T3, T4> = T1;
