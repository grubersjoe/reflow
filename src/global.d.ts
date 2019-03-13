declare module '@babel/helper-plugin-utils';
declare module 'babel-plugin-tester';

// There is no type definition in @types/babel__core for this interface
declare interface PluginPass<T> {
  cwd: string;
  file: {
    ast: import('@babel/types').File;
    code: string;
    declarations: object;
    hub: object;
    inputMap?: object;
    metadata: object;
    opts: import('@babel/core').TransformOptions;
    path: import('@babel/traverse').NodePath<T>;
    scope: import('@babel/traverse').Scope;
    shebang: string;
  };
  filename?: string;
  key: string;
  opts: import('./plugin').PluginOptions;
}
