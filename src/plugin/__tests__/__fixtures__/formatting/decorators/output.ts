











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
      value: this.field,
    };
  }
}

class C2 {}

export default d1(p1, p2, p3, p4, p5)(d2()(d3(d4('arg')(C1))));
