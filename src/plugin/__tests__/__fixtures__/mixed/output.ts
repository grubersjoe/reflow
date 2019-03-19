
let mixedVar: unknown;
let mixedVarBoolean: unknown = true;
let mixedVarNull: unknown = null;
let mixedVarNuller: unknown = 0;
let mixedVarObjectLiteral: unknown = {};
let mixedVarString: unknown = 'string';
let mixedVarUndefined: unknown = undefined;

function functionMixedParam(value: unknown): string {
  return typeof value;
}
