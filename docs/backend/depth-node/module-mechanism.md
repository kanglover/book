# 2. 模块机制

在其他高级语言中，Java 有类文件，Python 有 import 机制，Ruby 有 require，PHP 有 include 和 require。而 JavaScript 通过 `<script>` 标签引入代码的方式显得杂乱无章，语言自身毫无组织和约束能力。

经历十多年的发展，社区也为 JavaScript 制定了相应的规范，其中 CommonJS 规范最具有代表性。

## 2.1 CommonJS 规范

CommonJS 规范为 JavaScript 制定了一个美好的愿景：希望它能够在任何地方运行。

### 2.1.1 CommonJS 的出发点

JS 自身规范比较薄弱，并且还有以下缺陷：

-   没有模块系统
-   标准库较少
-   没有标准接口
-   缺乏包管理系统

CommonJS 规范提出主要是为了弥补当前 JS 没有标准的缺陷。他们希望用 CommonJS API 写出的应用可以具备跨宿主环境执行的能力，这样不仅可以利用 JS 开发客户端应用，还可以编写以下应用：

-   服务端 JS 应用程序
-   命令行工具
-   桌面图形界面应用程序
-   混合应用程序

这些规范涵盖了模块、二进制、Buffer、字符集编码、I/O 流、进程环境、文件系统、套接字、单元测试、Web 服务器网关接口、包管理等。

### 2.1.2 CommonJS 的模块规范

1. 模块引用

```js
var math = require('math');
```

通过 require 引入模块。

2. 模块定义

```js
exports.add = function () {
    // ...
};
```

在模块中存在 module 对象，它代表模块自身，而 exports 是 module 的属性。在 Node 中，一个文件就是一个模块，将方法挂载到 exports 对象上作为属性即可向外暴露。

3. 模块标识

每个模块都有唯一标识，一般来说，标识是传递给 require 方法的参数。

每个模块具有独立的空间，它们互不干扰。这使得用户完全不必考虑变量污染。

## 2.2 Node 的模块实现

在 Node 引入模块，需要经历以下三个步骤：

1. 路径分析
2. 文件定位
3. 编译执行

在 Node 中，模块分为两类：一类是 Node 提供的模块，称为核心模块；另一类是用户编写的模块，称为文件模块。

-   核心模块在 Node 源代码编译时，编译进了二进制执行文件。在 Node 进程启动时，部分核心模块直接加载进内存中，所以它的加载速度是最快的。
-   文件模块是运行时动态加载的，需要经历完整的路径分析和文件定位机制，速度比核心模块慢。

### 2.2.1 优先从缓存加载

Node 对引入过的模块都会进行缓存（编译和执行后的对象），以减少二次引入时的开销。

核心模块和文件模块都会采用缓存优先的方式加载，不同的是核心模块的缓存检查先于文件模块的缓存检查。

### 2.2.2 路径分析和文件定位

1. 模块标识符分析

模块标识符分为以下几类：

-   核心模块，如 http、fs、path 等
-   相对路径文件模块，以 `./` 或 `../` 开头
-   绝对路径文件模块，如 `/usr/local/`
-   非路径的文件模块，如自定义 myModule

**核心模块**：优先级仅次于缓存加载，加载速度最快。
**路径文件模块**：使用 path 模块处理标识符，生成绝对路径，再根据路径后缀寻找文件，加载速度慢于核心模块。
**自定义模块**：文件或包形式，加载速度最慢。

模块路径的解析规则：

- 当前文件目录下的 node_modules 目录
- 父目录下的 node_modules 目录
- 父目录的父目录下的 node_modules 目录
- 向上逐级递归，根目录下的 node_modules 目录

2. 文件定位

**扩展名分析**：

标识符中不包含文件扩展名，Node 会按 `.js`、`.json`、`.node` 的次序补足扩展名，依次尝试。尝试过程中，调用 fs 模块同步阻塞式地判断文件是否存在。因为 Node 是单线程的，所以这里会带来性能问题。

**目录分析和包**：

标识符指向一个目录时，则 Node 会在该目录下查找 `package.json` 文件，JSON 解析取得 `main` 字段得到文件名，然后用扩展名分析的方式得到完整路径。如果指定的文件名错误，或者压根没有 `package.json` 文件，Node 会将 index 当作默认文件名，依次尝试 `index.js`、`index.json`、`index.node`。

### 2.2.3 模块编译

在 Node 中，每个文件模块都是一个对象，它的定义如下：

```js
function Module(id, parent) {
    this.id = id;
    this.exports = {};
    this.parent = parent;
    if (parent && parent.children) {
        parent.children.push(this);
    }

    this.filename = null;
    this.loaded = false;
    this.children = [];
}
```

对于不同的文件扩展名，Node 会使用不同的编译方式：
- .js 文件：通过 fs 模块同步读取文件后编译执行
- .node 文件：这是用 C/C++ 编写的扩展二进制插件，通过 dlopen 编译加载
- .json 文件：通过 fs 模块同步读取文件后，用 JSON.parse() 解析返回结果
- 其余扩展名：被当作 .js 文件解析

每个编译成功的模块都会将其文件路径作为索引缓存在 Module._cache 对象上，以提高二次引入的性能。

```js
Module.extensions['.json'] = function (module, filename) {
    var content = NativeModule.require('fs').readFileSync(filename, 'utf-8');
    try {
        module.exports = JSON.parse(stripBOM(content));
    } catch (err) {
        err.message = filename + ': ' + err.message;
        throw err;
    }
}
```

上面是 .json 文件的编译函数，其中 Module.extensions 会被赋值给 require 的 extensions 属性。

```js
console.log(require.extensions); // { '.js': [Function], '.json': [Function], '.node': [Function] }
```

如果想要自定义扩展名，可以修改 require.extensions 属性，比如 require.extensions['.ext']，不过不建议这么做。

1. JavaScript 模块的编译

每个模块文件都存在 require、exports、module、__filename、__dirname 变量，它们是从何而来？事实上 Node 会对 JS 文件内容进行头尾包装。

```js
(function (exports, require, module, __filename, __dirname) {
    // 模块代码实际上就是在这里执行的
    var math = require('math');
    exports.area = function (radius) {
        return Math.PI * radius * radius;
    };
});
```

这样每个模块文件都进行了作用域隔离，包装之后的代码会通过 vm 原生模块的 runInThisContext 方法执行（类似 eval）。

2. C/C++ 扩展的编译

Node 调用 process.dlopen 方法进行加载和执行，不不同平台通过 libuv 兼容层进程了封装。

.node 文件不需要编译，因为它是 C/C++ 编译后的可执行文件，因此执行效率高。

3. JSON 文件的编译

JSON 文件的编译通过 fs 模块同步读取文件后，用 JSON.parse() 得到对象，然后赋值给 exports，以供外部调用。

## 2.3 核心模块