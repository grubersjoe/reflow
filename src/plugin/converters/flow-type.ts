import { NodePath } from '@babel/traverse';
import chalk from 'chalk';

import {
  FlowType,
  tsNumberKeyword,
  TSType,
  tsAnyKeyword,
  tsUnionType,
  tsUndefinedKeyword,
  tsBooleanKeyword,
  tsStringKeyword,
  tsVoidKeyword,
  tsArrayType,
  tsNullKeyword,
  isTSNullKeyword,
  tsTypeReference,
  tsLiteralType,
  stringLiteral,
  booleanLiteral,
  TSEntityName,
} from '@babel/types';
import { insertIf } from '../../util/array';
import { convertTypeParameterInstantiation } from './type-parameter';
import { convertObjectTypeAnnotation } from './object-type-annotation';

export function convertFlowType(path: NodePath<FlowType>): TSType {
  if (path.isAnyTypeAnnotation()) {
    return tsAnyKeyword();
  }

  if (path.isArrayTypeAnnotation()) {
    return tsArrayType(convertFlowType(path.get('elementType')));
  }

  if (path.isBooleanTypeAnnotation()) {
    return tsBooleanKeyword();
  }

  if (path.isBooleanLiteralTypeAnnotation()) {
    return tsLiteralType(booleanLiteral(path.node.value));
  }

  if (path.isFunctionTypeAnnotation()) {
    console.log(path.type);
  }

  if (path.isGenericTypeAnnotation()) {
    const { id } = path.node;
    const typeParametersPath = path.get('typeParameters');

    const typeParameters = typeParametersPath.isTypeParameterInstantiation()
      ? convertTypeParameterInstantiation(typeParametersPath)
      : null;

    return tsTypeReference(id as TSEntityName, typeParameters);
  }

  if (path.isInterfaceDeclaration()) {
    console.log(path.type);
  }

  if (path.isIntersectionTypeAnnotation()) {
    console.log(path.type);
  }

  if (path.isMixedTypeAnnotation()) {
    console.log(path.type);
  }

  if (path.isNullableTypeAnnotation()) {
    const type = convertFlowType(path.get('typeAnnotation'));

    return tsUnionType([
      ...insertIf(!isTSNullKeyword(type), type),
      tsNullKeyword(),
      tsUndefinedKeyword(),
    ]);
  }

  if (path.isNullLiteralTypeAnnotation()) {
    return tsNullKeyword();
  }

  if (path.isNumberTypeAnnotation()) {
    return tsNumberKeyword();
  }

  if (path.isObjectTypeAnnotation()) {
    return convertObjectTypeAnnotation(path);
  }

  if (path.isStringLiteralTypeAnnotation()) {
    return tsLiteralType(stringLiteral(path.node.value));
  }

  if (path.isStringTypeAnnotation()) {
    return tsStringKeyword();
  }

  if (path.isThisTypeAnnotation()) {
    console.log(path.type);
  }

  if (path.isTupleTypeAnnotation()) {
    console.log(path.type);
  }

  if (path.isTypeofTypeAnnotation()) {
    console.log(path.type, path.node.type);
  }

  if (path.isUnionTypeAnnotation()) {
    console.log(path.type);
  }

  if (path.isVoidTypeAnnotation()) {
    return tsVoidKeyword();
  }

  console.log(chalk.red('NOPE\n'));
  return tsAnyKeyword();
}
