/**
 * Helper function to conditionally insert elements into an array with spread operator:
 * [ ...insertIf(true, [1, 2, 3]) ]
 */
export function insertIf<T>(condition: boolean, ...elements: T[]): T[] {
  return condition ? elements : [];
}
