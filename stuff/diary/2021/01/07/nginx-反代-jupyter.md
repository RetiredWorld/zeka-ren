---
date: 2021-01-08
title: Nginx 反代 jupyter
tags: []
---
Nginx 反代理 jupyter 可以让控制更灵活（并不。

为了安全，jupyter 有一些基础的限制，比如默认开在本地，不允许远端访问等等。要想使用 nginx 反代，必须加以设置。 

Nginx 的设置文件 [参考这篇](https://gist.github.com/cboettig/8643341bd3c93b62b5c2)。

添加所需 header 就没有问题了。

此外，jupyter 需要打开远端访问设置。首先初始化配置：

```bash
jupyter notebook --generate-config
```

初始化后的文件默认保存在 home 目录下的 `jupyter_notebook_config.py` 中。文件里面有很详细的注释了。对于开启 Nginx 访问，需要允许远端访问：

```python
c.NotebookApp.allow_remote_access = True
```

默认是通过 token 访问的，这样会在 url 后跟随一长串的 token,不美观，访问也不方便。为此设置密码访问：

```bash
jupyter notebook password
```

确认密码就好了。之后只要将域名，证书配置正确就能正常运行了。
