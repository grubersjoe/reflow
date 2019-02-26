import { transformSync } from '@babel/core';
import chalk from 'chalk';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

import OverflowPlugin from '../plugin';
import { printHeading } from '../util/printer';

export interface RunnerArgs {
  dryRun?: boolean;
  globPattern: string;
  verbose?: boolean;
  src: string[];
}

function getGlobOptions(options: object): object {
  const defaults = {
    ignore: 'node_modules/**',
    strict: true,
  };

  return Object.assign({}, defaults, options);
}

function transpileFile(filePath: string): void {
  fs.readFile(filePath, function(err: NodeJS.ErrnoException, data: Buffer) {
    console.log(chalk.magenta(`Transpiling ${filePath}...`));

    if (err) throw err;

    const src = data.toString();
    const out = transformSync(src, {
      configFile: false,
      plugins: [OverflowPlugin],
    });

    printHeading('Input');
    console.log(src.trim());

    console.log('─'.repeat(80));
    printHeading('Output');

    if (out) {
      console.log(out.code);
    } else {
      console.error('Unable to transform the code!');
    }
  });
}

export function run(args: RunnerArgs): void {
  console.log(args);

  args.src.forEach(src => {
    fs.stat(src, (err, stats) => {
      if (err) throw err;

      if (stats.isFile()) {
        transpileFile(src);
      } else {
        const options = getGlobOptions({ cwd: src });

        glob(args.globPattern, options, (err: Error, files: string[]) => {
          if (err) throw err;
          files.forEach(file => transpileFile(path.join(src, file)));
        });
      }
    });
  });
}
