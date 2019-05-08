import fs from 'fs';
import program, { Command } from 'commander';

import pkg from '../../package.json';
import { logError } from '../util/log';
import { run, CliArgs as CommandLineArgs } from './runner';

function toArray(...values: string[]): string[] {
  return values.filter(val => typeof val === 'string');
}

// Validate all arguments (all directories)
function validateArgs(args: string[]): boolean {
  if (args.length === 0) {
    logError('No input directories or files given');
    return false;
  }

  const srcExists = args.every(dir => fs.existsSync(dir));

  if (!srcExists) {
    logError('Not all input directories or files exist');
  }

  return srcExists;
}

// Create the desired argument data structure for the Runner
function collectArgs(program: Command): CommandLineArgs {
  return Object.assign({}, program.opts(), {
    src: program.args,
  }) as CommandLineArgs;
}

// prettier-ignore
const help: {
  [arg in Exclude<keyof(CommandLineArgs), 'src'>]: string;
} = {
  dryRun: 'perform a trial run printing to stdout instead of writing a file',
  excludeDirs: 'list of recursively excluded directories',
  includePattern: 'set the glob pattern for input files',
  replaceDecorators: 'replace class @decorators with ordinary function calls',
  replace: 'process files in-place. A new TS file will be created next to the original file otherwise.',
  verbose: 'increase verbosity',
};

// Define the CLI interface
program
  .version(pkg.version)
  .description('Reflow')
  .usage('[OPTION]... <FILES OR DIRECTORIES ...>')
  .option('-d, --dry-run', help.dryRun)
  .option('-e, --exclude-dirs <dirs ...>', help.excludeDirs, toArray, ['node_modules'])
  .option('-i, --include-pattern <pattern>', help.includePattern, '**/*.{js,jsx}')
  .option('-r, --replace', help.replace)
  .option('-D, --replace-decorators', help.replaceDecorators, false)
  .option('-v, --verbose', help.verbose, false);

program.on('--help', () => {
  console.log('\nExamples:');
  console.log(`  $ reflow --write src/`);
  console.log(`  $ reflow -exclude-patterns '**/__tests__/**/*','mocks/*.js' src/lib/`);
});

program.parse(process.argv);

// Run the application
validateArgs(program.args) ? run(collectArgs(program)) : program.help();
