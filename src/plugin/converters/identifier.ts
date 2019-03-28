import {
  Identifier,
  QualifiedTypeIdentifier,
  TSQualifiedName,
  isIdentifier,
  isQualifiedTypeIdentifier,
  tsQualifiedName,
} from '@babel/types';

export function convertIdentifier(
  node: Identifier | QualifiedTypeIdentifier,
): Identifier | TSQualifiedName {
  if (isIdentifier(node)) {
    return node;
  }

  const { qualification } = node;

  return tsQualifiedName(
    isQualifiedTypeIdentifier(qualification) ? convertIdentifier(qualification) : qualification,
    node.id,
  );
}
