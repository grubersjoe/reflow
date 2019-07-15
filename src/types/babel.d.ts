import types from '@babel/types';

declare module '@babel/types' {
  export interface ObjectTypeProperty extends types.BaseNode {
    method: boolean;
  }
}
