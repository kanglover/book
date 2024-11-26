# 8. 确认用户身份认证

## 8.1 用户身份认证

HTTP/1.1 使用的认证方式：

-   BASIC 认证（基本认证）
-   DIGEST 认证（摘要认证）
-   SSL 客户端认证
-   FormBase 认证（基于表单的认证）

## 8.2 BASIC 认证

BASIC 认证(基本认证)是从 HTTP/1.0 就定义的认证方式

认证步骤：

1. 当请求的资源需要 BASIC 认证时，服务器会随状态码 401 Authorization Required，返回带 WWW-Authenticate 首部字段的响应。 该字段内包含认证的方式(BASIC) 及 Request-URI 安全域字符串 (realm)。
2. 接收到状态码 401 的客户端为了通过 BASIC 认证，需要将 用户 ID 及密码发送给服务器。发送的字符串内容是由用户 ID 和密码 构成，两者中间以冒号(:)连接后，再经过 Base64 编码处理。
3. 步骤 3: 接收到包含首部字段 Authorization 请求的服务器，会对认证 信息的正确性进行验证。如验证通过，则返回一条包含 Request-URI 资源的响应。

BASIC 认证使用上不够便捷灵活，且达不到多数 Web 网站期望的安全性等级，因此它并不常用。

## 8.3 DIGEST 认证

为弥补 BASIC 认证存在的弱点，HTTP/1.1 起有了 DIGEST 认 证。 DIGEST 认证同样使用质询 / 响应的方式 (challenge/response)，但不会像 BASIC 认证那样直接发送明文密码。

认证步骤：

1. 请求需认证的资源时，服务器会随着状态码 401 Authorization Required，返回带 WWW-Authenticate 首部字段的响应。该字段内包含质问响应方式认证所需的临时质询码(随机数， nonce)。nonce 任意随机字符串，通常由 Base64 编码的十六进制数的组成形式，但实际内容依赖服务器的具体实现。
2. 接收到 401 状态码的客户端，返回的响应中包含 DIGEST 认证必须的首部字段 Authorization 信息。首部字段 Authorization 内必须包含 username、realm、nonce、uri 和 response 的字段信息。其中，realm 和 nonce 就是之前从服务器接收到的响应中的字段。response 也可叫做 Request-Digest，存放经过 MD5 运算后的密码字符串，形成响应码。
3. 接收到包含首部字段 Authorization 请求的服务器，会确认认 证信息的正确性。认证通过后则返回包含 Request-URI 资源的响应

DIGEST 认证和 BASIC 认证一样，使用上不那么便捷灵活，且仍达不到多数 Web 网站对高度安全等级的追求标准。因此它的适用范围也有所受限。

## 8.4 SSL 客户端认证

SSL 客户端认证是借由 HTTPS 的客户端证书完成认证的方式。

认证步骤：

1. 接收到需要认证资源的请求，服务器会发送 Certificate Request 报文，要求客户端提供客户端证书。
2. 用户选择将发送的客户端证书后，客户端会把客户端证书信息以 Client Certificate 报文方式发送给服务器。
3. 服务器验证客户端证书验证通过后方可领取证书内客户端的公开密钥，然后开始 HTTPS 加密通信。

使用 SSL 客户端认证需要用到客户端证书。而客户端证书需要支付一定费用才能使用。

## 8.5 表单认证

Web 应用程序各自实现基于表单的认证方式。客户端发送的用户 ID 和密码与之前登录过的信息做匹配来进行认证。

一般会使用 Cookie 来管理 Session。

1. 客户端把用户 ID 和密码等登录信息放入报文的实体部分，以 POST 方法把请求发送给服务器。
2. 验证客户端发送过来的登录信息进行身份认证，然后把用户的认证状态与 Session ID 绑定后记录在服务器端。返回响应时，会在首部字段 Set-Cookie 内写入 Session ID。
3. 客户端接收到从服务器端发来的 Session ID 后，会将其作为 Cookie 保存在本地。下次向服务器发送请求时，浏览器会自动发送 Cookie。
