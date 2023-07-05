var path = require('path');
let webpack = require("webpack");

module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/, // Apply the loader to JavaScript files
          exclude: /node_modules/, // Exclude node_modules directory
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015'], // Specify the preset to use
            },
          },
        },
      ],
    },
  };
  

