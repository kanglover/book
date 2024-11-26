# 6. HTTP 首部

## 6.1. HTTP 报文首部

HTTP 报文：报文首部 + 空行 + 报文主体

## 6.2. HTTP 首部字段

HTTP 首部字段：首部字段名 + “:” + 空格 + 首部字段值。例如：Content-Type: text/html。

HTTP 首部字段分为 4 种类型：通用首部字段、请求首部字段、响应首部字段、实体首部字段。

HTTP 首部字段将定义成缓存代理和非缓存代理的行为，分为 2 种类型。

**端到端首部**
该类首部会转发给请求/响应的最终接收方，且必须保存在缓存生成的响应中，另规定它必须被转发。

**逐跳首部**
该类首部只对单次转发有效，会因为缓存或代理不再转发。 HTTP/1.1 及以后，该类首部，需要提供 Connection 首部字段。

除了这 8 个首部字段外，其他所有字段都属于端到端首部。

-   Connection
-   Keep-Alive
-   Proxy-Authenticate
-   Proxy-Authorization
-   Trailer
-   TE
-   Transfer-Encoding
-   Upgrade

## 6.3. 通用首部字段

### 6.3.1. Cache-Control

Cache-Control 首部字段定义了请求/响应遵循的缓存机制。

缓存请求指令：

-   no-cache：强制向源服务器再次验证
-   no-store：不缓存请求或响应的任何内容
-   max-age：响应的最大 Age 值
-   max-stale：接收已过期的响应
-   min-fresh：期望在指定时间内的响应仍有效
-   no-transform：代理不可更改媒体类型
-   only-if-cached：从缓存获取资源
-   cache-extension：扩展指令

缓存响应指令：

-   public：可向任意方提供响应的缓存
-   private：仅向特定用户返回响应
-   no-cache：缓存前必须先确认其有效
-   no-store：不缓存请求或响应的任何内容
-   max-age：响应的最大 Age 值
-   s-maxage：公共缓存服务器响应的最大 Age 值
-   no-transform：代理不可更改媒体类型
-   must-revalidate：可缓存但必须再向源服务器进行确认
-   proxy-revalidate：代理服务器可缓存但必须再向源服务器进行确认
-   cache-extension：扩展指令

**public & private 指令**

public：响应可以被任何方缓存，包括客户端、代理服务器、中间网关。

private：响应只能被客户端缓存，中间网关不可缓存。

**no-cache & no-store 指令**

no-cache：缓存前必须先确认其有效。客户端发送的请求如果包含该指令，表示客户端不会接收缓存过的响应，中间缓存服务器必须把客户端请求转发给源服务器。服务器返回的响应如果包含该指令，那么缓存服务器不能对资源进行缓存。

no-store：不缓存请求或响应的任何内容。

**s-maxage & max-age 指令**

这两个指令功能相同，s-maxage 只适用于供多位用户使用的公共缓存服务器。s-maxage 优先级高于 max-age。

当客户端发送请求包含 max-age 指令时，如果判定缓存资源时间数值比其数值小，那么客户端接收缓存资源。当 max-age 为 0，缓存服务器通常需要将请求转发给源服务器。

当服务端返回响应包含 max-age 指令时，缓存服务器将不对资源的有效性进行确认。

> 响应头中的 max-age：服务器指示客户端响应数据可以缓存多长时间。
>
> 请求头中的 max-age：客户端指示服务器自己愿意接受多旧的缓存数据。

HTTP/1.1 服务器会优先处理 max-age，忽略 Expires。 1.0 版本相反。

### 6.3.2. Connection

该首部字段具备如下两个作用：

-   管理持久连接（HTTP/1.1 默认持久连接，旧版本需要设置值为 Keep-Alive）
-   控制不再转发给代理的首部字段（Connection 定义的字段会被删除后再转发）

### 6.3.3. Date

Date 首部字段表示创建 HTTP 报文的日期和时间。

### 6.3.4. Pragma

HTTP/1.1 之前版本的历史遗留字段，形式唯一：Pragma: no-cache。只能在客户端发送的请求中，要求中间服务器不返回缓存资源。

### 6.3.5. Trailer

Trailer 会事先说明在报文主体后记录了哪些首部字段。可应用在分块传输编码时。

### 6.3.6. Transfer-Encoding

规定传输报文主体时采用的编码方式。

### 6.3.7. Upgrade

用于检测 HTTP 协议/其他协议的升级。

### 6.3.8. Via

追踪客户端与服务器之间的请求和响应报文传输路径。

### 6.3.9. Warning

通常会告知用户一些与缓存相关的问题的警告，今后可能会追加更多的警告代码。

## 6.4. 请求首部字段

### 6.4.1. Accept

Accept 首部字段用于指定客户端可接受的媒体类型。可以指定媒体类型的相对优先级（权重值 q）。

使用 q 用分号(;)进行分隔，范围是 0~1(可精确到小数点 后 3 位)，且 1 为最大值。不指定权重 q 值时，默认权重为 q=1.0。

> 例: Accept: text/plain; q=0.3, text/html
>
> 优先接收 HTML 格式，其次接收纯文本。

### 6.4.2. Accept-Charset

通知服务器用户代理支持的字符集及字符集的相对优先级。与首部字 段 Accept 相同的是可用权重 q 值来表示相对优先级。

### 6.4.3. Accept-Encoding

告知服务器用户代理支持的内容编码及内容编码的优先级顺序。可一次性指定多种内容编码。采用权重 q 值来表示相对优先级。

