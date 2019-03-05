import { NodePath } from '@babel/traverse';
import types from '@babel/types';

import { Stats } from '../../util/stats';
import { OverflowOptions } from '..';

function collectStats(path: NodePath<types.FlowType>): void {
  Stats.typeCounter.incrementFor(path.node.type);
  console.log(`  - ${path.node.type}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FlowType(path: NodePath<types.FlowType>, state: any): void {
  const { verbose } = state.opts as OverflowOptions;

  if (verbose) {
    collectStats(path);
  }
}
