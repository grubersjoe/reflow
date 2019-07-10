import { existsSync, lstatSync } from 'fs';
import { extname } from 'path';

import { logError } from '../util/log';

const VALID_SOURCE_FILETYPES = ['.js', '.jsx'];

export function toArray(...values: unknown[]): string[] {
  return values.filter(val => typeof val === 'string') as string[];
}

export function isValidSource(...source: string[]): boolean {
  try {
    return source
      .filter(source => lstatSync(source).isFile())
      .every(source => VALID_SOURCE_FILETYPES.includes(extname(source)));
  } catch (err) {
    return false;
  }
}

// Validate all arguments (all input files or directories)
export function validateArgs(source: string[]): boolean {
  if (source.length === 0) {
    logError('No input directories or files given');
    return false;
  }

  const allSourcesExist = source.every(source => existsSync(source));

  if (!allSourcesExist) {
    logError('Not all input directories or files exist');
  }

  const validSource = isValidSource(...source);

  if (!validSource) {
    const fileTypes = VALID_SOURCE_FILETYPES.join(' and ');
    logError(`Invalid source file type. Only ${fileTypes} files are allowed as input!`);
  }

  return allSourcesExist && validSource;
}
