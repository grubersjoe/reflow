import { VisitNodeFunction } from '@babel/traverse';
import { Flow } from '@babel/types';

import { Stats } from '../../util/stats';
import { OverflowOptions } from '..';

const visitor: VisitNodeFunction<Flow, Flow> = (path, state: any): void => {
  const { verbose } = state.opts as OverflowOptions;

  Stats.typeCounter.incrementFor(path.node.type);

  if (verbose) {
    console.log(`  - ${path.node.type}`);
  }
};

export default visitor;
