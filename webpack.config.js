// eslint-disable-next-line
const path = require('path');

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';

  return {
    devtool: 'sourcemap',
    entry: './src/index.ts',
    mode: mode,
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
      ]
    },
    output: {
      // This is necessary
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',

      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build')
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    target: 'node',
  }
};
