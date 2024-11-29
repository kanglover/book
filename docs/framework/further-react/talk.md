# 2. 漫谈 React

## 2.1 事件系统

React 基于 VDOM 实现了一个 SyntheticEvent（合成事件）层，它与原生事件拥有同样的接口，支持冒泡，可以用 stopPropagation() 和 preventDefault() 来中断它。

所有事件都自动绑定到最外层上。

### 2.1.1 绑定方式

```js
<button onClick={this.handleClick}>Test</button>
```

### 2.1.2 实现机制

1. 事件委派

    所有事件绑定到最外层，然后由最外层统一处理。简化了事件处理和回收机制。

2. 自动绑定

    通过 bind 或者箭头函数，自动绑定 this。

### 2.1.3 原生事件

支持在生命周期间绑定原生事件 addEventListener，在组件卸载时，要手动解绑。

### 2.1.4 合成事件与原生事件

在原生事件中的阻止冒泡行为，可以阻止 React 合成事件的传播（反之则不行）。

### 2.1.5 对比合成事件与原生事件

1. 传播

    React 的合成事件并没有实现事件捕获，仅支持事件冒泡。

2. 事件类型

    React 合成事件属于 JS 事件的一个子集。

3. 绑定方式

    React 合成事件在 Jsx 中定义，事件名采用驼峰命名法，如 onClick。

4. 事件对象

    React 合成事件不存在兼容性问题。

## 2.2 表单

### 2.2.1 受控组件

受控组件是指表单数据由 React 组件来管理。

表单的值发生变化时，调用 onChange 事件，通过事件 e 拿到改变后的状态，并更新应用的 state。

```js

handleChange(e) {
    this.setState({value: e.target.value});
}

<input type="text" value={this.state.value} onChange={this.handleChange} />
```

### 2.2.2 非受控组件

非受控组件是指表单数据由 DOM 元素来管理。

```js

handleSubmit(e) {
    const input = this.input;
    console.log(input.value);
}

<form onSubmit={this.handleSubmit}>
    <input type="text" ref={(input) => this.input = input} />
    <button type="submit">Submit</button>
<form>

```

## 2.3 样式处理

### 2.3.1 基本样式设置

1. 样式中的像素值

    React 默认使用 px 作为样式单位，可以省略 px。

2. classnames 库

    使用 classnames，处理动态类名。

### 2.3.2 CSS Modules

CSS Modules 是一种 CSS 规范，通过模块化来管理样式。

-   样式默认局部

    使用了 CSS Modules 后，就相当于给每个 class 名外加了 :local，以此来实现样式的局部化。如果我们想切换到全局模式，可以使用 :global 包裹

-   使用 composes 组合样式

```css
.base {
}

.normal {
    composes: base;
}
```

-   class 命名

    BEM 规范（Block Element Modifier）

-   CSS 与 JS 变量共享

```css
$primary-color: $f40;
:export {
    primaryColor: $primary-color;
}
```

```js
import styles from './styles.css';
console.log(styles.primaryColor); // #f40
```

## 2.4 组件通信

### 2.4.1 父子组件通信

父组件通过 props 传递数据给子组件。

子组件利用回调函数，向父组件传递数据。

### 2.4.3 跨层级组件通信

-   context 实现跨层级组件通信。
-   EventEmitter 实现没有嵌套关系的组件通信。

## 2.5 组件抽象

React 在使用 createClass 构建组件时提供了 mixin 属性，用于混入组件的属性和方法。但这样会破坏组件的封装性，因此 React 提供了高阶组件（HOC）来替代 mixin。

### 2.5.1 高阶组件

实现高阶组件有两种方式：

-   属性代理
-   反向继承

1. 属性代理

```js

const myContainer = (WrapComponent) => {
    class extends React.Component {
        render() {
            return <WrapComponent {...this.props} />;
        }
    }
}
```

2. 反向继承

```js
const myContainer = (WrapComponent) => {
    class extends WrapComponent {
        render() {
            return super.render();
        }
    }
```

## 2.6 组件性能优化

### 2.6.1 纯函数

纯函数：

-   给定相同的输入，返回相同的输出
-   不会产生副作用
-   没有额外的状态依赖

### 2.6.2 PureRender

通过 shouldComponentUpdate 判断是否需要更新组件，如果返回 true，则进行渲染。

### 2.6.3 Immutable

优点：

-   降低『可变』带来的复杂度
-   节省内容，没有被引用的对象会被垃圾回收
-   并发安全
-   函数式编程

缺点：容易与原生对象混淆。

### 2.6.4 key

给子组件设定一个独一为二的 key 值，可以提高 React 渲染效率。

### 2.6.5 react-addons-perf

一个性能检测工具

## 2.7 动画

动画可以帮助用户理解页面，增加应用的趣味性和可玩性，提高用户体验。

### 2.7.1 CSS 动画与 JS 动画

CSS 动画，能够得到更好的性能和更快的开发效率，但也有其局限性：

-   CSS 只支持 cubic-bezier 的缓动，如果你的动画对缓动函数有要求，就必须使用 JavaScript 动画。
-   CSS 动画只能针对一些特有的 CSS 属性。仍然有一些属性是 CSS 动画不支持的，例如 SVG 中 path 的 d 属性。
-   CSS 把 translate、rotate、skew 等都归结为一个属性——transform。因此，这些属性只能共用同一个缓动函数。例如，我们想要动画的轨迹是一条贝塞尔曲线，可以通过给 left 和 top 这两个属性加两个不同的 cubic-bezier 缓动来实现，但是 left 和 top 实现的动画性能不如 translateX 和 translateY。

JS 可以通过切换 className 实现动画，也可以通过缓慢函数来渲染特殊的动画。

### 2.7.1 React Transition

React Transition 跟踪组件动画的进入和退出状态，由开发者来赋予这些状态的实际意义和展现效果。

## 2.8 自动化测试

测试可以让项目保持健壮，在后期维护和扩展的过程中，减少犯错的几率。自动化测试就是把整个流程自动化，代替复杂的人工点击。同时通过配置回调钩子，可以让测试定期执行或在每次发布前执行。

### 2.8.1 Jest

Jest 是由 Facebook 开源的 React 单元测试框架，内部 DOM 操作基于 JSDOM，语法和断言基于 Jasmine 框架。它有以下 4 个特点：

-   自动找到测试；
-   自动 mock 模拟依赖包，达到单元测试的目的；
-   并不需要真实 DOM 环境执行，而是 JSDOM 模拟的 DOM；
-   多进程并行执行测试。

### 2.8.2 Enzyme

Enzyme 是由 Airbnb 开源的 React 组件测试框架。与 Jest 相比，Enzyme 提供类似 jQuery 操作 DOM 的语法，在做测试断言时更灵活、易用。

Enzyme 提供 3 种不同的方式来测试组件。

-   shallow：推荐的方式，浅渲染，只会渲染本组件内容，引用的外部组件不会渲染，提供更多好的隔离性。
-   render：如果 shallow 不能满足，才会使用它。基于 Cheerio 来模拟 DOM 环境（Cheerio 是类似 JSDOM 的另一框架）。
-   mount：类似 render，会做全渲染，对于测试生命周期时非常有用。
