import {
  BaseNode,
  FlowType,
  GenericTypeAnnotation,
  TSIndexedAccessType,
  TSTypeAnnotation,
  TSTypeLiteral,
  TSTypeOperator,
  TSTypeQuery,
  TSTypeReference,
  isIdentifier,
  tsTypeAnnotation,
  tsTypeReference,
} from '@babel/types';
import { NodePath } from '@babel/traverse';

import { ConverterState } from '../types';
import { logWarning } from '../util/warnings';
import {
  convertCallUtility,
  convertClassUtil,
  convertDiffUtil,
  convertElementTypeUtil,
  convertExactUtil,
  convertKeysUtil,
  convertNonMaybeTypeUtil,
  convertPropertyTypeUtil,
  convertReadOnlyArrayUtil,
  convertShapeUtil,
} from './utility';
import { replaceNonPrimitiveType } from '../optimizers/non-primitive-types';
import { convertFlowType } from './flow-type';
import { convertIdentifier } from './identifier';
import { convertTypeParameterInstantiation } from './type-parameter';

type TSGenericTypeAnnotation =
  | TSIndexedAccessType
  | TSTypeLiteral
  | TSTypeOperator
  | TSTypeQuery
  | TSTypeReference;

interface TypeAnnotationWithFlowType extends BaseNode {
  typeAnnotation: FlowType;
}

export function convertTypeAnnotation(
  node: TypeAnnotationWithFlowType,
  state: ConverterState,
): TSTypeAnnotation {
  return tsTypeAnnotation(convertFlowType(node.typeAnnotation, state));
}

export function convertGenericTypeAnnotation(
  node: GenericTypeAnnotation,
  state: ConverterState,
  path: NodePath<GenericTypeAnnotation>,
): TSGenericTypeAnnotation {
  const id = convertIdentifier(node.id);

  const typeParameters = node.typeParameters
    ? convertTypeParameterInstantiation(node.typeParameters, state)
    : null;

  if (isIdentifier(id)) {
    if (typeParameters) {
      switch (id.name) {
        case '$Call':
          return convertCallUtility(typeParameters);

        case '$Diff':
          return convertDiffUtil(typeParameters);

        case '$ElementType':
          return convertElementTypeUtil(typeParameters);

        case '$Exact':
          return convertExactUtil(typeParameters);

        case '$Keys':
          return convertKeysUtil(typeParameters);

        case '$NonMaybeType':
          return convertNonMaybeTypeUtil(typeParameters);

        case '$PropertyType':
          return convertPropertyTypeUtil(typeParameters);

        case '$ReadOnlyArray':
          return convertReadOnlyArrayUtil(typeParameters);

        case '$Shape':
          return convertShapeUtil(typeParameters);

        case 'Class':
          return convertClassUtil(typeParameters, path);

        // Unsupported utility types
        case '$ObjMap':
        case '$ObjiMap':
        case '$Rest':
        case '$TupleMap':
        case '$Subtype':
        case '$Supertype': {
          logWarning(
            {
              message: `The utility type ${id.name} is not supported by Reflow and will be retained in the output. Please fix this manually.`,
            },
            state.file.code,
            node.loc,
          );
        }
      }
    }

    id.name = replaceNonPrimitiveType(id.name);
  }

  return tsTypeReference(id, typeParameters);
}
