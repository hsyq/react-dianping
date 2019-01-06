const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/main.js'
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash:8].js'
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
      },

      // 处理css样式
      {
        test: /.css$/,
        exclude: /(node_modules)/,
        // loader的处理顺序是从右往左，即先使用css-loader处理css文件，再使用style-loader将css用<style>包裹、插入到html文件中
        use: ['style-loader', 'css-loader']
      },

      // 处理less文件
      {
        test: /.less$/,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },

      // 处理图片
      {
        test:/\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于  8192字节 的图片会被转为base64编码
            limit: 8192
          }
        }
      },

      // 处理字体图标
      {
        test:/\.(woff|woff2|eot|svg|ttf|otf)$/,
        use:[{
          loader:'url-loader',
          options:{
              limit:8192
          }
        }]
      }
    ]
  },

  plugins: [
    // 自动生成html文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    })
  ],

  devServer: {
    // 打包后的文件放到dist目录下，dev-server以该目录作为服务的根目录
    contentBase: path.resolve(__dirname, 'dist')
  }
}
