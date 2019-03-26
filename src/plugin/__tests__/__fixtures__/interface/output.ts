
interface InterfaceSimple {
  p: Date;
  m: (x: number) => string;
}

class InterfaceClassSimple implements InterfaceSimple {
  // @ts-ignore
  p: Date;

  m(x: number) {
    return x.toLocaleString();
  }
}

class InterfaceClassMissingType implements InterfaceSimple {
  // @ts-ignore
  p: Date;

  // @ts-ignore
  m(x) {
    return x.toLocaleString();
  }
}

//
//
interface InterfaceWithIndexer {
  [key: string]: number;
}

interface InterfaceWithGenerics<T1, T2, T3> {
  p: T1;
  m1: (x: T2) => T3;
  m2: (x: T3, y: T3) => number;
}

const InterfaceWithGenericsImplementation: InterfaceWithGenerics<string, string, number> = {
  p: 'string',
  m1: x => 3,
  m2: (x, y) => x * y
};

interface InterfaceVariance {
  invariant: () => void;
  readonly covariant: number | string;
  contravariant: Date;
}
