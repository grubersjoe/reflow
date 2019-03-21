// @flow
const mixedConst: mixed = Math.random() ? 1 : "string";
let mixedVar: mixed;

function functionMixedParam(value: mixed) {}

function functionMixedReturn(p: mixed): mixed {
  return p;
}
