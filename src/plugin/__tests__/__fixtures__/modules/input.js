// @flow
import type { ExportedAliasType, ExportedClass as TypeAlias } from './exports';
import type { ExportedInterface as ExportTypeAlias } from './exports';
import type DefaultImportType from './exports';

import typeof { exportedConstMaybe, exportedFunction as ExportedFunctionType} from './exports';
import { typeof exportedConstObject } from './exports';
import typeof DefaultImportTypeof from './exports';

import DefaultImport from './exports';
import DefaultImportWithWildcard, * as WildcardAlias from './exports';
import DefaultImportWithNamedImport, { ExportedClass } from './exports';
import * as WildcardAlias2 from './exports';
import { exportedConstNumber } from './exports';
import { ExportedClass as ExportAliasClass, exportedFunction } from './exports';
import './exports';

const exportedConstMaybeVar1: exportedConstMaybe = 'string';
const exportedConstMaybeVar2: exportedConstMaybe = null;
const exportedFunctionVar: ExportedFunctionType = () => undefined;

const exportedConstObjectVar: exportedConstObject = {
  x: null,
};

function defaultImports(constructor: DefaultImportTypeof): DefaultImportType {
  return new constructor();
}

export * from './exports';
export { DefaultImport as default };
export { ExportedAliasType, ExportedInterface } from './exports';
export { ExportedClass as ExportAlias } from './exports';

export class ExportedClass2 {}
export const exportedConstNumber2: mixed = 3;
export const exportedConstMaybe2: ?string = 'string';
export function exportedFunction2(x: number): void {}
export interface ExportedInterface2 {}
export type ExportedAliasType2<T> = $ReadOnlyArray<T>;
