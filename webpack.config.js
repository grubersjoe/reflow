const path = require('path');
const webpack = require('webpack');

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
      // These options are necessary to make debugging in VS Code possible,
      // since VS Code won't understand the webpack:// "protocol"
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',

      filename: 'overflow.js',
      path: path.resolve(__dirname, 'build')
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: "#!/usr/bin/env node",
        entryOnly: true,
        raw: true,
      })
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    target: 'node',
  };
};
