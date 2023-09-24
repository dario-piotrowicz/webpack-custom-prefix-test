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
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.compilation.tap(
          "MyCustomPlugin",
          (_compilation, { normalModuleFactory }) => {
            normalModuleFactory.hooks.resolve
              .tap("MyCustomPlugin", resourceData => {
                if(resourceData.request === 'custom:module-a') {
                  resourceData.request = path.resolve(__dirname, '__my-fn-a__.js');
                }
              });
          }
        );
      },
    }
  ]
};