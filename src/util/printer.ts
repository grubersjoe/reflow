import chalk from 'chalk';

export function printError(message: string): void {
  console.log(`${chalk.bgRed(' Error ')} ${chalk.red(message)}\n`);
}

export function printHeading(text: string): void {
  const padding = ' '.repeat(2);
  const hrule = '═'.repeat(text.length + padding.length * 2);

  console.log('╔' + hrule + '╗');
  console.log('║' + padding + text + padding + '║');
  console.log('╚' + hrule + '╝');
}

export function printRuler(symbol: string = '─', length: number = 80): void {
  console.log(symbol.repeat(length));
}
