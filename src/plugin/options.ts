import { TransformOptions } from '@babel/core';

/**
 * Add Babel syntax plugins for commonly used features and technologies
 * @param parserOpts
 */
export function setTransformOptions(parserOpts: TransformOptions): void {
  if (!parserOpts.plugins) {
    throw new Error('Unexpected error');
  }

  parserOpts.plugins.push('classProperties');
  parserOpts.plugins.push([
    'decorators',
    {
      decoratorsBeforeExport: true,
    },
  ]);
  parserOpts.plugins.push('dynamicImport');
  parserOpts.plugins.push('flow');
  parserOpts.plugins.push('jsx');
}
