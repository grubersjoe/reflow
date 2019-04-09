import fs from 'fs';
import program, { Command } from 'commander';

import pkg from '../../package.json';
import { logError } from '../util/log';
import { run, RunnerArgs } from './runner';

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
function collectArgs(program: Command): RunnerArgs {
  return Object.assign({}, program.opts(), {
    src: program.args,
  }) as RunnerArgs;
}

const helpText = {
  excludeDirs: 'list of recursively excluded directories',
  includePattern: 'set the glob pattern for input files',
  verbose: 'increase verbosity',
  write: 'edit files in-place. A new TS file will be created alongside the original one otherwise.',
};

// Define the CLI interface
program
  .version(pkg.version)
  .description('Overflow')
  .usage('[OPTION]... <FILES OR DIRECTORIES ...>')
  .option('-e, --exclude-dirs <dirs ...>', helpText.excludeDirs, toArray, ['node_modules'])
  .option('-i, --include-pattern <pattern>', helpText.includePattern, '**/*.{js,jsx}')
  .option('-v, --verbose', helpText.verbose)
  .option('-w, --write', helpText.write);

program.on('--help', () => {
  console.log('\nExamples:');
  console.log(`  $ overflow --write src/`);
  console.log(`  $ overflow -exclude-patterns '**/__tests__/**/*','foo/*.js' src/lib/`);
});

program.parse(process.argv);

// Run the application
validateArgs(program.args) ? run(collectArgs(program)) : program.help();
