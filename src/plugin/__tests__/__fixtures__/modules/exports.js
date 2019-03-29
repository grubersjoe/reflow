// @flow
export class ExportedClass {}
export const exportedConstNumber: number = 3;
export const exportedConstObject = {
  x: null
};
export const exportedConstMaybe: ?string = 'string';
export function exportedFunction(x: number): void {}
export interface ExportedInterface {}
export type ExportedAliasType<T> = Array<T>;

export default class DefaultExport {};
