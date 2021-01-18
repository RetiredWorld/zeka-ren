---
date: 2021-01-18
title: Ubuntu 配置 dhcp
tags: []
---
> Ubuntu Server 18 LTS

试了试刀片服务器，由于安装的时候没有链接网络，所以安装的时候没有进行网络配置。安装好后虽然能上去，但是不能正常上网。

在 Ubuntu 17 之后，配置网络的文件改为了 `netplan`。

```bash
# automatically generate config file
# file locate at /etc/netplan/*.yml
sudo netplan generate
```

生成的配置就是 `.yml` 文件。
在修改这个文件前，首先要检查网络接口名称，使用 `ifconfig -a` 指令可以看到所有网络接口，直接运行 `ifconfig` 可以看到正在运行的接口。

这台服务器有四个网口，所以在使用的时候需要注意区分。在使用网口一（`ifconfig` 得到名称为 eno1）的时候需要配置网口一。

```yml
network:
  ethernets:
    eno1:
      addresses: []
      dhcp4: true # 开启 dhcp,使用动态 ip 分配
    # other configurations
  version: 2
```

之后就是检查与应用了：

```bash
sudo netplan try
# success
sudo netplan apply
```

之后就能配置完毕了。