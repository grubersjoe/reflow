
import React, { Component, ReactNode } from 'react';



class C extends Component {
  render(): ReactNode {
    return <div>Hello, world!</div>;
  }
}

// @ts-ignore
export default A(x, y)(B(C()(C)));
