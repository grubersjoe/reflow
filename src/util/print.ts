import chalk from 'chalk';

export function printError(message: string): void {
  console.log(`${chalk.bgRed(' Error ')} ${chalk.red(message)}\n`);
}

export function printHeading(text: string): void {
  const ruler = '─'.repeat(text.length);
  console.log(text.toUpperCase());
  console.log(ruler);
}

export function printRuler(symbol: string = '─', length: number = 80): void {
  console.log(symbol.repeat(length));
}
