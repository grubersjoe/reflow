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
} from '@babel/types';
import { insertIf } from '../../util/array';

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
    console.log(path.type);
  }

  if (path.isFunctionTypeAnnotation()) {
    console.log(path.type);
  }

  if (path.isGenericTypeAnnotation()) {
    console.log(path.type);
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
    console.log(path.type);
  }

  // REVIEW: maybe unnecessary
  if (path.isStringLiteralTypeAnnotation()) {
    return tsStringKeyword();
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
    console.log(path.type);
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
