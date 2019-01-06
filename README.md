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
### 3. babelrc

```js
{
  "presets": ["react", "es2015"]
}
```

### 4. 配置scripts命令

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

重新编译打包：

![1546753772182](C:\Users\Lee\AppData\Roaming\Typora\typora-user-images\1546753772182.png)



## 二、进一步使用webpack

### 1. html-webpack-plugin

> yarn add --dev html-webpack-plugin        

html-webpack-plugin@3.2.0  

webpack.config.js

```js
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
  
```

启动服务

> yarn run dev

访问`localhost:8080`

![1546755168193](C:\Users\Lee\AppData\Roaming\Typora\typora-user-images\1546755168193.png)

### 2. 处理css样式

编写css样式并在main.js中引入：

/src/style.css

```css
h1 {
  color: red
}
```

/src/main.js

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './style.css';

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

安装依赖包：  

> yarn add --dev css-loader style-loader

css-loader@2.1.0

style-loader@0.23.1



webpack.config.js

```js
module: {
    rules: [
      // 处理css样式
      {
        test: /.css$/,
        exclude: /(node_modules)/,
        // loader的处理顺序是从右往左，即先使用css-loader处理css文件，再使用style-loader将css用<style>包裹、插入到html文件中
        use: ['style-loader', 'css-loader']
      }
    ]
},
```

重新运行服务：

> yarn run dev

![1546756674058](C:\Users\Lee\AppData\Roaming\Typora\typora-user-images\1546756674058.png)



### 3. 处理less

编写less文件

/src/less.less

```css
h1 {
  color: green;
  font-size: 50px;
}
```



/src/main.js



安装

> yarn add --dev less less-loader

less-loader@4.1.0

less@3.9.0

webpack.config.js

```js
// 处理less文件
{
    test: /.less$/,
    exclude: /(node_modules)/,
    use: ['style-loader', 'css-loader', 'less-loader']
}
```



重新启动服务：

![1546757055623](C:\Users\Lee\AppData\Roaming\Typora\typora-user-images\1546757055623.png)





### 4. 处理图片

在React组件中使用图片：

/src/main.js

```js
class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        {/* 直接在组件中插入的图片不会被编译，打包之后依然是 src="./test.jpg" */}
        <img src="./test.jpg" alt=""/>
      </div>
    )
  }
}
```

要这样引用图片：先import，再使用jsx表达式

```js
import img from './test.jpg'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <img src={img} alt=""/>
      </div>
    )
  }
}
```

css样式中使用图片：直接像以前那样就可以。



安装loader

> yarn add --dev url-loader

url-loader@1.1.2



url-loader是对file-loader的上层封装。

https://blog.csdn.net/hdchangchang/article/details/80175782

url-loader解决的问题:

如果图片较多，会发很多http请求，会降低页面性能。

url-loader会将引入的图片编码，生成dataURl。相当于把图片数据翻译成一串字符，再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。

当然，`如果图片较大，编码会消耗性能`。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy。

url-loader和file-loader是什么关系呢？

简答地说，url-loader封装了file-loader。url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader。

通过上面的介绍，我们可以看到，url-loader工作分两种情况：

1.文件大小小于limit参数，url-loader将会把文件转为DataURL；

文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。因此我们只需要安装url-loader即可。

webpack.config.js

```js
// 处理图片
{
    test:/\.(png|jpg|gif)$/,
    // 不使用limit参数，默认所有的图片都会使用bash64编码形式内联到代码中
    use:'url-loader'
}
```



重启服务：

![1546758473872](C:\Users\Lee\AppData\Roaming\Typora\typora-user-images\1546758473872.png)



使用limit参数限制图片大小:

webpack.config.js

```js
// 处理图片
{
  test:/\.(png|jpg|gif)$/,
  use: {
     loader: 'url-loader',
     options: {
         // 小于 8192字节 的图片会被转为base64编码,大于该限制的图片依然使用file-loader进行copy
         limit: 8192
       }
     }
}
```

所以，还要安装下

> yarn add --dev file-loader

file-loader@3.0.1



### 5. 处理字体

从阿里妈妈下载几个字体图标，引入到入口文件中：

```js
import './font/iconfont.css'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        {/* 直接在组件中插入的图片不会被编译，打包之后依然是 src="./test.jpg" */}
        <img src={img} alt=""/>
        <img src={require('./test1.png')} alt=""/>

        {/* 使用字体图标 */}
        <span class="icon iconfont">&#xe601;</span>
        <span class="icon iconfont">&#xe62e;</span>
      </div>
    )
  }
}
```



处理字体图标和处理图片是一样的。

webpack.config.js

```js
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
```

重启服务：

![1546761105380](C:\Users\Lee\AppData\Roaming\Typora\typora-user-images\1546761105380.png)



## 三、优化webpack

