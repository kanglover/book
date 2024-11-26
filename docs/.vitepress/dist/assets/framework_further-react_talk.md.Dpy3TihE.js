import{_ as s,c as i,o as a,a2 as l}from"./chunks/framework.CWo5xHl-.js";const g=JSON.parse('{"title":"2. 漫谈 React","description":"","frontmatter":{},"headers":[],"relativePath":"framework/further-react/talk.md","filePath":"framework/further-react/talk.md"}'),n={name:"framework/further-react/talk.md"},t=l(`<h1 id="_2-漫谈-react" tabindex="-1">2. 漫谈 React <a class="header-anchor" href="#_2-漫谈-react" aria-label="Permalink to &quot;2. 漫谈 React&quot;">​</a></h1><h2 id="_2-1-事件系统" tabindex="-1">2.1 事件系统 <a class="header-anchor" href="#_2-1-事件系统" aria-label="Permalink to &quot;2.1 事件系统&quot;">​</a></h2><p>React 基于 VDOM 实现了一个 SyntheticEvent（合成事件）层，它与原生事件拥有同样的接口，支持冒泡，可以用 stopPropagation() 和 preventDefault() 来中断它。</p><p>所有事件都自动绑定到最外层上。</p><h3 id="_2-1-1-绑定方式" tabindex="-1">2.1.1 绑定方式 <a class="header-anchor" href="#_2-1-1-绑定方式" aria-label="Permalink to &quot;2.1.1 绑定方式&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> onClick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.handleClick}&gt;Test&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h3 id="_2-1-2-实现机制" tabindex="-1">2.1.2 实现机制 <a class="header-anchor" href="#_2-1-2-实现机制" aria-label="Permalink to &quot;2.1.2 实现机制&quot;">​</a></h3><ol><li><p>事件委派</p><p>所有事件绑定到最外层，然后由最外层统一处理。简化了事件处理和回收机制。</p></li><li><p>自动绑定</p><p>通过 bind 或者箭头函数，自动绑定 this。</p></li></ol><h3 id="_2-1-3-原生事件" tabindex="-1">2.1.3 原生事件 <a class="header-anchor" href="#_2-1-3-原生事件" aria-label="Permalink to &quot;2.1.3 原生事件&quot;">​</a></h3><p>支持在生命周期间绑定原生事件 addEventListener，在组件卸载时，要手动解绑。</p><h3 id="_2-1-4-合成事件与原生事件" tabindex="-1">2.1.4 合成事件与原生事件 <a class="header-anchor" href="#_2-1-4-合成事件与原生事件" aria-label="Permalink to &quot;2.1.4 合成事件与原生事件&quot;">​</a></h3><p>在原生事件中的阻止冒泡行为，可以阻止 React 合成事件的传播（反之则不行）。</p><h3 id="_2-1-5-对比合成事件与原生事件" tabindex="-1">2.1.5 对比合成事件与原生事件 <a class="header-anchor" href="#_2-1-5-对比合成事件与原生事件" aria-label="Permalink to &quot;2.1.5 对比合成事件与原生事件&quot;">​</a></h3><ol><li><p>传播</p><p>React 的合成事件并没有实现事件捕获，仅支持事件冒泡。</p></li><li><p>事件类型</p><p>React 合成事件属于 JS 事件的一个子集。</p></li><li><p>绑定方式</p><p>React 合成事件在 Jsx 中定义，事件名采用驼峰命名法，如 onClick。</p></li><li><p>事件对象</p><p>React 合成事件不存在兼容性问题。</p></li></ol><h2 id="_2-2-表单" tabindex="-1">2.2 表单 <a class="header-anchor" href="#_2-2-表单" aria-label="Permalink to &quot;2.2 表单&quot;">​</a></h2><h3 id="_2-2-1-受控组件" tabindex="-1">2.2.1 受控组件 <a class="header-anchor" href="#_2-2-1-受控组件" aria-label="Permalink to &quot;2.2.1 受控组件&quot;">​</a></h3><p>受控组件是指表单数据由 React 组件来管理。</p><p>表单的值发生变化时，调用 onChange 事件，通过事件 e 拿到改变后的状态，并更新应用的 state。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">handleChange</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(e) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setState</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({value: e.target.value});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">input</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.state.value} </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onChange</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.handleChange} /&gt;</span></span></code></pre></div><h3 id="_2-2-2-非受控组件" tabindex="-1">2.2.2 非受控组件 <a class="header-anchor" href="#_2-2-2-非受控组件" aria-label="Permalink to &quot;2.2.2 非受控组件&quot;">​</a></h3><p>非受控组件是指表单数据由 DOM 元素来管理。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">handleSubmit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(e) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> input</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.input;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(input.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">form</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> onSubmit</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.handleSubmit}&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">input</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">input</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.input </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> input} /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;submit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Submit&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">form</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="_2-3-样式处理" tabindex="-1">2.3 样式处理 <a class="header-anchor" href="#_2-3-样式处理" aria-label="Permalink to &quot;2.3 样式处理&quot;">​</a></h2><h3 id="_2-3-1-基本样式设置" tabindex="-1">2.3.1 基本样式设置 <a class="header-anchor" href="#_2-3-1-基本样式设置" aria-label="Permalink to &quot;2.3.1 基本样式设置&quot;">​</a></h3><ol><li><p>样式中的像素值</p><p>React 默认使用 px 作为样式单位，可以省略 px。</p></li><li><p>classnames 库</p><p>使用 classnames，处理动态类名。</p></li></ol><h3 id="_2-3-2-css-modules" tabindex="-1">2.3.2 CSS Modules <a class="header-anchor" href="#_2-3-2-css-modules" aria-label="Permalink to &quot;2.3.2 CSS Modules&quot;">​</a></h3><p>CSS Modules 是一种 CSS 规范，通过模块化来管理样式。</p><ul><li><p>样式默认局部</p><p>使用了 CSS Modules 后，就相当于给每个 class 名外加了 :local，以此来实现样式的局部化。如果我们想切换到全局模式，可以使用 :global 包裹</p></li><li><p>使用 composes 组合样式</p></li></ul><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.base</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.normal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    composes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: base;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li><p>class 命名</p><p>BEM 规范（Block Element Modifier）</p></li><li><p>CSS 与 JS 变量共享</p></li></ul><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">primary-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $f40;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:export {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    primaryColor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: $primary-color;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> styles </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./styles.css&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(styles.primaryColor); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// #f40</span></span></code></pre></div><h2 id="_2-4-组件通信" tabindex="-1">2.4 组件通信 <a class="header-anchor" href="#_2-4-组件通信" aria-label="Permalink to &quot;2.4 组件通信&quot;">​</a></h2><h3 id="_2-4-1-父子组件通信" tabindex="-1">2.4.1 父子组件通信 <a class="header-anchor" href="#_2-4-1-父子组件通信" aria-label="Permalink to &quot;2.4.1 父子组件通信&quot;">​</a></h3><p>父组件通过 props 传递数据给子组件。</p><p>子组件利用回调函数，向父组件传递数据。</p><h3 id="_2-4-3-跨层级组件通信" tabindex="-1">2.4.3 跨层级组件通信 <a class="header-anchor" href="#_2-4-3-跨层级组件通信" aria-label="Permalink to &quot;2.4.3 跨层级组件通信&quot;">​</a></h3><ul><li>context 实现跨层级组件通信。</li><li>EventEmitter 实现没有嵌套关系的组件通信。</li></ul><h2 id="_2-5-组件抽象" tabindex="-1">2.5 组件抽象 <a class="header-anchor" href="#_2-5-组件抽象" aria-label="Permalink to &quot;2.5 组件抽象&quot;">​</a></h2><p>React 在使用 createClass 构建组件时提供了 mixin 属性，用于混入组件的属性和方法。但这样会破坏组件的封装性，因此 React 提供了高阶组件（HOC）来替代 mixin。</p><h3 id="_2-5-1-高阶组件" tabindex="-1">2.5.1 高阶组件 <a class="header-anchor" href="#_2-5-1-高阶组件" aria-label="Permalink to &quot;2.5.1 高阶组件&quot;">​</a></h3><p>实现高阶组件有两种方式：</p><ul><li>属性代理</li><li>反向继承</li></ul><ol><li>属性代理</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> myContainer</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">WrapComponent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> React</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">WrapComponent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.props} /&gt;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ol start="2"><li>反向继承</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> myContainer</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">WrapComponent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> WrapComponent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span></code></pre></div><h2 id="_2-6-组件性能优化" tabindex="-1">2.6 组件性能优化 <a class="header-anchor" href="#_2-6-组件性能优化" aria-label="Permalink to &quot;2.6 组件性能优化&quot;">​</a></h2><h3 id="_2-6-1-纯函数" tabindex="-1">2.6.1 纯函数 <a class="header-anchor" href="#_2-6-1-纯函数" aria-label="Permalink to &quot;2.6.1 纯函数&quot;">​</a></h3><p>纯函数：</p><ul><li>给定相同的输入，返回相同的输出</li><li>不会产生副作用</li><li>没有额外的状态依赖</li></ul><h3 id="_2-6-2-purerender" tabindex="-1">2.6.2 PureRender <a class="header-anchor" href="#_2-6-2-purerender" aria-label="Permalink to &quot;2.6.2 PureRender&quot;">​</a></h3><p>通过 shouldComponentUpdate 判断是否需要更新组件，如果返回 true，则进行渲染。</p><h3 id="_2-6-3-immutable" tabindex="-1">2.6.3 Immutable <a class="header-anchor" href="#_2-6-3-immutable" aria-label="Permalink to &quot;2.6.3 Immutable&quot;">​</a></h3><p>优点：</p><ul><li>降低『可变』带来的复杂度</li><li>节省内容，没有被引用的对象会被垃圾回收</li><li>并发安全</li><li>函数式编程</li></ul>`,56),h=[t];function e(p,k,r,d,E,o){return a(),i("div",null,h)}const y=s(n,[["render",e]]);export{g as __pageData,y as default};