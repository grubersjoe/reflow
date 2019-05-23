// @flow
import React, { Component, type Element, type Node } from 'react';

interface Props {
  margin?: string;
}

const C = (props: Props): Node => <div>Hello, world.</div>;

export default C;
