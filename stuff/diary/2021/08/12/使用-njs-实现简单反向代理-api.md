---
date: 2021-08-12
title: 使用 njs 实现简单反向代理 API
tags:
  - Nginx
---
之前一个 API 是部署在 CloudFlare Worker 上的。原则上是反向代理，但是由于逻辑是首先 `await` fetch 完成再返回，导致响应比较慢。

正好前几天页面挂了，趁着修补页面的机会顺便修改了一下。不过这次不打算使用 Worker，而是试试 njs。也就是在 Nginx 上部署 Javascript。

之前使用的 Nginx 镜像其实是 OpenResty，但是由于一直对 lua 了解不足，导致虽然安装了，但是没有写过相应脚本。

OpenResty 镜像中似乎没有 njs 模块~~废话~~，所以要使用首先需要切换到 Nginx 镜像。

脚本很容易：

```nginx
js_import path/to/scripts/script_name.js;
js_set $rev_name script_name.funcName;

server{
  ...
  location /path {
     proxy_pass $rev_name
  }
}
```

```javascript
const funcName = () => {
  ...
  return url;
};

export default {funcName}
```

在函数体中就能随意修改逻辑了。