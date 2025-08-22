---
layout: page
title: API Documentation
---

<div class="auth-note">

## 认证方式

本 API 使用基于 Cookie 的 Session 认证机制。用户需要先通过 `/api/login` 端点进行身份验证，成功后服务器会在响应中设置一个 Session Cookie。后续的 API 请求需要携带这个 Cookie 以证明身份。

对于需要认证的端点，如果请求中没有有效的 Session Cookie，服务器将返回 401 (Unauthorized) 错误。

</div>

<ClientOnly>
  <SwaggerUI url="/dst-admin-go-docs/api/swagger.json" />
</ClientOnly>