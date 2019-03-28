import {
  FlowType,
  TSType,
  booleanLiteral,
  numericLiteral,
  stringLiteral,
  tsAnyKeyword,
  tsArrayType,
  tsBooleanKeyword,
  tsIntersectionType,
  tsLiteralType,
  tsNeverKeyword,
  tsNullKeyword,
  tsNumberKeyword,
  tsStringKeyword,
  tsThisType,
  tsTupleType,
  tsUnionType,
  tsUnknownKeyword,
  tsVoidKeyword,
} from '@babel/types';

import { NotImplementedError } from '../../util/error';
import { Stats } from '../../util/stats';
import { PluginWarnings, WARNINGS } from '../warnings';

import { convertFunctionTypeAnnotation } from './function';
import { convertGenericTypeAnnotation } from './generic-type-annotation';
import { convertNullableTypeAnnotation } from './nullable-type-annotation';
import { convertObjectTypeAnnotation } from './object-type-annotation';
import { convertTypeofTypeAnnotation } from './typeof-type-annotation';

export function convertFlowType(node: FlowType): TSType {
  Stats.typeCounter.incrementFor(node.type);

  switch (node.type) {
    case 'AnyTypeAnnotation':
      return tsAnyKeyword();

    case 'ArrayTypeAnnotation':
      return tsArrayType(convertFlowType(node.elementType));

    case 'BooleanLiteralTypeAnnotation':
      return tsLiteralType(booleanLiteral(node.value));

    case 'BooleanTypeAnnotation':
      return tsBooleanKeyword();

    case 'EmptyTypeAnnotation':
      return tsNeverKeyword();

    case 'ExistsTypeAnnotation':
      PluginWarnings.enable(WARNINGS.ExistsTypeAnnotation);
      return tsAnyKeyword();

    case 'FunctionTypeAnnotation':
      return convertFunctionTypeAnnotation(node);

    case 'GenericTypeAnnotation':
      return convertGenericTypeAnnotation(node);

    case 'InterfaceTypeAnnotation':
      return convertObjectTypeAnnotation(node.body);

    case 'IntersectionTypeAnnotation':
      return tsIntersectionType(node.types.map(convertFlowType));

    case 'MixedTypeAnnotation':
      return tsUnknownKeyword();

    case 'NullLiteralTypeAnnotation':
      return tsNullKeyword();

    case 'NullableTypeAnnotation':
      return convertNullableTypeAnnotation(node);

    case 'NumberLiteralTypeAnnotation':
      return tsLiteralType(numericLiteral(node.value));

    case 'NumberTypeAnnotation':
      return tsNumberKeyword();

    case 'ObjectTypeAnnotation':
      return convertObjectTypeAnnotation(node);

    case 'StringLiteralTypeAnnotation':
      return tsLiteralType(stringLiteral(node.value));

    case 'StringTypeAnnotation':
      return tsStringKeyword();

    case 'ThisTypeAnnotation':
      return tsThisType();

    case 'TupleTypeAnnotation':
      return tsTupleType(node.types.map(convertFlowType));

    case 'TypeofTypeAnnotation':
      return convertTypeofTypeAnnotation(node);

    case 'UnionTypeAnnotation':
      return tsUnionType(node.types.map(convertFlowType));

    case 'VoidTypeAnnotation':
      return tsVoidKeyword();

    default:
      throw new NotImplementedError(`${(node as FlowType).type} is not implemented.`);
  }
}
