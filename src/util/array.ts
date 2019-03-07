export function insertIf<T>(condition: boolean, ...elements: T[]): T[] {
  return condition ? elements : [];
}
