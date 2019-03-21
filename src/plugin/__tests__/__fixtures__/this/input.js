// @flow
class ClassWithThisReturn {
  functionThis(): this {
    return this;
  }

  functionThisWithParam(p: number): this {
    return this
  };
}
