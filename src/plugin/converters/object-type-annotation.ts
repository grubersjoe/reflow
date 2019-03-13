import {
  TSTypeElement,
  FlowType,
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
import { NodePath } from '@babel/traverse';
import { convertFlowType } from './flow-type';

export function convertObjectTypeAnnotation(path: NodePath<ObjectTypeAnnotation>): TSTypeLiteral {
  const { exact, indexers, properties } = path.node;
  const members: TSTypeElement[] = [];

  properties.map((prop, i) => {
    if (isObjectTypeProperty(prop)) {
      const { key, optional, variance } = prop;

      const propValue = path.get(`properties.${i}.value`) as NodePath<FlowType>;
      const propSignature = tsPropertySignature(key, tsTypeAnnotation(convertFlowType(propValue)));

      propSignature.optional = optional || !exact;
      propSignature.readonly = variance && variance.kind === 'plus';

      members.push(propSignature);
    }

    if (isObjectTypeSpreadProperty(prop)) {
      const type = convertFlowType(path.get(`properties.${i}.argument`) as NodePath<FlowType>);

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
    indexers.map((indexer, i) => {
      const key = indexer.id || identifier('key');
      const keyType = convertFlowType(path.get(`indexers.${i}.key`) as NodePath<FlowType>);

      key.typeAnnotation = tsTypeAnnotation(keyType);

      const valueType = convertFlowType(path.get(`indexers.${i}.value`) as NodePath<FlowType>);
      const typeAnnotation = tsTypeAnnotation(valueType);

      const propIndexSignature = tsIndexSignature([key], typeAnnotation);

      members.push(propIndexSignature);
    });
  }

  return tsTypeLiteral(members);
}
