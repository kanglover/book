# 3. 解读 React 源码

该部分是基于 React 15.0 的源码进行解读的，跟目前 React 版本有出入，不过其中的思想是值得学习的。

## 3.1 初探

react-dom: react 渲染器

-   client: 包含 DOM 操作方法以及事件方法（事件监听、事件方法、合成事件...）
-   server: 包含服务端渲染的实现和方法
-   event: 更底层的事件方法，如事件插件中心、事件注册、事件传播等
-   shared: 包含文本组件(ReactDOMTextComponent)、标签组件(ReactDOMComponent)、 DOM 属性操作(DOMProperty、DOMPropertyOperations)、CSS 属性操作(CSSProperty、 CSSPropertyOperations)等。

## 3.2 VDOM 模型

一个 DOM 标签所需要的基本信息：

```js
{
    tagName: 'div',
    properties: {
        style: {}
    },
    children: [],
    key: 1,
}
```

不同节点类型：

```js
type ReactNode = ReactElement | ReactFragment | ReactText;
type ReactElement = ReactComponentElement | ReactDOMElement;
type ReactFragment = Array<ReactNode | ReactEmpty>;
type ReactNodeList = ReactNode | ReactEmpty;
type ReactText = string | number;
type ReactEmpty = null | undefined | boolean;
```

### 3.2.1 创建 React 元素

JSX 创建的虚拟元素最终会被编译成调用 React 的 createElement 方法

### 3.2.2 初始化组件入口

创建组件时，会根据 node 类型来创建不同的组件。

-   node 不存在，创建空组件
-   node 类型为对象（DOM 标签组件或者自定义组件）。element 为 string 类型，创建 DOM 标签组件，否则创建自定义组件
-   node 为字符串或数字，创建文本组件

### 3.3 生命周期

-   当首次挂载组件时，按顺序执行 getDefaultProps、getInitialState、componentWillMount、 render 和 componentDidMount。
-   当卸载组件时，执行 componentWillUnmount。
-   当重新挂载组件时，此时按顺序执行 getInitialState、componentWillMount、render 和
    componentDidMount，但并不执行 getDefaultProps。
-   当再次渲染组件时，组件接受到更新状态，此时按顺序执行 componentWillReceiveProps、
    shouldComponentUpdate、componentWillUpdate、render 和 componentDidUpdate。

### 3.4 setState 机制

当调用 setState 时，实际上会执行 enqueueSetState 方法，并对 partialState 以及更新队列进行合并操作，最终通过 enqueueUpdate 执行 state 更新。

enqueueSetState 执行时，会判断是否出于批量更新模式，如果处于批量更新模式，则将组件保存到 dirtyComponents；否则，直接遍历 dirtyComponents 调用 updateComponent。

> React 内部维护了一个 “是否处于批量更新” 的变量，这是旧版本的逻辑，新版本是通过 queueMicrotask 实现异步更新。

### 3.5 Diff 算法

传统 diff 算法通过循环递归对节点进行依次对比，效率低下，算法复杂度达到 O(n3)，React 制定了一些策略来优化。

-   Tree diff: 对树进行分层比较，两棵树只会对同一层次的节点进行比较
-   component diff: 同类型的组件，则会继续往下 diff 运算; 如果不是，直接删除这个组件下的所有子节点，创建新的
-   element diff: 当节点处于同一层级时，diff 提供了 3 种节点操作，分别为 INSERT_MARKUP(插入)、MOVE_EXISTING(移动)和 REMOVE_NODE(删除)。
