
let stringVar: string;
let stringLiteralVar: "string";
let undefinedVar: undefined;

let typeofStringVar: typeof stringVar;
let typeofStringLiteralVar: typeof stringLiteralVar;

type TypeofAlias = typeof stringVar;

const obj = {
  p1: 'string',
  p2: true,
  p3: {
    p31: {
      p311: 3
    },
    p32: null
  }
 }

type TypeofObject = typeof obj;
type TypeofObjectQualified = typeof obj.p1;
type TypeofObjectQualifiedMultiLevel = typeof obj.p3.p31.p311;
