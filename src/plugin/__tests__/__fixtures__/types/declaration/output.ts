
declare var declaredVar: number;

declare type DeclaredType = number | null | undefined;
declare type DeclaredTypeWithGeneric<T> = {
  data: T;
  loading: boolean;
  error?: Error;
};

declare function declaredFunction(x: number): string;
declare type DeclaredArrowFunction = (...nums: Array<number>) => number;

declare class DeclaredClass {
  constructor(p: string);
  toString(): string;
  genericMethod<T1, T2>(p: T1): T2;
  static method(x: DeclaredClass, y: DeclaredClass): boolean;
}

declare class DeclaredChildClass<T> extends Set<T> {
  data: Set<T>;
  constructor(p: string);
}

declare interface DeclaredInterface<T> {
  p: T;
  q?: number;
  f(x: number): string;
}

declare module 'declared-es-module' {
  var declaredESModuleVar: string;
  function delcaredESModuleFunction(): null;

  export var declaredESModuleExportedVar: Date | null | undefined;
  export function declaredESModuleExportedFunction(p: number | null | undefined): number;


  class declaredESModuleClass {
    toString(): string;
  }
  export class declaredESModuleExportedClass {
    toString(): string;
  }

  interface declaredESModuleInterface {
    toString(): string;
  }
  export interface declaredESModuleExportedInterface {
    toString(): string;
  }

  const _default: () => string;
  export default _default;
}
