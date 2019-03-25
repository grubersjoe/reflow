import fs from 'fs';
import program, { Command } from 'commander';

import pkg from '../../package.json';
import { logError } from '../util/log';
import { run, RunnerArgs } from './transpiler';

/**
 * Validate that all arguments (all directories) are valid
 * @param args List of directories or files
 */
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

/**
 * Create the desired argument data structure for the Runner
 * @param program The Commander program
 */
function collectArgs(program: Command): RunnerArgs {
  return Object.assign({}, program.opts(), { src: program.args }) as RunnerArgs;
}

/**
 * Define the CLI interface
 */
program
  .version(pkg.version)
  .description('Overflow')
  .usage('[OPTION]... <FILES OR DIRECTORIES ...>')
  .option('-d, --dry-run', 'perform a trial run with no changes made')
  .option('-g, --glob-pattern <pattern>', 'change the glob pattern for input files', '**/*.js')
  .option('-v, --verbose', 'increase verbosity');

program.on('--help', () => {
  console.log('\nExamples:');
  console.log('  $ overflow --dry-run src/');
});

program.parse(process.argv);

// Run the application
validateArgs(program.args) ? run(collectArgs(program)) : program.help();
