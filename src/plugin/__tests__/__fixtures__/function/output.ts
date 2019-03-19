
function functionWithInitializer(p1: string, p2: boolean = false) {}
function functionWithTypeParams<T>(p: T): T {
  return p;
}
function functionWithOptionalAndInitializer(a: string, b?: number, c: boolean = false) {}

const arrowFunctionUntyped = () => {};
const arrowFunctionWithParams = (p1: {}, p2: boolean) => {};
