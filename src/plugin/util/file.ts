import { parse } from '@babel/parser';
import { Comment } from '@babel/types';
import { relative, resolve } from 'path';
import { cwd } from 'process';

import { getParserPlugins } from '../options';
import { BLANK_LINE, LINE_BREAK } from './format';

export function relativePath(...pathSegments: string[]): string {
  return relative(cwd(), resolve(...pathSegments));
}

export function splitFixtureLines(
  code: string,
  type: 'flow' | 'typescript',
  ignoreFormat = true,
): string[] {
  const ast = parse(code, {
    plugins: [...getParserPlugins(), type],
    sourceType: 'module',
  });

  if (ignoreFormat) {
    // Delete comments
    (ast.comments as Comment[]).forEach(comment => {
      if (comment.type === 'CommentBlock') {
        code = code.replace(`/*${comment.value}*/`, '');
      }

      if (comment.type === 'CommentLine') {
        code = code.replace(`//${comment.value}`, '');
      }
    });
  }

  return code
    .trim()
    .split(LINE_BREAK)
    .filter(line => !(ignoreFormat && BLANK_LINE.test(line)))
    .map(line => line.trim());
}
