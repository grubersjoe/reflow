import {
  TSTypeElement,
  tsPropertySignature,
  tsTypeAnnotation,
  tsTypeLiteral,
  TSTypeLiteral,
  ObjectTypeAnnotation,
  isObjectTypeProperty,
  tsIndexSignature,
  identifier,
  isObjectTypeSpreadProperty,
  isTSTypeLiteral,
} from '@babel/types';
import { convertFlowType } from './flow-type';

export function convertObjectTypeAnnotation(node: ObjectTypeAnnotation): TSTypeLiteral {
  const { exact, indexers, properties } = node;
  const members: TSTypeElement[] = [];

  properties.map(prop => {
    if (isObjectTypeProperty(prop)) {
      const { key, optional, variance } = prop;

      const propSignature = tsPropertySignature(key, tsTypeAnnotation(convertFlowType(prop.value)));

      propSignature.optional = optional;
      propSignature.readonly = variance && variance.kind === 'plus';

      members.push(propSignature);
    }

    if (isObjectTypeSpreadProperty(prop)) {
      const type = convertFlowType(prop.argument);

      // TODO
      if (exact) {
        if (isTSTypeLiteral(type)) {
          members.push(...type.members);
        }
      } else {
        if (isTSTypeLiteral(type)) {
          members.push(...type.members);
        }
      }
    }
  });

  if (indexers) {
    indexers.map(indexer => {
      const key = indexer.id || identifier('key');
      key.typeAnnotation = tsTypeAnnotation(convertFlowType(indexer.key));

      const typeAnnotation = tsTypeAnnotation(convertFlowType(indexer.value));
      const propIndexSignature = tsIndexSignature([key], typeAnnotation);

      members.push(propIndexSignature);
    });
  }

  return tsTypeLiteral(members);
}
