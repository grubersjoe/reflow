// @flow
let stringVar: string;
let stringLiteralVar: "string";
let undefinedVar: typeof undefined;

let typeofStringVar: typeof stringVar;
let typeofStringLiteralVar: typeof stringLiteralVar;

type TypeofAlias = typeof stringVar;
