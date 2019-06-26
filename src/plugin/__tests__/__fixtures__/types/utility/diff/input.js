// @flow
interface A {
  p: number,
  q: string,
}

interface B {
  q: string,
}

type DiffType = $Diff<A, B>;

type DiffTypeLiteral = $Diff<{
  p: null,
}, {}>;
