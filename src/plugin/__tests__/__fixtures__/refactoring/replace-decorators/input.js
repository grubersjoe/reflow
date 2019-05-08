// @flow
import React, { Component, type ReactNode } from 'react';

@A(
  x,
  y,
)
@B
@C()
class C extends Component {
  render(): ReactNode {
    return <div>Hello, world!</div>;
  }
}

export default C;
