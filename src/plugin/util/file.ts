import { relative, resolve } from 'path';
import { cwd } from 'process';

import { BLANK_LINE, LINE_BREAK } from './format';

export function relativePath(...pathSegments: string[]): string {
  return relative(cwd(), resolve(...pathSegments));
}

const LINE_COMMENT = /^\s*\/\/.*/;

export function splitFixtureLines(code: Buffer | string): string[] {
  return code
    .toString()
    .split(LINE_BREAK)
    .filter(line => !BLANK_LINE.test(line) && !LINE_COMMENT.test(line));
}
