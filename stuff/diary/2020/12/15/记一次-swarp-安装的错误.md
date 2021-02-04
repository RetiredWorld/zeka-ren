---
date: 2020-12-15
title: 记一次 swarp 安装的错误
tags:
  - Linux
---
> 安装的是 astromatic 的图片处理软件 swarp，不是 X server 的 swarp，与之类似的还有 docker。安装环境为 Ubuntu20。

[官方](https://www.astromatic.net/software/swarp) 显然是标准的科研大佬，对其他 trival 的东东看不上眼。响应式没有不说，证书直接拿的 DNS 服务商提供的，关键是图片也没有加 TLS。这明显的体现在官方为 Ubuntu 配置的 source 使用的是过时的 TLS1.0/TLS1.1 协议，直接导致 apt source 不能使用。

没办法，只能从源码安装了。直接从首页下载的 source 版本过低~~能用才不正常~~。查了许久，终于发现官方在极为隐蔽的角落放置了一个 [Github](https://github.com/astromatic/swarp) 仓库。

按照说明安装即可：

```bash
# 先无脑来一下
sudo apt update
sudo apt install build-essential git 
git clone https://github.com/astromatic/swarp.git && cd swarp
./autogen.sh
# configure 很可能挂，缺啥补啥即可。
./configure
make
# 测试
./src/swarp
# swarp [image 1] ... 好了
sudo make install
```