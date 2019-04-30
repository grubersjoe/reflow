
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

// declare interface DeclaredInterface<T> {
//   (data: T, headers?: {}): {};
// }

// // @ts-ignore
// declare module 'declared-es-module' {
//   var declaredESModuleVar: string;
//   export var declaredESModuleExportedVar: Date | null | undefined;

//   // let foo = () => typeof declaredESModuleVar;

//   // export default foo;
// }

// // @ts-ignore
// declare module 'declared-commonjs-module' {
//   function compare(x: string, y: string): boolean;

//   export = compare;
// }
