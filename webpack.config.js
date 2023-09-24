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
        test: /a\.js/,
        use: {
          loader: 'custom-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolveLoader: {
    alias: {
      'custom-loader': path.resolve(__dirname, 'custom-loader.js'),
    },
  },
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.compilation.tap(
          "MyCustomPlugin",
          (_compilation, { normalModuleFactory }) => {
            normalModuleFactory.hooks.resolve
              .tap("MyCustomPlugin", resourceData => {
                if(resourceData.request === 'custom:module-a') {
                  resourceData.request = './a.js';
                }
              });
          }
        );
      },
    }
  ]
};