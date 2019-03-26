
type OpaqueType = number;

class D extends Date {}
type OpaqueTypeWithSubtypingConstraint = D;

type OpaqueTypeWithGenerics<T1, T2> = {
  p1: T1;
  p2: T2;
};

// Using any for omitted type
declare type OpaqueTypeDeclaration = any;

export type ExportedOpaqueType = string;
export type ExportedOpaqueTypeWithSubtypingConstraint = D;
