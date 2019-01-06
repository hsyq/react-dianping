# react-dianping
  React技术栈实现大众点评demo

## 一、初始化项目
### 1.初始化项目
```js
mkdir react-dianping
cd react-dianping
yarn i -y
```

### 2.安装依赖包
```js
yarn add --dev webpack webpack-cli webpack-dev-server babel-core babel-loader babel-pr
eset-react babel-preset-env

yarn add react react-dom
```

版本：
```js
  "dependencies": {
    "react": "^16.7.0",
    "react-dom": "^16.7.0"
  },
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^8.0.5",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "webpack": "^4.28.3",
    "webpack-cli": "^3.2.0",
    "webpack-dev-server": "^3.1.14"
  }
```
注意：
这里默认安装的babel-loader@8，babel-core@6
会报错：
Error: Cannot find module '@babel/core'
babel-loader@8 requires Babel 7.x (the package '@babel/core').
If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.

原因：
babel-loader和babel-core版本不对应所产生的，
babel-loader 8.x对应babel-core 7.x
babel-loader 7.x对应babel-core 6.x

7.0 之后，包名升级为 @babel/core

解决：
重新安装babel-core
  yarn add @babel/core

安装之后的版本是：
```js
"@babel/core": "^7.2.2",
"babel-loader": "^8.0.5",
```

继续报错：
Error: Plugin/Preset files are not allowed to export objects, only functions. In E:\demo\react-大众点评\react-dianping\node_modules\babel-preset-react\lib\index.js

https://www.cnblogs.com/jiebba/p/9618930.html

报错原因：
babel 的版本冲突。
babel 依赖包不兼容。
依赖包中既有 babel 7.0 版本，又有 babel 6.0 版本，就会报这个错误

解决：

1、升级到 babel 7.0
2、降级到 babel 6.0 版本


yarn add @babel/preset-react --dev
yarn add @babel/preset-env --dev

安装之后的版本：
```js
"@babel/preset-env": "^7.2.3",
"@babel/preset-react": "^7.0.0",
```
在修改 .babelrc
```js
{
  "presets": ["@babel/preset-react", "@babel/preset-env"]
}
```

### 3.配置scripts命令
package.json
```js
 "scripts": {
    "dev": "webpack-dev-server --open",
    "build": "webpack --mode production"
  },
```

### 3.配置.editorconfig
参考文章：
1. [editorConfig编辑器配置](https://www.jianshu.com/p/00ac7bd5e74e)
2. [统一代码风格工具——editorConfig](http://www.cnblogs.com/xiaohuochai/p/7160067.html)

`.editorconfig`
```js
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

```
### 4. .babelrc
```js
{
  "presets": ["react", "es2015"]
}
```

### 5.webpack配置文件
`webpack.config.js`
```js
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
  }
}
```

### 6.编写React文件
/dist/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="author" content="Lee">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React-点评</title>
</head>
<body>
  <div id="app"></div>
  <!-- 引入编译后的js文件 -->
  <script type="text/javascript" src="./app.js"></script>
</body>
</html>
```

/src/main.js
```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
)
```

### 7.测试编译
> yarn run build


## 二、进一步使用webpack

