---
date: 2021-04-26
title: 记一次 nignx 错误的配置导致 Certbot webroot 认证失败
tags:
  - 网络
  - Nginx
---
失败的配置文件是这样的：

```nginx
server {
        listen 80;
        listen [::]:80;

        server_name host;

        # enable lets encrypt webroot auth
        location /.well-known/acme-challenge/ {
                root /path/to/webroot;
        }

        return 301 https://$server_name:443$request_uri;
}
```

简单来说，实现了一个 301 跳转，将 http 定向到 https。当时为了省事直接将 return 写在了 server 块里，这样重定向效果是正确的。

但是这样会导致 nginx 直接忽视内部定义的其他 location 块，立即返回进行重定向。所以查看报错日志发现 acme challege 流量也被跑到了 443 口，而 443 口没有对应 acme 路由，导致失败。

将 return 包裹在 `location /` 块中即可：
```nginx
server {
        listen 80;
        listen [::]:80;

        server_name host;

        # enable lets encrypt webroot auth
                
        location /.well-known/acme-challenge/ {
                root /path/to/webroot;
        }

        location / {
                return 301 https://$server_name:443$request_uri;
        }
}
```

BTW，第一次如果是使用 standalone 获取的证书的话，那么 certbot 配置文件将无法找到正确的 werbroot。之后再需要通过 webroot 更新就需要通过 `--webroot-path` 指定更新路径。一次生效后将会写入配置，之后就不需要了
