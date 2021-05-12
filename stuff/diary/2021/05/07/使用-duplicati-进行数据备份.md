---
date: 2021-05-07
title: 使用 Duplicati 进行数据备份
tags:
  - Linux
---
Duplicati 是一款开源的备份软件~~开源拖拉机所以 UI 有点丑~~。使用它可以很方便的进行备份。

除了支持按照时间自动，手动，增量备份外，它的一个特点是支持加密，并提供了数量众多的功能（支持各大主流云盘，国内基本不用想了，除非部署在外服）。



# 准备远程目录

本机目录只需要之后在 docker-compose 上挂载即可。但是这样只能备份本机目录，如果有多台服务器的话，必须逐一部署，这样会造成管理上的不便。

因此需要进行远程挂载。对于 Linux 用户，可选的方案是 nfs 与 sshfs，后者除了提供挂载，还能顺便提供 ssh 功能。由于我的树莓派是一台跳板机，可以很方便的使用 sshfs 挂载到本地：

```bash
sshfs [user@]host:[dir] mountpoint
```

为保证无密码，最好使用非密码登陆。

考虑到 ssh 可能有中断的问题，需要事先调整好参数发送心跳并进行自动重连（可以看 [这里](https://flag.zeka.cloud/2021/3#SSH%20%E4%BD%BF%E7%94%A8%E5%B0%8F%E8%AE%B0)）。

挂载后相当于出现了一台 IO 其慢无比的石头盘，其行为与普通磁盘无异。



# 部署

使用 docker 部署是最为快捷的方法。单容器也可以使用 docker-compose 方便的进行管理：

```yaml
version: "3"
                           
services:
        duplicati:
                # seems my upstream has some problem, change it to
        	# latest if you're ok.
                image: duplicati/duplicati:canary
                container_name: "duplicati"
                # webui port
                ports:
                        - 8200:8200
                volumes:
                		- /path/to/local/duplicati/config/dir:/data
                		- /path/to/local/backup/dir:/path/to/mount/point
```

docker 在这里的缺点在于目录需要手动挂载，要保证其能正常使用。其中最重要的 `/data` 目录保存了 duplicati 的配置文件，可以考虑挂载自己的目录。

> 个人感觉字体有点太大了，整体色调有点淡（文字甚至都是灰色的），给人感觉不是很舒服。
>
> 这就是开源拖拉机吗，爱了爱了。



# 设置访问控制

如果准备暴露在公网上，密码是必不可少的，你可以在 `settings` 中配置密码，同时，不要忘了配置好证书。

但是对于这样的私人服务，更好的方案是通过 ssh 隧道，一条可用的简单配置为：

```bash
ssh -CTNL local_host:local_port:remote_host:remote_port root@host
```

这会将端口映射到本地，好处是不需要考虑证书配置，不需要额外开启端口，而且利用 ssh 可以保证安全性。缺点是你必须具有 ssh 权限，并且能进行转发。可能的不适用场景为手机等。

Duplicati UI 还是很直观的，按照步骤一步一步设置即可。



# 设置钩子

Duplicati 本身提供了大量可定制的 `action`，用户可以在备份完成前后执行一系列行为。常用行为为发送邮件，执行脚本等等。

由于我有自己的提醒系统，需要发送 http 报文到指定服务器，因此我选择使用 `run-scripts-after` 钩子发送简短信息。如果需要查看详细信息，进入管理界面是更好的选择。

官方有提供 [模板](https://github.com/duplicati/duplicati/blob/master/Duplicati/Library/Modules/Builtin/run-script-example.sh)，但是我似乎没有找到文档描述所有可用变量，只能在论坛上搜到零散的结果。

```bash
#!/bin/bash
# check action type
if [[ "$DUPLICATI__OPERATIONNAME" == "Backup" ]]
then
        exit(0)
fi
# check if success
if [[ "$DUPLICATI__PARSED_RESULT" == "Success" ]]
then
        curl -v --header "Content-Type: application/json" -X POST --data "YOUR BODY" https://example.com
        exit 0
else
        curl -v --header "Content-Type: application/json" -X POST --data "YOUR BODY" https://example.com
        exit 0
fi
```

之后在每一条备份最后的 `Advanced options` 找到 `run-script-after`，然后输入脚本路径。注意脚本路径必须在 Duplicati 容器可访问范围内。

> 由于是 docker 部署，所以可执行脚本受到 Duplicati 容器内限制，比如 `python3` 是不存在的，但是 `curl` 是可用的。



# 备份还原
进入 `restore` 可以将文件还原到指定位置，按照操作进行即可。

注意还原是不需要输入密码的，因为 admin 已经帮我们完成了解密。那么之前我们设置的加密到底在有什么用呢？我们打开备份位置，出现的都是 `.zip.aes` 文件（如果使用默认的 `aes-256` 加密的话）。而且在之前配置中我们设置了单个 volume 的大小为 `50M`，所以它被分到了多个不同大小的 volume 中。

这样的话通过管理界面可以完成还原。但是如果备份页面不可用（或者数据库出现了问题），应该如何手动还原？
[官方](https://duplicati.readthedocs.io/en/latest/appendix-b-how-the-restore-process-works/)有介绍 restore 过程，可以照着进行相应还原操作，这里解压 `.aes` 文件就需要之前的密钥了。

> 这比较复杂，因为它不是我想象中的一个 `aes` 加密的 `.tar.gz` 文件，而是被分为了很多块。要进行完全解密首先得解压 `dlist` 文件，然后按照列表顺序进行组合。这个过程还可能遇到大文件的情况（比如部分大文件超过了 volume 大小，一个文件可能分散在不同的 volume 中），就需要结合不同情况进行处理了。

总之，使用 Duplicati GUI 完成还原可以极大减小心智负担，GUI 不但提供方便的多备份管理，还做到仅还原部分文件等等操作。

所以，正常使用的话，还是别随意手动修改配置文件吧。

