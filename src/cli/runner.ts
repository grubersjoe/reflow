import { transformFileSync } from '@babel/core';
import { readFileSync, statSync, unlinkSync, writeFileSync } from 'fs';
import glob, { IOptions as GlobOptions } from 'glob';
import { extname, resolve } from 'path';

import { FileTypes } from '../plugin/util/file';
import { logError, printRuler } from '../util/log';
import { formatOutputCode } from './util/format';
import { getTransformOptions } from '../plugin/util/options';

import { ReflowOptions } from '../plugin';
import { isValidSource } from './util';
import {
  CommandLineArgs,
  DEFAULT_EXCLUDE_DIRECTORIES,
  DEFAULT_INCLUDE_PATTERN,
} from '.';

function getGlobOptions(
  options: GlobOptions,
  excludeDirs: string[],
): GlobOptions {
  const defaults: GlobOptions = {
    absolute: true,
    strict: true,
  };

  console.log({
    ...defaults,
    ...options,
    ...(excludeDirs.length > 0 && {
      ignore: `**/*(${excludeDirs.join('|')})/**/*`,
    }),
  });

  return {
    ...defaults,
    ...options,
    ...(excludeDirs.length > 0 && {
      ignore: `**/*(${excludeDirs.join('|')})/**/*`,
    }),
  };
}

export function transpileFiles(args: CommandLineArgs): string[] {
  const { dryRun, replace, replaceDecorators, sources } = args;

  console.log(args);

  const excludeDirs = args.excludeDirs || DEFAULT_EXCLUDE_DIRECTORIES;
  const includePattern = args.includePattern || DEFAULT_INCLUDE_PATTERN;

  const pluginOptions: ReflowOptions = { replaceDecorators };
  const babelOptions = getTransformOptions({ pluginOptions });

  const writtenFiles: string[] = [];

  sources.forEach(source => {
    const isDir = statSync(source).isDirectory();
    const globOptions = getGlobOptions({ cwd: source }, excludeDirs);

    // Create a list of to be transpiled files
    const inputFiles = isDir
      ? glob.sync(includePattern, globOptions)
      : [resolve(source)];

    inputFiles.forEach(inputFile => {
      // Skip all invalid sources (files that match the include glob pattern, but are not JS)
      if (!isValidSource(inputFile)) {
        return;
      }

      console.log(`Transpiling ${inputFile}...`);

      try {
        const out = transformFileSync(inputFile, babelOptions);

        if (out === null || !out.code) {
          logError(`Unable to transpile ${inputFile}`, 4);
        } else {
          const outputFile = process.env.DEBUG
            ? inputFile
            : inputFile.replace(
                extname(inputFile),
                FileTypes.get(inputFile) || '.ts',
              );

          const originalCode = String(readFileSync(inputFile));
          const output = formatOutputCode(
            out.code,
            originalCode,
            pluginOptions,
          );

          if (output instanceof Error) {
            logError(`${inputFile} could not be formatted. Skipping.`, 4);
            logError(output.message, 4);
            return;
          }

          if (dryRun) {
            console.log(output);
            printRuler();
          } else {
            if (replace) {
              unlinkSync(inputFile);
            }

            writeFileSync(outputFile, output);
            writtenFiles.push(outputFile);
          }
        }
      } catch (error) {
        logError(`${inputFile} could not be transpiled. Skipping.`, 4);
        logError(error.message, 4);
      }
    });
  });

  return writtenFiles;
}
