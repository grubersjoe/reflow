import { NodePath, VisitNodeFunction } from '@babel/traverse';
import t from '@babel/types';

import { Stats } from '../../util/stats';
import { OverflowOptions } from '..';

function collectStats(path: NodePath<t.FlowType>): void {
  Stats.typeCounter.incrementFor(path.node.type);
  console.log(`  - ${path.node.type}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlowType: VisitNodeFunction<any, t.FlowType> = (path, state: any): void => {
  const { verbose } = state.opts as OverflowOptions;

  if (verbose) {
    collectStats(path);
  }
};

export { FlowType };
