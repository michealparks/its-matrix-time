const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const env = process.env.NODE_ENV

console.log(env)

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env || 'development')
    })
  ].concat(env === 'production' ? new UglifyJSPlugin({
    uglifyOptions: {
      ie8: false,
      ecma: 6
    }
  }) : []),
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: [
            ["transform-react-jsx", {
              "pragma": "h"
            }]
          ]
        }
      }
    ]
  },
  resolve: {
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  }
}
