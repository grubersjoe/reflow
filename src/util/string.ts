import camelCase from 'lodash/camelCase';

export function upperCamelCase(input: string): string {
  return input.charAt(0).toUpperCase() + camelCase(input.slice(1));
}
