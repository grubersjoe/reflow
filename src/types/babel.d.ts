import '@babel/types';

declare module '@babel/types' {
  export interface CommentBlock {
    ignore: boolean;
  }

  export interface CommentLine {
    ignore: boolean;
  }
}
