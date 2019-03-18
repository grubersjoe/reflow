import { VisitNodeFunction } from '@babel/traverse';
import { FlowType } from '@babel/types';

import { Stats } from '../../util/stats';

function collectStats(node: FlowType): void {
  Stats.typeCounter.incrementFor(node.type);
  console.log(`  - ${node.type}`);
}

export const flowTypeVisitor: VisitNodeFunction<object, FlowType> = (path, state): void => {
  const { verbose } = (state as PluginPass<FlowType>).opts;

  if (verbose) {
    collectStats(path.node);
  }
};
