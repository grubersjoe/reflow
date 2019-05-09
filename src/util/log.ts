import chalk from 'chalk';

import { PluginWarning } from '../plugin/util/warning';

function blank(n: number): string {
  return ' '.repeat(n);
}

export function printRuler(length: number = 80): void {
  console.log('─'.repeat(length));
}

export function logError(message: string, indent: number = 0): void {
  console.error(`${blank(indent)}${chalk.bold.redBright('Error')}: ${chalk.reset(message)}\n`);
}

export function logWarning(message: string, indent: number = 0): void {
  console.warn(`${blank(indent)}${chalk.bold.yellowBright('Warning')}: ${chalk.reset(message)}\n`);
}

export function logPluginWarning({ message, see }: PluginWarning): void {
  const indent = '\n    Warning: '.length;
  logWarning(message.concat(see ? `\n${blank(indent)}See ${see}.` : ''));
}
