
class C1 {
  p1: number | null;
  p2: unknown;

  constructor(arg: string) {
    this.p1 = null;
    this.p2 = arg;
  }

  m(): number {
    return this.p1 || 0;
  }
}

type ClassTypeAlias = typeof C1;
type InstanceTypeAlias = C1;

const c1: C1 = new C1('string');
const c2: ClassTypeAlias = C1;
const c3: InstanceTypeAlias = new C1('string');

class C2 {
  static date: typeof Date = Date;
}

type ClassUtilityWithQualifiedIdentifier = typeof C2.date;

class ClassWithGenerics<T1, T2> {
  p1: T1;

  constructor(p1: T1, p2: T2) {
    this.p1 = p1;
    this.m(p2);
  }

  m(p: T2) {}
}

const generics = new ClassWithGenerics<string, Date>('string', new Date());
