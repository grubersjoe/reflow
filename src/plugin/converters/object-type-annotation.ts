import { TSTypeElement, FlowType, tsPropertySignature, tsTypeAnnotation, tsTypeLiteral, TSTypeLiteral, ObjectTypeAnnotation } from '@babel/types';
import { NodePath } from '@babel/traverse';
import { convertFlowType } from './flow-type';

export function convertObjectTypeAnnotation(path: NodePath<ObjectTypeAnnotation>): TSTypeLiteral {
  const objectMembers: TSTypeElement[] = [];

  path.get('properties').map((prop, i) => {
    if (prop.isObjectTypeProperty()) {
      const { key, optional, variance } = prop.node;

      const propType = path.get(`properties.${i}.value`) as NodePath<FlowType>;
      const propSignature = tsPropertySignature(
        key,
        tsTypeAnnotation(convertFlowType(propType)),
      );

      propSignature.optional = optional;
      propSignature.readonly = variance && variance.kind === 'plus';

      objectMembers.push(propSignature);
    }

    // TODO: Spread?
  });

  return tsTypeLiteral(objectMembers);
}
