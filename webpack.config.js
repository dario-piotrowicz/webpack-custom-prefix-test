const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'index.js'
  },
  mode: 'development',
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /nodeModules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [ "@babel/preset-env" ],
                },
            },
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
        },
    ],
  },
};