
interface A {
  p: number;
  q: string;
}

interface B {
  q: string;
}

type DiffType = Omit<A, keyof B>;

type DiffTypeLiteral = Omit<{
  p: null;
}, keyof object>;
