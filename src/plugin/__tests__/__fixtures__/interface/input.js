// @flow
interface InterfaceSimple {
  p: Date;
  q?: number;
  m(x: number): string;
}

class InterfaceClassSimple implements InterfaceSimple {
  //
  p: Date;

  m(x: number) {
    return x.toLocaleString();
  }
}

class InterfaceClassMissingType implements InterfaceSimple {
  p: Date = new Date();

  //
  m(x) {
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
  m1(x: T2): T3;
  m2(x: T3, y: T3): number;
}

const InterfaceWithGenericsImplementation: InterfaceWithGenerics<string, string, number> = {
  p: 'string',
  m1: x => 3,
  m2: (x, y) => x * y,
};

interface InterfaceVariance {
  invariant: () => void,
  +covariant: number | string,
  -contravariant: Date,
}
