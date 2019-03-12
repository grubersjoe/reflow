
const primitiveBoolean: boolean = true;
const primitiveNumber: number = 0;
const primitiveString: string = 'a';
const primtiveNull: null = null;

const primitiveEmptyObject: {} = {};
const primitiveObject: {
  a: string;
  b: boolean;
} = {
  a: 'string',
  b: true
};

function funcSimple(p1: number) {}
function functMultipleParameter(p1: boolean, p2: number, p3: string, p4: null) {}
function funcWithReturnType(p1: {}, p2: boolean): void {}
