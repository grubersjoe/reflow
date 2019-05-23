// @flow
import React, { type Node as NodeAlias } from 'react';

interface Props {
  margin?: string;
}

const C = (props: Props): NodeAlias => <div>Hello, world.</div>;

export default C;
