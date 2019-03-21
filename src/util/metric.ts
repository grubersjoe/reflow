interface Counter {
  getCounter(): Map<string, number>;
  incrementFor(key: string): void;
}

export function createCounter(): Counter {
  let count = new Map<string, number>();

  return {
    getCounter() {
      return count;
    },
    incrementFor(key: string) {
      count.set(key, (count.get(key) || 0) + 1);
    },
  };
}

export function sortNumberMap<T>(counter: Map<T, number>): Map<T, number> {
  const arr = [...counter.entries()];

  return new Map<T, number>(
    arr.sort((x, y) => {
      return y[1] - x[1];
    }),
  );
}

export const Metrics = {
  typeCounter: createCounter(),
};
