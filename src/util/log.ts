import chalk from 'chalk';

import { PluginWarning } from '../plugin/util/warning';

function blank(n: number): string {
  return ' '.repeat(n);
}

export function printRuler(length: number = 80): void {
  console.log('─'.repeat(length));
}

export function logError(message: string): void {
  console.error(`${blank(4)}${chalk.bold.redBright('Error')}: ${chalk.reset(message)}\n`);
}

export function logWarning(message: string): void {
  console.warn(`${blank(4)}${chalk.bold.yellowBright('Warning')}: ${chalk.reset(message)}\n`);
}

export function logPluginWarning({ message, see }: PluginWarning): void {
  const indent = '    Warning: '.length;
  logWarning(message.concat(see ? `\n${blank(indent)}See ${see}.` : ''));
}
