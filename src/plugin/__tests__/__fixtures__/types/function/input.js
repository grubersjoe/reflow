// @flow
type FunctionVoid = () => void;
type FunctionSimple = (p1: number[], p2: boolean) => number;
type FunctionMaybeParam = (p1: number, p2?: boolean) => number;
type FunctionWithOptionalParams = (p1: string, p2?: {}, p3?: boolean) => void;
type FunctionWithUnnamedParam = (string, number) => boolean;
type FunctionWithUnnamedParamMaybe = (Array<string>, ?number) => boolean;
type FunctionWithUnnamedParamMaybeReturn = ({}, number) => ?boolean;
type FunctionWithUnnamedParamUnion = (string, number | {}) => boolean | null;
type FunctionWithRestParam = (p: string, ...numbers: number[]) => number;
type FunctionWithUnnamedRestParam = (p: string, ...number[]) => number;
type FunctionWithFunctionParams = (f: (p: number) => boolean) => void
type FunctionWithUnnamedFunctionParams = ((number) => boolean, string) => void;
type FunctionWithTypeParam = <T>(p: T) => T;
type FunctionWithTypeParams = <T1, T2>(p: T1) => T2;

function functionEmpty() {}
function functionSimple(p1: mixed, p2: boolean) {}
function functionSimpleWithReturn(p1: number, p2: number): boolean {
  return p1 === p2;
}
function functionWithInitializer(p1: string, p2: boolean = false) {}
function functionWithFunctionAsReturn() {
  return function (p?: number = 5) {
    return p;
  };
}
function functionWithOptionalParam(p1: string[], p2?: boolean) {}
function functionWithOptionalParamAndInitializer(p1: string, p2?: number, p3?: boolean = false) {}
async function functionAsync(): Promise<number> {
  return 42;
}

const arrowFunctionEmpty = () => {};
const arrowFunctionWithParams = (p1: {}, p2: boolean) => {};
const arrowFunctionWithOptionalParam: (x: number, y?: number) => number = x => x;
const arrowFunctionWithFunctionrAsReturn = () => (p?: Date = new Date()) => p;
