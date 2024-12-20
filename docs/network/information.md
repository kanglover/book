# 3. HTTP 报文内的 HTTP 信息

## 3.1 HTTP 报文

用于 HTTP 协议交互的消息被成为 HTTP 报文。请求端的 HTTP 报文叫做请求报文，响应端的 HTTP 报文叫做响应报文。

HTTP 报文大致可分位报文首部和报文主体两块，中间有空行（CR + LF）隔开。

## 3.2 请求报文及响应报文结构

-   请求报文：报文首部（请求行 + 请求首部字段 + 通用首部字段 + 实体首部字段）+ 空行 + 报文主体
-   响应报文：报文首部（状态行 + 响应首部字段 + 通用首部字段 + 实体首部字段）+ 空行 + 报文主体

**请求行**

包含用于请求的方法，请求 URI 和 HTTP 版本。

**状态行**

包含表明响应结果的状态码，原因短语和 HTTP 版本。

**首部字段**

包含表示请求和响应的各种条件和属性的各类首部。

## 3.3 编码提升传输速率

HTTP 传输过程中通过编码提升传输速率。

### 3.3.1 报文主体、实体主体

-   报文

    是 HTTP 通信中的基本单位，由 8 位组字节流组成，通过 HTTP 通信传输。

-   实体

    作为请求或响应的有效载荷数据被传输，其内容由实体首部和实体主体组成。

HTTP 报文的主体用于传输请求或响应的实体主体。

通常，报文主体等于实体主体。只有当传输中进行编码操作时，实体主体的内容发生变化，才导致它和报文主体产生差异。

### 3.3.2 压缩传输的内容编码

常用的内容编码：

-   gzip（GUN zip）
-   compress（UNIX 系统的标准压缩）
-   deflate（zlib）
-   identify（不进行编码）

### 3.3.3 分割发送的分块传输编码

分块传输编码：把实体主体分块进行传输。

分块传输会将实体主体分成多个部分（块）。每一块都会用十六进制来标记块的大小，而实体主体的最后一块会使用 "0(CR+LF)" 来标记。

使用分块传输编码的实体主体会由接收的客户端负责解码。

## 3.4 发送多种数据的多部分对象集合

HTTP 协议中采纳了多部分对象集合，发送的一份报文主体内可含有多类型实体。通常是在图片或文本文件等上传时使用。

多部分对象集合包含的对象如下。

-   multipart/form-data

    在 Web 表单文件上传时使用。

-   multipart/byte range s

    状态码 206(Partial Content，部分内容)响应报文包含了多个范围的内容时使用。

## 3.5 获取部分内容的范围请求

指定范围发送的请求叫做范围请求(Range Request)。

执行范围请求时，会用到首部字段 Range 来指定资源的 byte 范围。

byte 范围的指定形式如下:

-   5001~10000 字节

```
Range: bytes=5001-10000
```

-   从 5001 字节之后全部的

```
Range: bytes=5001-
```

-   从一开始到 3000 字节和 5000~7000 字节的多重范围

```
Range: bytes=-3000, 5000-7000
```

针对范围请求，响应会返回状态码为 206 Partial Content 的响应报文。另外，对于多重范围的范围请求，响应会在首部字段 Content- Type 标明 multipart/byteranges 后返回响应报文。

如果服务器端无法响应范围请求，则会返回状态码 200 OK 和完整的 实体内容。

## 3.6 内容协商

当浏览器的默认语言为英语或中文，访问相同 URI 的 Web 页面时，显示对应的英语版或中文版的 Web 页面。这样的机制称为内容协商。

内容协商机制是指客户端和服务器端就响应的资源内容进行交涉，然后提供给客户端最为适合的资源。内容协商会以响应资源的语言、字符集、编码方式等作为判断的基准。

相关的首部字段

-   Accept
-   Accept-Charset
-   Accept-Encoding
-   Accept-Language
-   Content-Language

内容协商技术：

-   服务器驱动协商：由服务端进行内容协商，参考请求字段，在服务端处理。
-   客户端驱动协商：由客户端进行内容协商，从浏览器的可选项列表中手动选择，或者通过 JavaScript 脚本自动选择。
-   透明协商：服务器驱动和客户端驱动的结合。
