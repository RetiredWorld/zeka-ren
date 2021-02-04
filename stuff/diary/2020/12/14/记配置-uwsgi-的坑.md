---
date: 2020-12-14
title: 记配置 uwsgi 的坑
tags:
  - 网络
---
如果用 python 部署服务器，网上绝大多数教程都是告诉你使用 uwsgi。uwsgi 允许你启用多个线程来调用你的 Django 或者 Flask 应用，性能可以得到很大提升。

问题在于，这玩意配置不是那么容易的。下面的部署环境为 Debian 或者 Ubuntu。

apt 可以直接装上 uwsgi,但是 uwsgi 不是专门为 python 准备的，要让 uwsgi 能正确运行我的 python 服务，我们还得安装 python 插件：

```bash
# 如果你使用的是 python2,那么应该安装 uwsgi-plugin-python
sudo apt install uwsgi uwsgi-plugin-python3
```

之后就是书写 uwsgi file,坑点已经标记出来了：

```ini
[uwsgi]
socket = 127.0.0.1:8000
chdir = /your/workplace
wsgi-file = /your/flask/entry/server.py
# flask 中 app = Flask() 对象
callable = app
processes = 1
master = true
# 插件,告诉 uwsgi 需要使用 python,需要指定 python 版本，下面指定为 3.7.*
plugin = python37
threads = 2
daemonize = uwsgi.log
pidfile = uwsgi.pid
buffer-size=32768
```

插件装好就可以了。