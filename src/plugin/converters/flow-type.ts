import { NodePath } from '@babel/traverse';
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
} from '@babel/types';
import chalk from 'chalk';

export function convertFlowType(path: NodePath<FlowType>): TSType {
  if (path.isAnyTypeAnnotation()) {
    return tsAnyKeyword();
  }

  if (path.isArrayTypeAnnotation()) {
    return convertFlowType(path.get('elementType'));
  }

  if (path.isBooleanTypeAnnotation()) {
    return tsBooleanKeyword();
  }

  if (path.isBooleanLiteralTypeAnnotation()) {
    console.log(path.type);
  }

  if (path.isNullLiteralTypeAnnotation()) {
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
    const tsNullableType = tsUnionType([
      convertFlowType(path.get('typeAnnotation')),
      tsNullKeyword(),
      tsUndefinedKeyword(),
    ]);

    if (path.get('typeAnnotation').isArrayTypeAnnotation()) {
      return tsArrayType(tsNullableType);
    }

    return tsNullableType;
  }

  if (path.isNumberTypeAnnotation()) {
    return tsNumberKeyword();
  }

  if (path.isObjectTypeAnnotation()) {
    console.log(path.type);
  }

  // TODO: maybe unnecessary
  if (path.isStringLiteralTypeAnnotation()) {
    console.log(path.type, path.node.value);
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
