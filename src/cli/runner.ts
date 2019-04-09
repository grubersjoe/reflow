import { transformFileSync } from '@babel/core';
import chalk from 'chalk';
import { renameSync, statSync, writeFileSync } from 'fs';
import glob, { IOptions as GlobOptions } from 'glob';
import { extname, resolve } from 'path';

import { logError, logPluginWarning } from '../util/log';
import { Stats, sortNumberMap } from '../plugin/util/stat';
import { PluginWarnings } from '../plugin/util/warning';
import { getTransformOptions } from '../plugin/options';
import { formatOutputCode } from '../plugin/util/format';

export interface RunnerArgs {
  excludeDirs: string[];
  includePattern: string;
  src: string[];
  verbose?: boolean;
  write?: boolean;
}

function getGlobOptions(options: GlobOptions, excludeDirs: string[]): GlobOptions {
  const defaults = {
    absolute: true,
    strict: true,
  };

  if (excludeDirs.length > 0) {
    options.ignore = `**/*(${excludeDirs.join('|')})/**/*`;
  }

  console.log(options.ignore);

  return Object.assign(defaults, options);
}

function transpileFiles(args: RunnerArgs): void {
  const { excludeDirs, includePattern, src, verbose, write } = args;

  const babelOptions = getTransformOptions({ verbose });

  src.forEach(src => {
    const isDir = statSync(src).isDirectory();
    const globOptions = getGlobOptions({ cwd: src }, excludeDirs);

    // Create a list of to be transpiled files
    const inputFiles = isDir ? glob.sync(includePattern, globOptions) : [resolve(src)];

    inputFiles.forEach(inputFile => {
      const out = transformFileSync(inputFile, babelOptions);

      if (out === null || !out.code) {
        logError(`Unable to transpile ${inputFile}`);
      } else {
        const tsFile = inputFile.replace(extname(inputFile), '.tsx');

        if (write) {
          renameSync(inputFile, tsFile);
        }

        writeFileSync(tsFile, formatOutputCode(out.code, tsFile));
        console.log(chalk.magenta(`Transpiling ${inputFile}...`));
      }
    });

    PluginWarnings.getWarnings().forEach(logPluginWarning);

    if (verbose && Stats.typeCounter.getCounter().size) {
      console.log(sortNumberMap(Stats.typeCounter.getCounter()));
    }
  });
}

export function run(args: RunnerArgs): void {
  transpileFiles(args);
}
