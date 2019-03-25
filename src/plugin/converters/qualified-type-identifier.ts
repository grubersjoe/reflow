import {
  QualifiedTypeIdentifier,
  TSQualifiedName,
  isQualifiedTypeIdentifier,
  tsQualifiedName,
} from '@babel/types';

export function convertQualifiedTypeIdentifier(q: QualifiedTypeIdentifier): TSQualifiedName {
  const { id, qualification } = q;

  return tsQualifiedName(
    isQualifiedTypeIdentifier(qualification)
      ? convertQualifiedTypeIdentifier(qualification)
      : qualification,
    id,
  );
}
