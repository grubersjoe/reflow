// @flow
const primitiveBoolean: boolean = true;
const primitiveBooleanLiteral: false = false;
const primitiveNumeric: number = 0;
const primitiveNumericLiteral: 1 = 1;
const primitiveNumericLiteralNegative: -5 = -5;
const primitiveNumericLiteralFloat: 3.14 = 3.14;
const primitiveNull: null = null;
const primitiveString: string = "string";
const primitiveStringLiteral: "literal" = "literal";

function functionSimple(p1: number) {}
function functionMultipleParameter(p1: boolean, p2: number, p3: string, p4: null) {}
function functionWithReturnType(p1: {}, p2: boolean): void {}
