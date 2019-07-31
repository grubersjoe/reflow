import program, { Command } from 'commander';

import pkg from '../../package.json';

import { ReflowOptions } from '../plugin';
import { toArray, validateArgs } from './util';
import { transpileFiles } from './runner';

export interface CommandLineArgs extends ReflowOptions {
  dryRun?: boolean;
  excludeDirs?: string[];
  includePattern?: string;
  replace?: boolean;
  sources: string[];
}

export const DEFAULT_EXCLUDE_DIRECTORIES = ['node_modules'];
export const DEFAULT_INCLUDE_PATTERN = '**/*.{js,jsx}';

// Create the desired argument data structure for the Runner
function collectArgs(program: Command): CommandLineArgs {
  return Object.assign({}, program.opts(), {
    sources: program.args,
  }) as CommandLineArgs;
}

const help = {
  dryRun: 'perform a trial run printing to stdout instead of writing a file',
  excludeDirs: 'comma-separated list of directories to recursively exclude',
  includePattern: 'set the glob pattern for input files',
  replaceDecorators:
    'replace class @decorators with wrapped function calls to avoid TypeScript errors',
  replace: 'process files in-place instead of creating new TS files next to the original JS files',
};

// Define the CLI interface
program
  .version(pkg.version)
  .description('REFLOW - Flow to TypeScript converter')
  .usage('[OPTION]... <FILES OR DIRECTORIES ...>')
  .option('-d, --dry-run', help.dryRun)
  .option(
    '-e, --exclude-dirs <pattern ...>',
    help.excludeDirs,
    toArray,
    DEFAULT_EXCLUDE_DIRECTORIES,
  )
  .option('-i, --include-pattern <pattern>', help.includePattern, DEFAULT_INCLUDE_PATTERN)
  .option('-r, --replace', help.replace)
  .option('-D, --replace-decorators', help.replaceDecorators, false);

program.on('--help', () => {
  console.log('\nExamples:');
  console.log(`  $ reflow --replace src/`);
  console.log(`  $ reflow -d -i '**/__tests__/**/*.{js,jsx} src/`);
  console.log(`  $ reflow -exclude-patterns '**/__tests__/**/*','fixtures/*.js' src/`);
});

if (process.env.NODE_ENV !== 'test') {
  program.parse(process.argv);
  validateArgs(program.args) ? transpileFiles(collectArgs(program)) : program.help();
}
