// @flow
const existentialPrimitive: * = 'string';

function functionExistentialParam(p1: string): * {
  return p1.length;
}

let existentialMap: Map<*, *> = new Map<string, number>();
