import{_ as a,c as e,o as t,a2 as l}from"./chunks/framework.CWo5xHl-.js";const u=JSON.parse('{"title":"7. HTTPS","description":"","frontmatter":{},"headers":[],"relativePath":"network/https.md","filePath":"network/https.md"}'),i={name:"network/https.md"},r=l('<h1 id="_7-https" tabindex="-1">7. HTTPS <a class="header-anchor" href="#_7-https" aria-label="Permalink to &quot;7. HTTPS&quot;">​</a></h1><h2 id="_7-1-http-的缺点" tabindex="-1">7.1 HTTP 的缺点 <a class="header-anchor" href="#_7-1-http-的缺点" aria-label="Permalink to &quot;7.1 HTTP 的缺点&quot;">​</a></h2><ul><li>通信使用明文，内容可能被窃听</li><li>不验证通信方的身份，有可能冒充</li><li>无法证明报文的完整性，有可能被篡改</li></ul><h3 id="明文可能会被窃听" tabindex="-1">明文可能会被窃听 <a class="header-anchor" href="#明文可能会被窃听" aria-label="Permalink to &quot;明文可能会被窃听&quot;">​</a></h3><p>HTTP 本身不具备加密功能，HTTP 报文使用明文方式发送。</p><ul><li>TPC/IP 是可能呗窃听的网络。互联网上的任何角落都存在通信内容被窃听的风险。</li><li>加密处理防止被窃听。【通信加密】通过 SSL/TLS 协议，加密通信内容。【内容加密】对 HTTP 报文进行加密。</li></ul><h3 id="通信方被伪装" tabindex="-1">通信方被伪装 <a class="header-anchor" href="#通信方被伪装" aria-label="Permalink to &quot;通信方被伪装&quot;">​</a></h3><ul><li>任何人都可发送请求。HTTP 不确认通信方，会存在隐患：无法确认 Web 服务器或者客户端是否被伪装、通信方是否具备访问权限、无法判断请求来源、无法阻止海量请求。</li><li>通过 SSL 验证对手的证书，判断通信方的真实意图。</li></ul><h3 id="无法证明报文完整性" tabindex="-1">无法证明报文完整性 <a class="header-anchor" href="#无法证明报文完整性" aria-label="Permalink to &quot;无法证明报文完整性&quot;">​</a></h3><ul><li>请求过程中报文被篡改，比如中间人攻击。</li><li>常用的 MD5 和 SHA-1 算法，用来确认文件的数字签名方法。SSL 提供认证和加密处理及摘要功能。</li></ul><h2 id="_7-2-https-协议" tabindex="-1">7.2 HTTPS 协议 <a class="header-anchor" href="#_7-2-https-协议" aria-label="Permalink to &quot;7.2 HTTPS 协议&quot;">​</a></h2><h3 id="_7-2-1-加密处理" tabindex="-1">7.2.1 加密处理 <a class="header-anchor" href="#_7-2-1-加密处理" aria-label="Permalink to &quot;7.2.1 加密处理&quot;">​</a></h3><p>在 HTTP 上加入加密处理和认证机制，我们将其称之为 HTTPS。</p><h3 id="_7-2-2-通信" tabindex="-1">7.2.2 通信 <a class="header-anchor" href="#_7-2-2-通信" aria-label="Permalink to &quot;7.2.2 通信&quot;">​</a></h3><p>HTTP 通信接口被 SSL/TLS 协议所替代。先进行 SSL 通信，再由 SSL 协议与 TCP 通信。</p><h3 id="_7-2-3-加密技术" tabindex="-1">7.2.3 加密技术 <a class="header-anchor" href="#_7-2-3-加密技术" aria-label="Permalink to &quot;7.2.3 加密技术&quot;">​</a></h3><p>SSL 采用一种公开密钥加密技术，确保通信的机密性。</p><ul><li><p>共享密钥的问题</p><p>加密和解密同用一个密钥称为共享密钥加密，或者称对称加密。 如果通信被监听，密钥可能被落入攻击者手中，导致通信被窃听。</p></li><li><p>公开密钥加密</p><p>使用公开密钥加密方式，发送密文的一方使用对方的公开密钥进行加密处理，对方收到被加密的信息后，再使用自己的私有密钥进行解密。利用这种方式，不需要发送用来解密的私有密钥，也不必担心密钥被攻击者窃听而盗走。</p></li><li><p>HTTPS 混合加密机制</p><p>HTTPS 采用共享密钥加密和公开密钥加密两者并用的混合加密机制。</p></li></ul><h3 id="_7-2-4-证书" tabindex="-1">7.2.4 证书 <a class="header-anchor" href="#_7-2-4-证书" aria-label="Permalink to &quot;7.2.4 证书&quot;">​</a></h3><p>使用由数字证书认证机构（CA）颁发的公开密钥证书，确保通信方身份的真实性。</p><p>数字证书的业务流程：服务器的运营人员项 CA 机构提出申请，CA 机构对公开密钥进行数字签名，并将证书发送给服务器。</p><p>数字证书的公开密钥事先植入到浏览器，客户端拿到服务端的证书后，验证公钥证书上的数字签名，如果验证通过，则证明证书的真实性。</p><h3 id="_7-2-5-https-通信流程" tabindex="-1">7.2.5 HTTPS 通信流程 <a class="header-anchor" href="#_7-2-5-https-通信流程" aria-label="Permalink to &quot;7.2.5 HTTPS 通信流程&quot;">​</a></h3><p>步骤 1: 客户端通过发送 Client Hello 报文开始 SSL 通信。报文中包 含客户端支持的 SSL 的指定版本、加密组件(Cipher Suite)列表(所 使用的加密算法及密钥长度等)。</p><p>步骤 2: 服务器可进行 SSL 通信时，会以 Server Hello 报文作为应 154 答。和客户端一样，在报文中包含 SSL 版本以及加密组件。服务器的 加密组件内容是从接收到的客户端加密组件内筛选出来的。</p><p>步骤 3: 之后服务器发送 Certificate 报文。报文中包含公开密钥证书。</p><p>步骤 4: 最后服务器发送 Server Hello Done 报文通知客户端，最初阶段的 SSL 握手协商部分结束。</p><p>步骤 5: SSL 第一次握手结束之后，客户端以 Client Key Exchange 报 文作为回应。报文中包含通信加密中使用的一种被称为 Pre-master secret 的随机密码串。该报文已用步骤 3 中的公开密钥进行加密。</p><p>步骤 6: 接着客户端继续发送 Change Cipher Spec 报文。该报文会提 示服务器，在此报文之后的通信会采用 Pre-master secret 密钥加密。</p><p>步骤 7: 客户端发送 Finished 报文。该报文包含连接至今全部报文的 整体校验值。这次握手协商是否能够成功，要以服务器是否能够正确 解密该报文作为判定标准。</p><p>步骤 8: 服务器同样发送 Change Cipher Spec 报文。 步骤 9: 服务器同样发送 Finished 报文。</p><p>步骤 10: 服务器和客户端的 Finished 报文交换完毕之后，SSL 连接 就算建立完成。当然，通信会受到 SSL 的保护。从此处开始进行应用 层协议的通信，即发送 HTTP 请求。</p><p>步骤 11: 应用层协议通信，即发送 HTTP 响应。</p><p>步骤 12: 最后由客户端断开连接。断开连接时，发送 close_notify 报文。</p><ul><li>SSL 和 TLS</li></ul><p>SSL 最初是 Netscape 公司为 HTTPS 通信而开发的（SSL 3.0 前的版本），后来被 IETF 标准化。IETF 的工作组叫做 TLS(Transport Layer Security)，TLS 是 SSL 的后续版本。</p><ul><li><p>SSL 速度</p><p>HTTPS 比 HTTP 慢 2-100 倍。</p><ul><li>SSL 通信部分消耗网络资源。</li><li>SSL 需要加密处理，消耗 CPU 及内存资源。</li></ul></li></ul>',37),p=[r];function h(o,S,n,s,T,c){return t(),e("div",null,p)}const P=a(i,[["render",h]]);export{u as __pageData,P as default};