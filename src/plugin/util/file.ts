import { relative, resolve } from 'path';
import { cwd } from 'process';

export type TSFileExtension = '.ts' | '.tsx' | '.d.ts';

// Used to keep track what TyepScript extension output files need to get
export const FileTypes = new Map<string, TSFileExtension>();

export function relativePath(...pathSegments: string[]): string {
  return relative(cwd(), resolve(...pathSegments));
}
