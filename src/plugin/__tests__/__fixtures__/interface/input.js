// @flow
interface InterfaceSimple {
  p: Date;
  q?: number;
  f(x: number): string;
}

class InterfaceClassSimple implements InterfaceSimple {
  //
  p: Date;

  f(x: number) {
    return x.toLocaleString();
  }
}

class InterfaceClassMissingType implements InterfaceSimple {
  p: Date = new Date();

  //
  f(x) {
    return x.toLocaleString();
  }
}

interface DerivedInterface<T> extends Set<T> {
  type: T;
}

// This is currently broken in Flow:
// https://github.com/facebook/flow/issues/6321
interface InterfaceWithIndexer {
  [key: string]: number;
}

interface InterfaceWithGenerics<T1, T2, T3> {
  p: T1;
  f(x: T2): T3;
  g(x: T3, y: T3): number;
}

interface InterfaceWithVariance {
  invariant: () => void,
  +covariant: number | string,
  -contravariant: string[],
}

function functionWithInterfaceParameter(i: InterfaceSimple) {
  return i.f(5);
}

const arrowFunctionWithInterfaceParameter: (i: InterfaceSimple) => Date = i => i.p;

const objectWithInterfaceType: interface {
  x: number,
  f(p: string): number,
} = {
  x: 1,
  f: (p) => p.length,
};

type InterfaceAlias = interface {
  p: Date;
  f(x: number): number;
};

type InterfaceAliasWithExtend = interface extends InterfaceAlias {
  g(x: number): string;
};

type InterfaceAliasWithGenerics<T> = interface extends Map<T, T> {
  p: string;
};

type InterfaceAliasGeneric = InterfaceSimple;
