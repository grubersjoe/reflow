import prettier, { Options as PrettierOptions } from 'prettier';
import { readFileSync } from 'fs';

import { FLOW_DIRECTIVE } from '../visitors/program';

export const defaultPrettierConfig: PrettierOptions = {
  trailingComma: 'all',
  semi: true,
  singleQuote: true,
};

export const LINE_BREAK = /\r?\n/;
export const BLANK_LINE = /^[ \t]*$/;

/**
 * Since Babel uses an abstract synax tree, all information about whitespace is
 * lost after parsing. Neither does Prettier help here, because it won't add
 * additional blank lines to improve the visual appearance of the code:
 * https://prettier.io/docs/en/rationale.html#empty-lines
 *
 * Therefore, the following function tries to synchronize the blank lines of
 * two source code fragments. This means: insert blank lines in given code
 * wherever the original code has them and remove superflous blank lines in the
 * output (these are produced by Babel). This naively assumes that all code
 * transformations will result in the same amount of lines.
 *
 * TODO: line comments are generated very strangely and need to be handled too.
 */
export function syncBlankLines(outputCode: string, originalFilePath: string): string {
  const outputLines = outputCode.split(LINE_BREAK);
  const originalLines = readFileSync(originalFilePath)
    .toString()
    .split(LINE_BREAK);

  if (originalLines.length === 0) {
    return outputCode;
  }

  // The Flow directive is removed in the output file
  const lineOffset = FLOW_DIRECTIVE.test(originalLines[0]) ? -1 : 0;

  originalLines.forEach((originalLine, i) => {
    const line = i + lineOffset;
    const outputLine = outputLines[line];

    if (outputLine === undefined) {
      return;
    }

    if (BLANK_LINE.test(originalLine) && !BLANK_LINE.test(outputLine)) {
      // Insert a extra blank line if it's present in original file but not in output
      outputLines.splice(line, 0, '');
    } else if (!BLANK_LINE.test(originalLine) && BLANK_LINE.test(outputLine)) {
      // Remove superflous blank lines in output
      outputLines.splice(line, 1);
    }
  });

  return outputLines.join('\n');
}

/**
 * Use Prettier to format output code.
 * https://prettier.io
 *
 * Moreover blank lines will be inserted wherever the original file has them.
 */
export function formatOutputCode(
  code: string,
  originalFilePath: string,
  prettierOptions: PrettierOptions = defaultPrettierConfig,
): string {
  prettierOptions.parser = 'typescript';
  code = prettier.format(code, prettierOptions);

  return syncBlankLines(code, originalFilePath);
}
