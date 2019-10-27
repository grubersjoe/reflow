const path = require('path');

const nodeExternals = require('webpack-node-externals');
const BannerPlugin = require('webpack').BannerPlugin;

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';

  return {
    devtool: mode === 'development' ? 'sourcemap' : undefined,
    entry: {
      reflow: './src/cli/index.ts',
      plugin: './src/plugin/index.ts',
    },
    mode: mode,
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build'),

      // Set the correct target for Node (`var` per default)
      libraryTarget: 'umd',

      // These options are necessary to make debugging in VS Code possible,
      // since VS Code won't understand the webpack:// "protocol"
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    },
    plugins: [
      new BannerPlugin({
        banner: '#!/usr/bin/env node',
        entryOnly: true,
        test: 'reflow.js',
        raw: true,
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    target: 'node',
    externals: [nodeExternals()], // Exclude node_modules from bundle
  };
};