### 6.4.4. Accept-Language

告知服务器用户代理支持的语言及语言相对优先级。采用权重 q 值来表示相对优先级。

### 6.4.5. Authorization

告知服务器用户代理的认证信息。

### 6.4.6. Expect

客户端可通知服务器期望出现的某种特定行为。

### 6.4.7. From

告知服务器用户的电子邮箱地址。

### 6.4.8. Host

告知服务器请求资源所在的主机名和端口号。

### 6.4.9. If-Match

与 ETag 首部字段配合使用，根据实体标签（ETag）判断是否缓存命中。If-Match 的字段值跟 ETag 值一致时，才会执行请求，反之，则返回 412 状态码。

> 形如 If-xxx 这种样式的请求首部字段，都可称为条件请求。服务器接 收到附带条件的请求后，只有判断指定条件为真时，才会执行请求。

### 6.4.10. If-Modified-Since

与 Last-Modified 首部字段配合使用，根据时间判断是否缓存命中。If-Modified-Since 的字段值早于资源的更新时间，才会执行请求，反之，则返回 304 状态码。

### 6.4.11. If-None-Match

与 If-Match 作用相反。当该字段与 ETag 不一致时，才执行请求。

### 6.4.12. If-Range

If-Range 字段值（ETag 值或者时间）和请求资源的 ETag 值或时间一致时，则作为范围请求处理。反之，则返回全体资源。

### 6.4.13. If-Unmodified-Since

与 If-Modified-Since 作用相反。If-Unmodified-Since 的字段值早于资源的更新时间，才会执行请求，反之，则返回 412 状态码。

### 6.4.14. Max-Forwards

告知服务器，请求被转发时，允许请求者最多可经过的节点数。

### 6.4.15. Proxy-Authorization

与 Authorization 字段类似，但只限于代理服务器。

### 6.4.16. Range

告知服务器返回资源的指定部分。

### 6.4.17. Referer

告知服务器请求的原始资源的 URI。

### 6.4.18. TE

告知服务器希望接受的传输编码方式及相对优先级。可一次性指定多种内容编码方式。采用权重 q 值来表示相对优先级。

### 6.4.19. User-Agent

告知服务器用户代理程序的名称与版本。

## 6.5. 响应首部字段

### 6.5.1. Accept-Ranges

表明服务器是否能处理范围请求。可处理指定其为 bytes，反之则为 none。

### 6.5.2. Age

告知客户端，源服务器在多久前创建了响应。

### 6.5.3. ETag

ETag 告知客户端实体标识。它是一种将资源以字符串形式做唯一标识的方式。

强 ETag：不论实体发生多么细微的变化，都会改变其值。强 ETag 通常是基于文件的内容、最后修改时间、文件大小等属性进行计算的。具体的计算方法因服务器的实现而异

弱 ETag：只有资源发生根本改变，产生差异时才会改变。

### 6.5.4. Location

用于重定向，或者用于新资源创建。

### 6.5.5. Proxy-Authenticate

与 Authorization 字段类似，但只限于代理服务器。

### 6.5.6. Retry-After

告知客户端应该在多久之后再次发送请求。

### 6.5.7. Server

告知客户端当前服务器上安装的 HTTP 应用程序的信息。

### 6.5.8. Vary

指定获取资源时，相同字段值才能直接从缓存返回响应。

### 6.5.9. WWW-Authenticate

用于 HTTP 访问认证。

## 6.6. 实体首部字段

### 6.6.1. Allow

通知客户端能够支持 Request-URI 指定资源的所有 HTTP 方法。当服务端不支持请求方法时，会返回 405 状态码。

### 6.6.2. Content-Encoding

告知客户端实体主体采用何种内容编码方式。

### 6.6.3. Content-Language

告知客户端实体主体使用的语言。

### 6.6.4. Content-Length

告知客户端实体主体部分字节大小。

### 6.6.5. Content-Location

给出报文主体部分相对应的 URI。

### 6.6.6. Content-MD5

实体主体的报文摘要，用于校验实体主体是否发生变化。

### 6.6.7. Content-Range

告知客户端返回实体的部分范围请求。

### 6.6.8. Content-Type

告知客户端实体主体内对象的媒体类型。

### 6.6.9. Expires

告知客户端实体主体在什么时候过期。

### 6.6.10. Last-Modified

告知客户端实体最终修改的时间。

## 6.7 Cookie 相关的首部字段

Set-Cookie 响应首部字段，管理 Cookie 信息。

Cookie 请求首部字段，服务端接收到的 Cookie 信息。

### 6.7.1. Set-Cookie

**expires 属性**

发送 Cookie 的有效期。

**path 属性**

限制 Cookie 的发送范围的文件目录。

**domain 属性**

限制 Cookie 的发送范围的主机名。

**secure 属性**

限制 Web 页面仅在 HTTPS 安全通道发送 Cookie。

**HttpOnly 属性**

使得 JS 脚本无法读取 Cookie。防止 XSS 攻击。

### 6.7.2. Cookie

告知服务器 Cookie 信息。

## 6.8. 其他首部字段

-   X-Frame-Options：控制网站内容在其他 Web 网站的 Frame 标签内的显示。DENY 代表不允许任何网站 frame 加载，SAMEORIGIN 代表同源域名 frame 可以加载该页面。防止点击劫持。
- X-XSS-Protection：启用或关闭 XSS 过滤。
- DNT：Do Not Track 请求首部字段，告知服务器用户是否愿意接收来自浏览器的跟踪信息。
