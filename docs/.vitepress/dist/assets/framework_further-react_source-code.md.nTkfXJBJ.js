import{_ as s,c as i,o as a,a2 as t}from"./chunks/framework.CWo5xHl-.js";const y=JSON.parse('{"title":"3. 解读 React 源码","description":"","frontmatter":{},"headers":[],"relativePath":"framework/further-react/source-code.md","filePath":"framework/further-react/source-code.md"}'),e={name:"framework/further-react/source-code.md"},n=t(`<h1 id="_3-解读-react-源码" tabindex="-1">3. 解读 React 源码 <a class="header-anchor" href="#_3-解读-react-源码" aria-label="Permalink to &quot;3. 解读 React 源码&quot;">​</a></h1><h2 id="_3-1-初探" tabindex="-1">3.1 初探 <a class="header-anchor" href="#_3-1-初探" aria-label="Permalink to &quot;3.1 初探&quot;">​</a></h2><p>react-dom: react 渲染器</p><ul><li>client: 包含 DOM 操作方法以及事件方法（事件监听、事件方法、合成事件...）</li><li>server: 包含服务端渲染的实现和方法</li><li>event: 更底层的事件方法，如事件插件中心、事件注册、事件传播等</li><li>shared: 包含文本组件(ReactDOMTextComponent)、标签组件(ReactDOMComponent)、 DOM 属性操作(DOMProperty、DOMPropertyOperations)、CSS 属性操作(CSSProperty、 CSSPropertyOperations)等。</li></ul><h2 id="_3-2-vdom-模型" tabindex="-1">3.2 VDOM 模型 <a class="header-anchor" href="#_3-2-vdom-模型" aria-label="Permalink to &quot;3.2 VDOM 模型&quot;">​</a></h2><p>一个 DOM 标签所需要的基本信息：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    tagName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;div&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    properties</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    children</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [],</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>不同节点类型：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactNode</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactElement</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactFragment</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactText</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactElement</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactComponentElement</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactDOMElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactFragment</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Array</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ReactNode</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactEmpty</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactNodeList</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactNode</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactEmpty</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactText</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReactEmpty</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> undefined</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><h3 id="_3-2-1-创建-react-元素" tabindex="-1">3.2.1 创建 React 元素 <a class="header-anchor" href="#_3-2-1-创建-react-元素" aria-label="Permalink to &quot;3.2.1 创建 React 元素&quot;">​</a></h3><p>JSX 创建的虚拟元素最终会被编译成调用 React 的 createElement 方法</p><h3 id="_3-2-2-初始化组件入口" tabindex="-1">3.2.2 初始化组件入口 <a class="header-anchor" href="#_3-2-2-初始化组件入口" aria-label="Permalink to &quot;3.2.2 初始化组件入口&quot;">​</a></h3><p>创建组件时，会根据 node 类型来创建不同的组件。</p><ul><li>node 不存在，创建空组件</li><li>node 类型为对象（DOM 标签组件或者自定义组件）。element 为 string 类型，创建 DOM 标签组件，否则创建自定义组件</li><li>node 为字符串或数字，创建文本组件</li></ul><h3 id="_3-3-生命周期" tabindex="-1">3.3 生命周期 <a class="header-anchor" href="#_3-3-生命周期" aria-label="Permalink to &quot;3.3 生命周期&quot;">​</a></h3><ul><li>当首次挂载组件时，按顺序执行 getDefaultProps、getInitialState、componentWillMount、 render 和 componentDidMount。</li><li>当卸载组件时，执行 componentWillUnmount。</li><li>当重新挂载组件时，此时按顺序执行 getInitialState、componentWillMount、render 和 componentDidMount，但并不执行 getDefaultProps。</li><li>当再次渲染组件时，组件接受到更新状态，此时按顺序执行 componentWillReceiveProps、 shouldComponentUpdate、componentWillUpdate、render 和 componentDidUpdate。</li></ul><h3 id="_3-4-setstate-机制" tabindex="-1">3.4 setState 机制 <a class="header-anchor" href="#_3-4-setstate-机制" aria-label="Permalink to &quot;3.4 setState 机制&quot;">​</a></h3><p>当调用 setState 时，实际上会执行 enqueueSetState 方法，并对 partialState 以及更新队列进行合并操作，最终通过 enqueueUpdate 执行 state 更新。</p><p>enqueueSetState 执行时，会判断是否出于批量更新模式，如果处于批量更新模式，则将组件保存到 dirtyComponents；否则，直接遍历 dirtyComponents 调用 updateComponent。</p><blockquote><p>React 内部维护了一个 “是否处于批量更新” 的变量，这是旧版本的逻辑，新版本是通过 queueMicrotask 实现异步更新。</p></blockquote><h3 id="_3-5-diff-算法" tabindex="-1">3.5 Diff 算法 <a class="header-anchor" href="#_3-5-diff-算法" aria-label="Permalink to &quot;3.5 Diff 算法&quot;">​</a></h3><p>传统 diff 算法通过循环递归对节点进行依次对比，效率低下，算法复杂度达到 O(n3)，React 制定了一些策略来优化。</p><ul><li>Tree diff: 对树进行分层比较，两棵树只会对同一层次的节点进行比较</li><li>component diff: 同类型的组件，则会继续往下 diff 运算; 如果不是，直接删除这个组件下的所有子节点，创建新的</li><li>element diff: 当节点处于同一层级时，diff 提供了 3 种节点操作，分别为 INSERT_MARKUP(插入)、MOVE_EXISTING(移动)和 REMOVE_NODE(删除)。</li></ul>`,23),l=[n];function h(p,k,r,d,o,c){return a(),i("div",null,l)}const E=s(e,[["render",h]]);export{y as __pageData,E as default};
