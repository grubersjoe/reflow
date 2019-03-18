// @flow
const any: any = 0;
const primitiveBoolean: boolean = true;
const primitiveBooleanLiteral: false = false;
const primitiveNumber: number = 0;
const primitiveNumberLiteral: 1 = 1;
const primitiveNumberLiteralNegative: -5 = -5;
const primitiveNumberLiteralFloat: 3.14 = 3.14;
const primitiveString: string = "string";
const primitiveStringLiteral: "literal" = "literal";
const primitiveNull: null = null;

function functionSimple(p1: number) {}
function functionMultipleParameter(p1: boolean, p2: number, p3: string, p4: null) {}
function functionWithReturnType(p1: {}, p2: boolean): void {}
