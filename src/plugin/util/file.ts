import { relative, resolve } from 'path';
import { cwd } from 'process';

import { BLANK_LINE, LINE_BREAK, LINE_COMMENTS, BLOCK_COMMENTS } from './format';

export function relativePath(...pathSegments: string[]): string {
  return relative(cwd(), resolve(...pathSegments));
}

export function splitFixtureLines(code: Buffer | string, filter = true): string[] {
  code = code.toString().trim();

  if (filter) {
    code = code.replace(BLOCK_COMMENTS, '');
    code = code.replace(LINE_COMMENTS, '');
  }

  return code
    .split(LINE_BREAK)
    .filter(line => !(filter && BLANK_LINE.test(line)))
    .map(line => line.trim());
}
