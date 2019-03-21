import {
  FlowType,
  TSEntityName,
  TSType,
  booleanLiteral,
  isTSNullKeyword,
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
  tsTypeReference,
  tsUndefinedKeyword,
  tsUnionType,
  tsUnknownKeyword,
  tsVoidKeyword,
} from '@babel/types';

import { insertIf } from '../../util/array';
import { convertObjectTypeAnnotation } from './object-type-annotation';
import { convertTypeParameterInstantiation } from './type-parameter';
import { convertTypeofTypeAnnotation } from './typeof-type-annotation';
import { NotImplementedError } from '../../util/error';
import { convertFunctionTypeAnnotation } from './function-type-annotation';

export function convertFlowType(node: FlowType): TSType {
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
      return tsAnyKeyword();

    case 'FunctionTypeAnnotation':
      return convertFunctionTypeAnnotation(node);

    case 'GenericTypeAnnotation': {
      const typeParameters = node.typeParameters
        ? convertTypeParameterInstantiation(node.typeParameters)
        : null;

      return tsTypeReference(node.id as TSEntityName, typeParameters);
    }

    case 'InterfaceTypeAnnotation':
      // TODO
      throw new NotImplementedError('InterfaceTypeAnnotation');

    case 'IntersectionTypeAnnotation':
      // TODO
      throw new NotImplementedError('IntersectionTypeAnnotation');

    case 'MixedTypeAnnotation':
      return tsUnknownKeyword();

    case 'NullLiteralTypeAnnotation':
      return tsNullKeyword();

    case 'NullableTypeAnnotation': {
      const type = convertFlowType(node.typeAnnotation);

      return tsUnionType([
        ...insertIf(!isTSNullKeyword(type), type),
        tsNullKeyword(),
        tsUndefinedKeyword(),
      ]);
    }

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
      throw new NotImplementedError(`${(node as FlowType).type} not implemented`);
  }
}
