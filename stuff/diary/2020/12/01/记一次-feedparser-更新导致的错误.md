---
date: 2020-12-01
title: 记一次 feedparser 更新导致的错误
tags:
  - Python
---
一直将 [RSSHub](https://rsshub.app/) 作为爬虫源。为了解析，使用了 Python 的 `feedparser`库。


写好后就挂在服务器上，也没出啥错误。后来打算换一台服务器，于是将爬虫挂到了另一台服务器上。没想到居然出现了问题。排查后发现，居然是因为 feedparser 更新了！更新后会自动对敏感字符串进行转意，于是出现了这样的问题：

```text
# original
https://pbs.twimg.com/media/EoEtzXoUcAAkm3c?format=jpg&name=large
# processed by feedparser
https://pbs.twimg.com/media/EoEtzXoUcAAkm3c?format=jpg&amp;name=large
```


多了一个 `&amp;`。要修复直接添加一个 `.replace("&amp;", "&")` 就好了。


事后查看了一下 `feedparser` 仓库，发现从 16 年基本停止更新的库居然恢复更新了。原来版本为 `5.2.1`，更新后到了 `6.0.2`！


只能反思自己以前依赖管理没做好，要是当时用了 `pip freeze`，也不会出现这种问题。


看来还是得养成使用 `virtualenv`，`pip freeze` 的习惯。只能说相比 NPM 的包管理，我过于信任 pip 了。