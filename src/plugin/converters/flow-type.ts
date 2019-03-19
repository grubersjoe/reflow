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
  tsNullKeyword,
  tsNumberKeyword,
  tsStringKeyword,
  tsTypeReference,
  tsUndefinedKeyword,
  tsUnionType,
  tsUnknownKeyword,
  tsVoidKeyword,
} from '@babel/types';
import chalk from 'chalk';

import { insertIf } from '../../util/array';
import { convertObjectTypeAnnotation } from './object-type-annotation';
import { convertTypeParameterInstantiation } from './type-parameter';
import { convertTypeofTypeAnnotation } from './typeof-type-annotation';

export function convertFlowType(node: FlowType): TSType {
  const { type } = node;

  switch (node.type) {
    case 'AnyTypeAnnotation':
      return tsAnyKeyword();

    case 'ArrayTypeAnnotation':
      return tsArrayType(convertFlowType(node.elementType));

    case 'BooleanLiteralTypeAnnotation':
      return tsLiteralType(booleanLiteral(node.value));

    case 'BooleanTypeAnnotation':
      return tsBooleanKeyword();

    // Undocumented
    case 'EmptyTypeAnnotation':
      console.log(chalk.red(`TODO, ${type}`));
      return tsUnknownKeyword();

    // = Existential Type?
    case 'ExistsTypeAnnotation':
      console.log(chalk.red(`TODO, ${type}`));
      return tsUnknownKeyword();

    case 'FunctionTypeAnnotation':
      console.log(chalk.red(`TODO, ${type}`));
      return tsUnknownKeyword();

    case 'GenericTypeAnnotation': {
      const typeParameters = node.typeParameters
        ? convertTypeParameterInstantiation(node.typeParameters)
        : null;

      return tsTypeReference(node.id as TSEntityName, typeParameters);
    }

    case 'InterfaceTypeAnnotation':
      console.log(chalk.red(`TODO, ${type}`));
      return tsUnknownKeyword();

    case 'IntersectionTypeAnnotation':
      console.log(chalk.red(`TODO, ${type}`));
      return tsUnknownKeyword();

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
      console.log(chalk.red(`TODO, ${type}`));
      return tsUnknownKeyword();

    case 'TupleTypeAnnotation':
      console.log(chalk.red(`TODO, ${type}`));
      return tsUnknownKeyword();

    case 'TypeofTypeAnnotation': {
      return convertTypeofTypeAnnotation(node);
    }

    case 'UnionTypeAnnotation':
      return tsUnionType(node.types.map(type => convertFlowType(type)));

    case 'VoidTypeAnnotation':
      return tsVoidKeyword();
  }
}
