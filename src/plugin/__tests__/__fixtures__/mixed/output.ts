
const mixedConst: unknown = Math.random() ? 1 : "string";
let mixedVar: unknown;

function functionMixedParam(value: unknown) {}

function functionMixedReturn(p: unknown): unknown {
  return p;
}
