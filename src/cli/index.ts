import fs, { lstatSync } from 'fs';
import program, { Command } from 'commander';
import { extname } from 'path';

import pkg from '../../package.json';
import { logError } from '../util/log';
import { transpileFiles, CommandLineArgs } from './runner';

export const VALID_SOURCE_FILETYPES = ['.js', '.jsx'];
export const DEFAULT_EXCLUDE_DIRECTORIES = ['node_modules'];
export const DEFAULT_INCLUDE_PATTERN = '**/*.{js,jsx}';

function toArray(...values: string[]): string[] {
  return values.filter(val => typeof val === 'string');
}

// Validate all arguments (all directories)
function validateArgs(args: string[]): boolean {
  if (args.length === 0) {
    logError('No input directories or files given');
    return false;
  }

  const allSourcesExist = args.every(source => fs.existsSync(source));

  if (!allSourcesExist) {
    logError('Not all input directories or files exist');
  }

  const validFileType = args
    .filter(source => lstatSync(source).isFile())
    .every(source => VALID_SOURCE_FILETYPES.includes(extname(source)));

  if (!validFileType) {
    logError(
      `Invalid source file type. Only ${VALID_SOURCE_FILETYPES.join(
        ' and ',
      )} files are allowed as input!`,
    );
  }

  return allSourcesExist && validFileType;
}

// Create the desired argument data structure for the Runner
function collectArgs(program: Command): CommandLineArgs {
  return Object.assign({}, program.opts(), {
    sources: program.args,
  }) as CommandLineArgs;
}

// prettier-ignore
const help: {
  [arg in Exclude<keyof (CommandLineArgs), 'sources'>]: string;
} = {
  dryRun: 'perform a trial run printing to stdout instead of writing a file',
  excludeDirs: 'list of recursively excluded directories',
  includePattern: 'set the glob pattern for input files',
  replaceDecorators: 'replace class @decorators with wrapped function calls to avoid TypeScript errors',
  replace: 'process files in-place. A new TS file will be created next to the original file otherwise.',
};

// Define the CLI interface
program
  .version(pkg.version)
  .description('Reflow')
  .usage('[OPTION]... <FILES OR DIRECTORIES ...>')
  .option('-d, --dry-run', help.dryRun)
  .option('-e, --exclude-dirs <dirs ...>', help.excludeDirs, toArray, DEFAULT_EXCLUDE_DIRECTORIES)
  .option('-i, --include-pattern <pattern>', help.includePattern, DEFAULT_INCLUDE_PATTERN)
  .option('-r, --replace', help.replace)
  .option('-D, --replace-decorators', help.replaceDecorators, false);

program.on('--help', () => {
  console.log('\nExamples:');
  console.log(`  $ reflow --replace src/`);
  console.log(`  $ reflow -d -i '**/__tests__/**/*.{js,jsx} src/`);
  console.log(`  $ reflow -exclude-patterns '**/__tests__/**/*','fixtures/*.js' src/lib/`);
});

export default () => {
  program.parse(process.argv);
  validateArgs(program.args) ? transpileFiles(collectArgs(program)) : program.help();
};
