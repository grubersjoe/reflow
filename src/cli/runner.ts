import { transformFileSync } from '@babel/core';
import chalk from 'chalk';
import glob from 'glob';
import { statSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import { logError, logPluginWarning } from '../util/log';
import { Stats, sortNumberMap } from '../plugin/util/stat';
import { PluginWarnings } from '../plugin/util/warning';
import { getTransformOptions } from '../plugin/options';
import { formatOutputCode } from '../plugin/util/format';

export interface RunnerArgs {
  dryRun?: boolean;
  globPattern: string;
  verbose?: boolean;
  stats?: boolean;
  src: string[];
}

function getGlobOptions(options: object): object {
  const defaults = {
    absolute: true,
    ignore: 'node_modules/**',
    strict: true,
  };

  return Object.assign(defaults, options);
}

function transpileFiles(args: RunnerArgs): void {
  const { globPattern, src, verbose } = args;

  const babelOptions = getTransformOptions({ verbose });

  src.forEach(src => {
    const isDir = statSync(src).isDirectory();
    const globOptions = getGlobOptions({ cwd: src });

    // Create a list of to be transpiled files
    const fileList = isDir ? glob.sync(globPattern, globOptions) : [resolve(src)];

    fileList.forEach(filePath => {
      const out = transformFileSync(filePath, babelOptions);

      if (out === null || !out.code) {
        logError(`Unable to transpile ${filePath}`);
      } else {
        // FIXME: do this correctly
        const tsFilePath = filePath.replace('.js', '.tsx');

        try {
          writeFileSync(tsFilePath, formatOutputCode(out.code, filePath));
          console.log(chalk.magenta(`Transpiling ${filePath}...`));
          // unlinkSync(filePath);
        } catch (error) {
          throw error;
        }
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
