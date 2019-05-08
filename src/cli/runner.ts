import { transformFileSync } from '@babel/core';
import chalk from 'chalk';
import { renameSync, statSync, writeFileSync, readFileSync } from 'fs';
import glob, { IOptions as GlobOptions } from 'glob';
import { extname, resolve } from 'path';

import { logError, logPluginWarning, printRuler } from '../util/log';
import { Metrics, sortNumberMap } from '../plugin/util/metric';
import { PluginWarnings } from '../plugin/util/warning';
import { getTransformOptions } from '../plugin/options';
import { postProcessOutputCode } from '../plugin/util/format';

import { ReflowOptions } from '../plugin/';

export interface CliArgs extends ReflowOptions {
  dryRun?: boolean;
  excludeDirs: string[];
  includePattern: string;
  src: string[];
  replace?: boolean;
}

function getGlobOptions(options: GlobOptions, excludeDirs: string[]): GlobOptions {
  const defaults = {
    absolute: true,
    strict: true,
  };

  if (excludeDirs.length > 0) {
    options.ignore = `**/*(${excludeDirs.join('|')})/**/*`;
  }

  return Object.assign(defaults, options);
}

function transpileFiles(args: CliArgs): void {
  const { dryRun, excludeDirs, includePattern, src, replace, replaceDecorators, verbose } = args;

  const babelOptions = getTransformOptions({
    pluginOptions: {
      replaceDecorators,
      verbose,
    },
  });

  src.forEach(src => {
    const isDir = statSync(src).isDirectory();
    const globOptions = getGlobOptions({ cwd: src }, excludeDirs);

    // Create a list of to be transpiled files
    const inputFiles = isDir ? glob.sync(includePattern, globOptions) : [resolve(src)];

    inputFiles.forEach(inputFile => {
      console.log(chalk.magenta(`Transpiling ${inputFile}...`));
      const out = transformFileSync(inputFile, babelOptions);

      if (out === null || !out.code) {
        logError(`Unable to transpile ${inputFile}`);
      } else {
        const fileExt = Metrics.jsxFiles.has(inputFile) ? '.tsx' : '.ts';
        const tsFile = inputFile.replace(extname(inputFile), fileExt);

        const formattedOutput = postProcessOutputCode(out.code, readFileSync(inputFile));

        if (dryRun) {
          console.log(formattedOutput);
          printRuler();
        } else {
          if (replace) {
            renameSync(inputFile, tsFile);
          }

          writeFileSync(tsFile, formattedOutput);
        }
      }
    });

    PluginWarnings.getWarnings().forEach(logPluginWarning);

    if (verbose && Metrics.typeCounter.getCounter().size) {
      console.log(sortNumberMap(Metrics.typeCounter.getCounter()));
    }
  });
}

export function run(args: CliArgs): void {
  transpileFiles(args);
}
