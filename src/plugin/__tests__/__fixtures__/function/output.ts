
type FunctionEmpty = () => void;
type FunctionSimple = (p1: number[], p2: boolean) => number;
type FunctionMaybeParam = (p1: number, p2?: boolean) => number;
type FunctionWithOptionalParams = (p1: string, p2?: {}, p3?: boolean) => void;
type FunctionWithUnnamedParam = (p1: string, p2: number) => boolean;
type FunctionWithUnnamedParamMaybe = (p1: Array<string>, p2: number | null | undefined) => boolean;
type FunctionWithUnnamedParamMaybeReturn = (p1: {}, p2: number) => boolean | null | undefined;
type FunctionWithUnnamedParamUnion = (p1: string, p2: number | {}) => boolean | null;
type FunctionWithRestParam = (p: string, ...numbers: number[]) => number;
type FunctionWithUnnamedRestParam = (p: string, ...rest: number[]) => number;
type FunctionWithFunctionParam = (f: (p: number) => boolean) => void;
type FunctionWithUnnamedFunctionParam = (p1: (p1: number) => boolean, p2: string) => void;
type FunctionWithTypeParam = <T>(p: T) => T;
type FunctionWithTypeParams = <T1, T2>(p: T1) => T2;

function functionEmpty() {}
function functionSimple(p1: unknown, p2: boolean) {}
function functionSimpleWithReturn(p1: number, p2: number): boolean {
  return p1 === p2;
}
function functionWithInitializer(p1: string, p2: boolean = false) {}
function functionWithOptionalParam(p1: string[], p2?: boolean) {}
function functionWithOptionalParamAndInitializer(p1: string, p2?: number, p3: boolean = false) {}
async function functionAsync(): Promise<number> {
  return 42;
}

const arrowFunctionEmpty = () => {};
const arrowFunctionWithParams = (p1: {}, p2: boolean) => {};
const arrowFunctionWithOptionalParam: (x: number, y?: number) => number = x => x;
