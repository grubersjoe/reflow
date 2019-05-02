
interface InterfaceSimple {
  p: Date;
  q?: number;
  f(x: number): string;
}

class InterfaceClassSimple implements InterfaceSimple {
  // @ts-ignore
  p: Date;

  f(x: number) {
    return x.toLocaleString();
  }
}

class InterfaceClassMissingType implements InterfaceSimple {
  p: Date = new Date();

  // @ts-ignore
  f(x) {
    return x.toLocaleString();
  }
}

interface DerivedInterface<T> extends Set<T> {
  type: T;
}

//
//
interface InterfaceWithIndexer {
  [key: string]: number;
}

interface InterfaceWithGenerics<T1, T2, T3> {
  p: T1;
  f(x: T2): T3;
  g(x: T3, y: T3): number;
}

interface InterfaceWithVariance {
  invariant: () => void;
  readonly covariant: number | string;
  contravariant: string[];
}

interface InterfaceWithCallable {
  (x: number, y: number): string
  <T>(p: Date): T
}

function functionWithInterfaceParameter(i: InterfaceSimple) {
  return i.f(5);
}

const arrowFunctionWithInterfaceParameter: (i: InterfaceSimple) => Date = i => i.p;

const objectWithInterfaceType: {
  x: number;
  f(p: string): number;
} = {
  x: 1,
  f: p => p.length
};

interface InterfaceAlias {
  p: Date;
  f(x: number): number;
}

interface InterfaceAliasWithExtend extends InterfaceAlias {
  g(x: number): string;
}

interface InterfaceAliasWithGenerics<T> extends Map<T, T> {
  p: string;
}

type InterfaceAliasGeneric = InterfaceSimple;
