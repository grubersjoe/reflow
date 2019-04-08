
import { ExportedAliasType, ExportedClass as TypeAlias } from './exports';
import { ExportedInterface as ExportTypeAlias } from './exports';
import DefaultImportType from './exports';

import { exportedConstMaybe, exportedFunction as ExportedFunctionType } from './exports';
import { exportedConstObject } from './exports';
import DefaultImportTypeof from './exports';

import DefaultImport from './exports';
import DefaultImportWithWildcard, * as WildcardAlias from './exports';
import DefaultImportWithNamedImport, { ExportedClass } from './exports';
import * as WildcardAlias2 from './exports';
import { exportedConstNumber } from './exports';
import { ExportedClass as ExportAliasClass, exportedFunction } from './exports';
import './exports';

const exportedConstMaybeVar1: typeof exportedConstMaybe = 'string';
const exportedConstMaybeVar2: typeof exportedConstMaybe = null;
const exportedFunctionVar: typeof ExportedFunctionType = () => undefined;

const exportedConstObjectVar: typeof exportedConstObject = {
  x: null
};

function defaultImports(constructor: typeof DefaultImportTypeof): DefaultImportType {
  return new constructor();
}

export * from './exports';
export { DefaultImport as default };
export { ExportedAliasType, ExportedInterface } from './exports';
export { ExportedClass as ExportAlias } from './exports';

export class ExportedClass2 {}
export const exportedConstNumber2: unknown = 3;
export const exportedConstMaybe2: string | null | undefined = 'string';
export function exportedFunction2(x: number): void {}
export interface ExportedInterface2 {}
export type ExportedAliasType2<T> = ReadonlyArray<T>;
