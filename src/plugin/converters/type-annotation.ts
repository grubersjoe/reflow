import { PluginPass } from '@babel/core';
import {
  FunctionTypeParam,
  GenericTypeAnnotation,
  TSAnyKeyword,
  TSIndexedAccessType,
  TSTypeAnnotation,
  TSTypeLiteral,
  TSTypeOperator,
  TSTypeQuery,
  TSTypeReference,
  TypeAnnotation,
  isIdentifier,
  tsAnyKeyword,
  tsTypeAnnotation,
  tsTypeReference,
} from '@babel/types';
import { NodePath } from '@babel/traverse';

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
  convertReadOnlyUtil,
  convertRestUtil,
  convertShapeUtil,
} from './utility';
import { replaceNonPrimitiveType } from '../optimizers/non-primitive-types';
import { convertFlowType } from './flow-type';
import { convertIdentifier } from './identifier';
import { convertTypeParameterInstantiation } from './type-parameter';

type TSGenericTypeAnnotation =
  | TSAnyKeyword
  | TSIndexedAccessType
  | TSTypeLiteral
  | TSTypeOperator
  | TSTypeQuery
  | TSTypeReference;

export function convertTypeAnnotation(
  node: FunctionTypeParam | TypeAnnotation,
  state: PluginPass,
): TSTypeAnnotation {
  return tsTypeAnnotation(convertFlowType(node.typeAnnotation, state));
}

export function convertGenericTypeAnnotation(
  node: GenericTypeAnnotation,
  state: PluginPass,
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

        case '$Rest':
          return convertRestUtil(typeParameters);

        case '$Shape':
          return convertShapeUtil(typeParameters);

        case 'Class':
          return convertClassUtil(typeParameters, path);

        case '$ReadOnly':
          return convertReadOnlyUtil(typeParameters);

        // Unsupported utility types
        case '$ObjMap':
        case '$ObjMapi':
        case '$Subtype':
        case '$Supertype':
        case '$TupleMap': {
          logWarning(
            {
              message: `The utility type ${id.name} is not supported by Reflow and will be replaced by 'any'. Please fix this type manually afterwards.`,
            },
            state.file.code,
            node.loc,
          );

          return tsAnyKeyword();
        }
      }
    }

    id.name = replaceNonPrimitiveType(id.name);
  }

  return tsTypeReference(id, typeParameters);
}
