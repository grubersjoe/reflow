
import React from 'react';
import { ReactNode, ReactElement } from 'react';

interface Props {
  margin?: string;
}

const C = (props: Props): ReactNode | ReactElement<any> => <div>Hello, world.</div>;

export default C;
