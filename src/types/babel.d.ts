import '@babel/types';

declare module '@babel/types' {
  export interface ObjectTypeProperty {
    method: boolean;
  }

  export interface CommentBlock {
    ignore: boolean;
  }

  export interface CommentLine {
    ignore: boolean;
  }
}
