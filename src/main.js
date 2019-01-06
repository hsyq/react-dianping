import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './style.css';
import './less.less';
import img from './test.jpg'

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

ReactDOM.render(
  <App />,
  document.querySelector('#app')
)
