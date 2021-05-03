---
date: 2020-12-14
title: 记一次 netcat 不同来源导致的错误
tags:
  - Linux
---
环境为 Arch Linux，使用 pacman 安装。

为了让 SSH 走 SOCKS5 代理，需要使用 nc(netcat) 指令。画风大概这样：

```text
Host name
  Hostname your.name
  User yourUser
  ProxyCommand nc -X 5 -x 127.0.0.1:port %h %p
```

> netcat 是很强大的武器，可惜由于太菜只能用到最简单的功能。

自然要用无敌的 pacman 安装啦，快乐的输入 `sudo pacman -S netcat`。但是安装的时候出现了选择来源的提示，让你选择 bsd 版本或者 gnu 版本（默认是 gnu 版本的）。

结果坏事了，这个 nc 指令既不能识别 `-X` 指令，对 `-x` 的解析也是错误的（出现 `Error: Couldn't resolve host "127.0.0.1:<port>` 报错）。

> 印象中还有这个问题的是 unzip。由于恶臭 Windows 国内使用恶臭的国标编码，所以任何创建的压缩包默认是非 Unicode 编码的。而 `.zip` 文件本身没有任何用来标识编码的符号位。这直接导致了 Windows 压缩包在 Linux 乱码
> 虽然 unzip 官方知道这个问题，但是为了惩治不遵守规范的 Win，故意不为 zip 添加指定编码选项。在国内遇到中文编码，还得安装其他版本的 unzip。~~更好的方法是一起 boycott Windows~~

输入 `-h` 指令，发现根本没有 `-X` 选项。

思考了一下，决定安装 bsd 版本的 netcat。

```bash
sudo pacman -Qs netcat  # 查看包名
# local/gnu-netcat 0.7.1-8
sudo pacman -R gnu-netcat  # 移除
sudo pacman -S netcat
# 选择 bsd 版本即可
# 或者直接 -S openbsd-netcat
sudo pacman -Qs netcat
# local/openbsd-netcat 1.217_2-1
```

然后问题解决了。这不是第一次遇到这个问题，之前使用 rename 的时候遇到不同版本导致指令不同的问题。

查了一下资料，发现 nc 有很多变种，也就是我们安装的 nc 很少是原版的，常用的变种除了 OpenBSD 之外，各大社区也大多有自己变种。