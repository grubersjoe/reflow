import { transformSync, TransformOptions } from '@babel/core';
import chalk from 'chalk';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

import { printRuler, printError } from '../util/printer';
import { getBabelOptions } from './babel-config';

export interface RunnerArgs {
  dryRun?: boolean;
  globPattern: string;
  verbose?: boolean;
  src: string[];
}

function transpileFile(filePath: string, options: TransformOptions, verbose = false): void {
  fs.readFile(filePath, function(err: NodeJS.ErrnoException, data: Buffer) {
    console.log(chalk.magenta(`Transpiling ${filePath}...`));

    if (err) throw err;

    const src = data.toString();
    const out = transformSync(src, options);

    if (out) {
      if (verbose) {
        console.log(src.trim());
        printRuler();
        console.log(out.code);

        console.log('');
        printRuler('+');
        console.log('');
      }
    } else {
      printError(`Unable to transpile ${filePath}`);
    }
  });
}

function getGlobOptions(options: object): object {
  const defaults = {
    ignore: 'node_modules/**',
    strict: true,
  };

  return Object.assign({}, defaults, options);
}

export function run(args: RunnerArgs): void {
  const { verbose } = args;
  const babelOptions = getBabelOptions();

  args.src.forEach(src => {
    fs.stat(src, (err, stats) => {
      if (err) throw err;

      if (stats.isFile()) {
        transpileFile(src, babelOptions, verbose);
      } else {
        const options = getGlobOptions({ cwd: src });

        glob(args.globPattern, options, (err: Error, files: string[]) => {
          if (err) throw err;

          files.forEach(file => {
            const filePath = path.join(src, file);
            transpileFile(filePath, babelOptions, verbose);
          });
        });
      }
    });
  });
}
