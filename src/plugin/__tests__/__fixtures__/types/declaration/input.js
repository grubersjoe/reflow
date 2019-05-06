// @flow
declare var declaredVar: number;

declare type DeclaredType = ?number;
declare type DeclaredTypeWithGeneric<T> = {
  data: T,
  loading: boolean,
  error?: Error,
};

declare function declaredFunction(x: number): string;
declare function declaredFunctionWithoutParamName(boolean): void;
declare type DeclaredArrowFunction = (...nums: Array<number>) => number;

declare class DeclaredClass {
  constructor(p: string): number;
  toString(): string;
  genericMethod<T1, T2>(p: T1): T2;
  static method(x: DeclaredClass, y: DeclaredClass): boolean;
}

declare class DeclaredChildClass<T> extends Set<T> {
  data: Set<T>;
  constructor(string): Set<T>;
}

declare interface DeclaredInterface<T> {
  p: T;
  q?: number;
  f(x: number): string;
}

declare module 'declared-es-module' {
  declare var declaredESModuleVar: string;
  declare function delcaredESModuleFunction(): null;

  declare export var declaredESModuleExportedVar: ?Date;
  declare export function declaredESModuleExportedFunction(p: ?number): number;

  declare class declaredESModuleClass {
    toString(): string;
  }
  declare export class declaredESModuleExportedClass {
    toString(): string;
  }

  declare interface declaredESModuleInterface {
    toString(): string;
  }
  declare export interface declaredESModuleExportedInterface {
    toString(): string;
  }

  declare export default () => string;
}
