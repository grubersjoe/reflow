import { traverse } from '@babel/core';
import { parse } from '@babel/parser';
import { File, Comment, Decorator } from '@babel/types';
import prettier, { Options as PrettierOptions } from 'prettier-reflow';

import { ReflowOptions } from '../../plugin';
import { getParserPlugins } from '../../plugin/util/options';
import { logError } from '../../util/log';

export const BLANK_LINE = /^[ \t]*$/;
export const LINE_BREAK = /\r?\n/;

const BLOCK_COMMENT_AT_BEGINNING_OF_LINE = /^\s*\/\*/;
const JSX_COMMENT = /\{\s*\/\*.*\*\/\s*\}/;
const LINE_COMMENT_AT_BEGINNING_OF_LINE = /^\s*\/\/.*$/;

const FLOW_DIRECTIVE = /(@flow(\s+(strict(-local)?|weak))?|@noflow)/;

function getPrettierConfig(overrides?: PrettierOptions): PrettierOptions {
  const defaults: PrettierOptions = {
    parser: 'typescript',
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
  };

  return Object.assign({}, defaults, overrides);
}

function parseAst(code: string): File {
  return parse(code, {
    plugins: getParserPlugins('flow'),
    sourceType: 'module',
  });
}

function getDecorators(flowAst: File): Decorator[] {
  const decorators: Decorator[] = [];

  traverse(flowAst, {
    enter(path) {
      if (path.isClassDeclaration() && path.node.decorators) {
        decorators.push(...path.node.decorators);
      }
    },
  });

  return decorators;
}

function copyComments(
  outputLines: string[],
  originalLines: string[],
  originalAst: File,
  lineNumber: number,
): string[] {
  const outputLine = outputLines[lineNumber];

  const comment = (originalAst.comments as Comment[]).find(
    comment => comment.loc.start.line - 1 === lineNumber, // lineNumber is zero-based
  );

  if (comment) {
    const originalLine = originalLines[lineNumber];

    if (comment.type === 'CommentBlock') {
      if (BLOCK_COMMENT_AT_BEGINNING_OF_LINE.test(originalLine)) {
        `/*${comment.value}*/`
          .split('\n')
          .reverse()
          .forEach(commentLine => {
            outputLines.splice(lineNumber, 0, commentLine);
          });
      } else if (JSX_COMMENT.test(originalLine)) {
        outputLines[lineNumber] = `{/*${comment.value}*/}`;
      } else {
        outputLines[lineNumber] = `${outputLine} /*${comment.value}*/`;
      }
    }

    if (comment.type === 'CommentLine') {
      const lineComment = `//${comment.value}`;

      if (LINE_COMMENT_AT_BEGINNING_OF_LINE.test(originalLines[lineNumber])) {
        outputLines.splice(lineNumber, 0, lineComment);
      } else {
        outputLines[lineNumber] = `${outputLine} ${lineComment}`;
      }
    }
  }

  return outputLines;
}

/**
 * Since Babel uses an *abstract* synax tree, all information about whitespace
 * is lost after parsing. Also Babel's `retainLines` option is not working as
 * expected and will produce broken syntax in some cases. Neither will Prettier
 * help here, because it does not add additional blank lines:
 *
 * https://prettier.io/docs/en/rationale.html#empty-lines
 *
 * Therefore, the following function tries to synchronize the blank lines and
 * comments of two source code fragments. This means: insert blank lines in
 * given code wherever the original code has them and copy all comments from
 * the source to the output. Comments are also handled here, because Babel does
 * not reliably retain their position in the generated code. This approach
 * naively assumes that all code transformations will result in (roughly) the
 * same amount of lines. It iss not perfect, but the best I came up with and it
 * seems to work reasonably well in practice.
 */
export function syncBlankLinesAndComments(
  outputCode: string,
  originalCode: Buffer | string,
  pluginOptions: ReflowOptions,
): string {
  // Filter out the Flow directive (@flow)
  const originalLines = String(originalCode)
    .split(LINE_BREAK)
    .filter(line => !FLOW_DIRECTIVE.test(line));

  const flowAst = parseAst(originalLines.join('\n'));
  const decoratorList = getDecorators(flowAst);

  let outputLines = outputCode.split(LINE_BREAK);

  originalLines.forEach((flowLine, lineNumber) => {
    if (outputLines[lineNumber] === undefined || flowLine === outputLines[lineNumber]) {
      return;
    }

    // Insert an extra blank line if it's present in original file but not in output
    if (BLANK_LINE.test(flowLine)) {
      outputLines.splice(lineNumber, 0, '');
    }

    // Copy comments from original code to TypeScript output
    outputLines = copyComments(outputLines, originalLines, flowAst, lineNumber);

    // Insert blank lines where decorators have been to keep line count
    // consistent for further loop iterations.Each decorator occupies exactly
    // one line after Prettier has been executed with the options used below
    if (pluginOptions.replaceDecorators) {
      const decorator = decoratorList.find(decorator =>
        decorator.loc ? decorator.loc.start.line - 1 === lineNumber : false,
      );

      if (decorator) {
        outputLines.splice(lineNumber, 0, '');
      }
    }
  });

  return outputLines.join('\n');
}

/**
 * Format the code generated by Babel to make it visually as similar as
 * possible to the original code. This is done by executing Prettier multiple
 * times, inserting blank lines and copying comments from the original source
 * to the output.
 */
export function formatOutputCode(
  outputCode: string,
  originalCode: string,
  pluginOptions: ReflowOptions,
): string | false {
  try {
    // The aim of the first Prettier run is to format the original and the output
    // code as similar as possible by forcing consistent line wraps. To do so an
    // infinite printWidth is used and object literals will always be wrapped
    // into multiple lines (even when they would fit in one line).
    const prettierOptions: PrettierOptions = {
      printWidth: Infinity,
      reflow: true,
    };

    originalCode = prettier.format(
      originalCode,
      getPrettierConfig({
        parser: 'babel',
        ...prettierOptions,
      }),
    );

    outputCode = prettier.format(
      outputCode,
      getPrettierConfig({
        parser: 'typescript',
        ...prettierOptions,
      }),
    );

    outputCode = syncBlankLinesAndComments(outputCode, originalCode, pluginOptions);

    // Run Prettier one more time to iron out any remaining bad formatting.
    outputCode = prettier.format(outputCode, getPrettierConfig());

    return outputCode;
  } catch (error) {
    logError('Exception while formatting generated code. Skipping.', 4);
    logError(error.message, 4);

    return false;
  }
}
