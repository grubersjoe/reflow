// @flow
import React from 'react';
import { type Node, type Element } from 'react';

interface Props {
  margin?: string;
}

const C = (props: Props): Node | Element<any> => <div>Hello, world.</div>;

export default C;
