import {
  Flow,
  FlowType,
  GenericTypeAnnotation,
  TSType,
  booleanLiteral,
  numericLiteral,
  stringLiteral,
  tsAnyKeyword,
  tsArrayType,
  tsBooleanKeyword,
  tsLiteralType,
  tsNeverKeyword,
  tsNullKeyword,
  tsNumberKeyword,
  tsStringKeyword,
  tsThisType,
  tsTupleType,
  tsUnknownKeyword,
  tsVoidKeyword,
} from '@babel/types';
import { NodePath } from '@babel/traverse';

import { NotImplementedError } from '../../util/error';
import { WARNINGS, logWarning } from '../util/warnings';

import { ConverterState } from '../types';
import { convertFunctionTypeAnnotation } from './function';
import { convertInterfaceTypeAnnotation } from './interface';
import { convertIntersectionTypeAnnotation } from './intersection';
import { convertNullableTypeAnnotation } from './nullable';
import { convertObjectTypeAnnotation } from './object';
import { convertTypeofTypeAnnotation } from './typeof';
import { convertGenericTypeAnnotation } from './type-annotation';
import { convertUnionTypeAnnotation } from './union';

export function convertFlowType(
  node: FlowType,
  state: ConverterState,
  path?: NodePath<Flow>,
): TSType {
  switch (node.type) {
    case 'AnyTypeAnnotation':
      return tsAnyKeyword();

    case 'ArrayTypeAnnotation':
      return tsArrayType(convertFlowType(node.elementType, state));

    case 'BooleanLiteralTypeAnnotation':
      return tsLiteralType(booleanLiteral(node.value));

    case 'BooleanTypeAnnotation':
      return tsBooleanKeyword();

    case 'EmptyTypeAnnotation':
      return tsNeverKeyword();

    case 'ExistsTypeAnnotation':
      logWarning(WARNINGS.existsTypeAnnotation, state.file.code, node.loc);
      return tsAnyKeyword();

    case 'FunctionTypeAnnotation':
      return convertFunctionTypeAnnotation(node, state);

    case 'GenericTypeAnnotation':
      return convertGenericTypeAnnotation(
        node,
        state,
        path as NodePath<GenericTypeAnnotation>,
      );

    case 'InterfaceTypeAnnotation':
      return convertInterfaceTypeAnnotation(node, state);

    case 'IntersectionTypeAnnotation':
      return convertIntersectionTypeAnnotation(node, state);

    case 'MixedTypeAnnotation':
      return tsUnknownKeyword();

    case 'NullLiteralTypeAnnotation':
      return tsNullKeyword();

    case 'NullableTypeAnnotation':
      return convertNullableTypeAnnotation(node, state);

    case 'NumberLiteralTypeAnnotation':
      return tsLiteralType(numericLiteral(node.value));

    case 'NumberTypeAnnotation':
      return tsNumberKeyword();

    case 'ObjectTypeAnnotation':
      return convertObjectTypeAnnotation(node, state);

    case 'StringLiteralTypeAnnotation':
      return tsLiteralType(stringLiteral(node.value));

    case 'StringTypeAnnotation':
      return tsStringKeyword();

    case 'ThisTypeAnnotation':
      return tsThisType();

    case 'TupleTypeAnnotation':
      return tsTupleType(node.types.map(type => convertFlowType(type, state)));

    case 'TypeofTypeAnnotation':
      return convertTypeofTypeAnnotation(node);

    case 'UnionTypeAnnotation':
      return convertUnionTypeAnnotation(node, state);

    case 'VoidTypeAnnotation':
      return tsVoidKeyword();

    default:
      throw new NotImplementedError(
        `${(node as FlowType).type} is not implemented.`,
      );
  }
}
