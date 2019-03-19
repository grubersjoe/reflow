// @flow
let mixedVar: mixed;
let mixedVarBoolean: mixed = true;
let mixedVarNull: mixed = null;
let mixedVarNuller: mixed = 0;
let mixedVarObjectLiteral: mixed = {};
let mixedVarString: mixed = 'string';
let mixedVarUndefined: mixed = undefined;

function functionMixedParam(value: mixed): string {
  return typeof value;
}
