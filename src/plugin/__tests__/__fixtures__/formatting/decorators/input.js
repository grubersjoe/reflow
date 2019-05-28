// @flow
// NOTE: The decorators will be collapsed by Prettier in the formatting routine.
@d1(
  p1,
  p2,
  p3,
  p4,
  p5,
)

@d2()
  @d3
@d4('arg')
class C1 {
  field: null;

  /**
   * Class constructor
   */
  constructor(arg: any) {
    this.field = arg;
  }

  method() {
    // A line comment

    return {
      value: this.field, // eslint-disable
    };
  }
}

/* Block comment */
class C2 {}

export default C1;
