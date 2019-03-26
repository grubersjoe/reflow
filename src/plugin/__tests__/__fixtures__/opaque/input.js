// @flow
opaque type OpaqueType = number;

class D extends Date {}
opaque type OpaqueTypeWithSubtypingConstraint: Date = D;

opaque type OpaqueTypeWithGenerics<T1, T2> = {
  p1: T1,
  p2: T2,
};

// Type is omitted here!
declare opaque type OpaqueTypeDeclaration;

export opaque type ExportedOpaqueType = string;
export opaque type ExportedOpaqueTypeWithSubtypingConstraint: Date = D;
