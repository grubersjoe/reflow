import '@babel/types';

declare module '@babel/types' {
  export interface ObjectTypeProperty {
    method: boolean;
  }
}
