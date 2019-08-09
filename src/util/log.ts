import chalk from 'chalk';

function blank(n: number): string {
  return ' '.repeat(n);
}

export function printRuler(length: number = 80): void {
  console.log('─'.repeat(length));
}

export function logError(message: string, indent: number = 0): void {
  console.error(`${blank(indent)}🔥 ${chalk.bold.redBright('Error')}: ${chalk.reset(message)}`);
}
