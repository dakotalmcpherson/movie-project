const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'], ['@babel/preset-react']
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
        ],
      }
    ]
  },
  entry: '/client/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  devServer: {
    port: 8080,
    proxy: {
      '/': 'http://localhost:3000'
    }
  },
  plugins: [
     new HtmlWebpackPlugin(
    {
      // we are referencing our index.html as a template to get access to the root id for our react app to hang from
      title: 'test',
      template: 'index.html'
    }
  )
  ]
};