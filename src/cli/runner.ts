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
import { DEFAULT_EXCLUDE_DIRECTORIES, DEFAULT_INCLUDE_PATTERN } from '.';

export interface CommandLineArgs extends ReflowOptions {
  dryRun?: boolean;
  excludeDirs?: string[];
  includePattern?: string;
  replace?: boolean;
  sources: string[];
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

export function transpileFiles(args: CommandLineArgs): string[] {
  const writtenFiles: string[] = [];
  const { dryRun, replace, replaceDecorators, sources, verbose } = args;

  const excludeDirs = args.excludeDirs || DEFAULT_EXCLUDE_DIRECTORIES;
  const includePattern = args.includePattern || DEFAULT_INCLUDE_PATTERN;

  const babelOptions = getTransformOptions({
    pluginOptions: {
      replaceDecorators,
      verbose,
    },
  });

  sources.forEach(source => {
    const isDir = statSync(source).isDirectory();
    const globOptions = getGlobOptions({ cwd: source }, excludeDirs);

    // Create a list of to be transpiled files
    const inputFiles = isDir ? glob.sync(includePattern, globOptions) : [resolve(source)];

    inputFiles.forEach(inputFile => {
      console.log(chalk.magenta(`Transpiling ${inputFile}...`));
      const out = transformFileSync(inputFile, babelOptions);

      if (out === null || !out.code) {
        logError(`Unable to transpile ${inputFile}`, 4);
      } else {
        const fileExtension = Metrics.fileTypes.get(inputFile) || '.ts';
        const tsFile = inputFile.replace(extname(inputFile), fileExtension);

        const formattedOutput = postProcessOutputCode(out.code, readFileSync(inputFile));

        if (dryRun) {
          console.log(formattedOutput);
          printRuler();
        } else {
          if (replace) {
            renameSync(inputFile, tsFile);
          }

          writeFileSync(tsFile, formattedOutput);
          writtenFiles.push(tsFile);
        }
      }
    });

    PluginWarnings.getWarnings().forEach(logPluginWarning);

    if (verbose && Metrics.typeCounter.getCounter().size) {
      console.log(sortNumberMap(Metrics.typeCounter.getCounter()));
    }
  });

  return writtenFiles;
}
