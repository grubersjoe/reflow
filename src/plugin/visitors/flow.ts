import { VisitNodeFunction } from '@babel/traverse';
import { Flow } from '@babel/types';

import { OverflowOptions } from '..';

const FlowVisitor: VisitNodeFunction<Flow, Flow> = (path, state: any): void => {
  const { verbose } = state.opts as OverflowOptions;

  if (verbose) {
    console.log(`  - ${path.node.type}`);
  }
};

export default FlowVisitor;
