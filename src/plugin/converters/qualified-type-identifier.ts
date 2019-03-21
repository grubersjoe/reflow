import {
  QualifiedTypeIdentifier,
  TSQualifiedName,
  tsQualifiedName,
  isQualifiedTypeIdentifier,
} from '@babel/types';

export function getQualifiedName(q: QualifiedTypeIdentifier): TSQualifiedName {
  const { id, qualification } = q;

  return tsQualifiedName(
    isQualifiedTypeIdentifier(qualification) ? getQualifiedName(qualification) : qualification,
    id,
  );
}
