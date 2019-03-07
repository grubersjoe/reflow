import { NodePath, VisitNodeFunction } from '@babel/traverse';
import { FlowType } from '@babel/types';

import { PluginPass } from '../types';
import { Stats } from '../../util/stats';

function collectStats(path: NodePath<FlowType>): void {
  Stats.typeCounter.incrementFor(path.node.type);
  console.log(`  - ${path.node.type}`);
}

const flowTypeVisitor: VisitNodeFunction<object, FlowType> = (path, state): void => {
  const { verbose } = (state as PluginPass<FlowType>).opts;

  if (verbose) {
    collectStats(path);
  }
};

export { flowTypeVisitor };
