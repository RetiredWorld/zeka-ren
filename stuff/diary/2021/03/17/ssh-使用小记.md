---
date: 2021-03-17
title: SSH 使用小记
tags:
  - Linux
---
> 以下为个人使用小结，仅供参考。

SSH 分为客户端与服务端，需要尽可能保证最新以防止可能存在的安全漏洞。不同的发行版可能安装包名不一样。大部分发行版自带 SSH，并系统自启。对于不自带的（如安卓上的 Termux），常用的包名为 `openssh`。



## ssh-keygen

默认登陆为密码登陆，这既麻烦又不安全。对于个人用户，使用密钥登陆是最佳选择（企业等可能更倾向于证书登陆，因为这样可以方便控制授权）。

`ssh-keygen` 指令可以生成登陆用的密钥。最简单的使用直接在命令行输入 `ssh-keygen` 然后一路回车即可。最后生成的公钥位于 `~/.ssh/id_rsa.pub`，私钥位于 `~/.ssh/id_rsa`。

公钥可以随意给，但是私钥是绝对不能给的（友（？）情的最高境界是交换私钥）。千万不要做出不小心上传私钥的蠢事。

密钥对可以生成多次，在不同机器也可以生成很多对不同密钥。但是显然多对密钥很难以管理，所以一个比较常用的方法是生成一个密钥对常用，然后妥善保管好私钥，通过统一的公钥管理多台服务器或者做其他事情。



## ssh-copy-id

生成后需要上传。正常的上传逻辑为首先用密码登陆服务器，然后在 home 目录下创建 `~/.ssh/authorized_keys` 文件，注意 `.ssh` 文件夹权限应为 700, `authorized_keys` 应为 600。拷贝之前生成的 `id_rsa.pub` 到 `authorized_keys` 文件中保存即可。

使用 `ssh-copy-id` 可以简化这个过程。举例来说，希望将公钥上传到 `192.168.1.12` 的 root 账户上，只需下面一行即可：

```bash
ssh-copy-id root@192.168.1.12
# enter password
```

输入密码后即可自动创建并写入密钥。



## sshd_config

登陆服务器后，就需要修改 SSH server 参数。一般情况下 SSH server 配置文件位于 `/etc/ssh/sshd_config`。最常见的修改为：

```text
# edit your port
Port 1111
PermitRootLogin no
```

`Port` 修改 ssh 运行端口，以防止针对默认 22 端口的恶意扫描（这不代表修改端口就绝对安全，因为端口扫描仍然有可能试探出你的端口，但是能提高安全性）。

`PermitRootLogin` 设置为 `no` 以阻止对 root 账户的任何登陆。设置为 `PermitPassword` 则表示允许证书等方式登陆。在设置这个参数前最好保证已经上传密钥到 root 账户，以免后续出现需要 root 登陆而没办法登陆的问题。

安全起见，直接封禁 root 登陆是比较保险的方法。~~如果必须要使用 root，可以考虑 `sudo su`。~~

如果无法登陆可能需要通过面板上去了。

修改完后需要重启 sshd 服务：

```bash
# add sudo if you arent root
systemctl restart sshd

# for old Ubuntu
service sshd restart
```

你可以放心重启，而不用担心因修改端口而导致当前的连接丢失，但是之后重新连接就会应用新的配置了。



## config

服务器设置完成，接下来需要修改自己的客户端。客户端默认配置文件位于 `~/.ssh/config`。

设置教程很多，就不重述了，我个人使用会在最开头加入下面常用设置：

```text
Host *
        ServerAliveCountMax 8
        ServerAliveInterval 12
        LogLevel INFO
```

这主要避免 SSH 无故断开导致命令行卡死。

前两项配置为每 12 秒发送一次心跳包来确认连接可用，如果连续 8 次心跳包发送失败，则认为连接断开。有了这两行，基本上你的 ssh 连接不会断开，也为下面的 `sshfs` 提供便利。

`LogLevel DEBUG` 会在连接的时候打印 debug 信息（然而本身没有意义，因为我们并不调试 ssh），开启的好处是对于连接不太稳定的服务器，可以了解卡在哪里，否则 ssh 后没有反馈感觉有点难受。坏处是会打印大量无关信息。所以还是关掉了。

有时我们 SSH 卡住了或出现了其他 bug，但是不知道问题出在哪，可以通过 `-v`，`-vv`，`-vvv` 三个参数来进行不同等级 debug。

要使用代理，常用设置为（假设代理位于 127.0.0.1:6666, 注意没有验证）：

```text
ProxyCommand nc -x 127.0.0.1:6666 %h %p
```

`nc` 为 `netcat` 的简写。对 Arch，默认似乎没有安装这个包，安装有个小坑在于有多个同名包，你应该选择 `openbsd-netcat` 包（具体可见 [这里](https://flag.zeka.cloud/2020/12#%E8%AE%B0%E4%B8%80%E6%AC%A1%20netcat%20%E4%B8%8D%E5%90%8C%E6%9D%A5%E6%BA%90%E5%AF%BC%E8%87%B4%E7%9A%84%E9%94%99%E8%AF%AF)）。

> 对国外服务器设置国外代理有加速功能。这听起来似乎没有道理，一条原因是运营商会对 SSH 流量进行 Qos，而代理往往有 HTTP 伪装，相对 SSH 流量具有更高优先级，可以减少运营商丢包，从而起到加速功能。



## sshfs 与 scp

ssh 除了登陆服务器，还能进行文件传输。有了他们就可以摆脱使用 `filezilla` 等 ftp 文件的麻烦，而专心在命令行完成我们的操作。他们的协议底层是 `ftp`，但是利用 ssh 进行了授权。

从本地上传一个文件到 Host 为 server 的服务器：

```
scp path/to/file server:path/to/server
```

sshfs 远程挂盘：

```
sshfs /mount/point server:/folder/to/mount
```

之后就可以使用 `mv`，`cp` 以及 `rm` 来像操作本地文件一样操作远程文件了。

你还能通过 `df` 指令查看使用情况（如果你的 ssh 链接不好，可能会存在卡顿情况）。

上述提到的修改 `ServerAliveInterval` 可以减少挂载磁盘无响应情况，从而避免命令行卡死。

zsh 的补全能很好的处理远程挂载的磁盘。这是好事，同时也是坏事，因为在补全时需要 ssh 访问远程磁盘，可能导致在补全时出现卡顿。

## ssh 端口转发
转发分为本地转发与远端两种。简单来说，端口转发就是开通两台机器两个端口的连通，依据 ssh 发起对象分为本地与远程两种。
利用 ssh 的良好加密特性，可以很好的进行内网穿透（需要配置好心跳与重试，否则在不稳定情况下可能出现连接不稳定的情况）。
国内听得多的应用为 frp，但是 frp 要求每台服务器安装相同版本服务端或者客户端，比较苛刻。而大部分情况 ssh 是开箱即用的，使用上无疑方便很多。
frp 的好处是可以通过配置文件进行配置，还有很多额外功能（比如证书支持等）。

> 就安全性来说，配置好证书的 SSH 经过无数人的考验，往往比偏个人向开发的 frp 成熟，所以更推荐使用方便且安全的 SSH。此外， SSH 有漏洞发现最好尽早打上补丁修复。

本地转发（将本地端口转发到远端）：
```bash
ssh -CTNL local_host:local_port:remote_host:remote_port root@server
```

转发到远端：
```bash
ssh -CTNR remote_host:remote_port:local_host:local_port root@server
```

此外，还能作为代理服务器使用（将指定端口的数据发送到远端某个端口）：
```bash
ssh -D 8080 root@proxy_machine -p 8081
```