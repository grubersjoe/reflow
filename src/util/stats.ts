interface Counter<T> {
  getCount(): Map<T, number>;
  count(key: T): void;
}

export function createCounter(): Counter<string> {
  let count = new Map<string, number>();

  return {
    getCount() {
      return count;
    },
    count(key: string) {
      count.set(key, (count.get(key) || 0) + 1);
    },
  };
}
