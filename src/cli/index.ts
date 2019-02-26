import fs from 'fs';
import program, { Command } from 'commander';

import { run, RunnerArgs } from '../runner';
import pkg from '../../package.json';

function validateArgs(dirs: string[]): boolean {
  if (dirs.length === 0) return false;

  return dirs.reduce((dirsExist, dir) => dirsExist && fs.existsSync(dir), true);
}

function buildRunnerArgs(program: Command): RunnerArgs {
  return Object.assign({}, program.opts(), { src: program.args }) as RunnerArgs;
}

program
  .version(pkg.version)
  .description(`Overflow`)
  .usage('[OPTION]... <FILES OR DIRECTORIES ...>')
  .option('-d, --dry-run', 'perform a trial run with no changes made', true)
  .option('-g, --glob-pattern <pattern>', 'change the glob pattern for input files', '**/*.js')
  .option('-v, --verbose', 'increase verbosity');

program.on('--help', function() {
  console.log('Examples:');
  console.log('  $ overflow --dry-run src/');
});

program.parse(process.argv);

if (validateArgs(program.args)) {
  run(buildRunnerArgs(program));
} else {
  program.help();
}
