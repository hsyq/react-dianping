const path = require('path');

module.exports = {
  entry: {
    app: './src/main.js'
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      // es6，React语法的配置
      {
        test: /.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  }
}
