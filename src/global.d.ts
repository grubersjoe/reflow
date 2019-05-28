declare module '@babel/helper-plugin-utils';

declare module 'prettier-ts' {
  import prettier from 'prettier';

  export interface Options extends prettier.Options {
    reflow?: boolean;
  }

  export default prettier;
}
