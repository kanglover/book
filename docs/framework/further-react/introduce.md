# 初入 React 世界

## 1.1 React 简介

React 是 Facebook 推出的一个用于构建用户界面的 JavaScript 库。

React 把用户界面抽象成组件，通过 JSX 语法来复用组件。可以用来开发 Web 网页，还能用于开发原生移动应用。

### 1.1.1 专注视觉层

React 并不是完整的 MVC/MVVM 框架，它只专注于提供清晰、简介的 View 层解决方案。

### 1.1.2 VDOM

React 把真实 DOM 树转换成 JavaScript 对象树（VDOM），每次数据更新，重新计算 VDOM，然后通过 diff 算法找出差异，再更新到真实 DOM。

VDOM 提升了性能，但最大的好处是方便与其他平台集成。

### 1.1.3 函数式编程

React 充分利用函数式方法去减少冗余代码。此外，由于它本身就是简单函数，所以易于测试。

## 1.2 JSX 语法

JSX 将 HTML 语法直接加入到 JavaScript 代码中，再通过翻译器转换到纯 JavaScript 后由浏览器执行。在实际开发中，JSX 在产品打包阶段都已经编译成纯 JavaScript，不会带来任何副作用，反而会让代码更加直观并易于维护。

**JSX 语法规则：**

1. XML 基本语法

-   定义标签时，只允许被一个标签包裹
-   标签必须闭合

2. 元素类型

-   标签首字母小写对应 DOM 元素，大写首字母对应组件元素
-   使用注释要用 {}

3. 元素属性

-   class 属性改为 className
-   for 属性改为 htmlFor
-   省略 Boolean 属性默认值为 true，`<Checkbox checked={true} />` 可以简写为 `<Checkbox checked />`
-   可以使用 ES6 rest/spread 语法
-   DOM 元素自定义属性必须使用 data- 开头，如 `data-custom="value"`，而自定义标签的任何属性都支持。

4. JS 表达式

属性值要使用表达式，只要用 {} 替换 ""

5. HTML 转义
   如果 JSX 中含有转义后的 4 实体字符，比如 &copy;(©)，则最后 DOM 中不会正确显示，解决方式：

-   直接使用 UTF-8 字符 ©;
-   使用对应字符的 Unicode 编码查询编码;
-   使用数组组装 `<div>{['cc ', <span>&copy;</span>, ' 2015']}</div>;`
-   直接插入原始的 HTML。React 提供了 dangerouslySetInnerHTML 属性

## 1.3 React 组件

React 组件基本上由 3 个部分组成——属性(props)、状态(state)以及生命周期方法。

构建方式：

-   React.createClass
-   extends React.Component
-   函数式组件

> 无状态组件
>
> 无状态组件只传入 props 和 context，不存在 state，也没有生命周，只负责渲染。

## 1.4 React 数据流

React 中，数据是自顶向下单向流动的。

### 1.4.1 state

state 管理足迹爱你内部状态。通过 setState 改变 state，触发重新渲染。

### 1.4.2 props

props 是组件的配置，是父组件传递给子组件的数据，其本身是不可变的。

## 1.5 React 生命周期

### 1.5.1 挂载或者卸载

componentWillMount 方法会在 render 方法之前执行，而 componentDidMount 方法会在 render 方法之后执行，分别代表了渲染前后的时刻。

组件卸载时，会执行 componentWillUnmount 方法。

### 1.5.2 更新

如果组件自身的 state 更新了，那么会依次执行 shouldComponentUpdate、componentWillUpdate 、 render 和 componentDidUpdate。

shouldComponentUpdate 是一个特别的方法，它接收需要更新的 props 和 state，让开发者增加 必要的条件判断，让其在需要时更新，不需要时不更新。因此，当方法返回 false 的时候，组件 不再向下执行生命周期方法。
