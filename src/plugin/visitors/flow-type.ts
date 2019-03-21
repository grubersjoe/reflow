import { VisitNodeFunction } from '@babel/traverse';
import { FlowType } from '@babel/types';

import { Metrics } from '../../util/metric';

function collectStats(node: FlowType): void {
  Metrics.typeCounter.incrementFor(node.type);
  console.log(`  - ${node.type}`);
}

export const flowTypeVisitor: VisitNodeFunction<object, FlowType> = (path, state): void => {
  const { verbose } = (state as PluginPass<FlowType>).opts;

  if (verbose) {
    collectStats(path.node);
  }
};
