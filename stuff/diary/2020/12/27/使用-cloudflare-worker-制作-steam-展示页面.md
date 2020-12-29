---
date: 2020-12-28
title: 使用 Cloudflare Worker 制作 Steam 展示页面
images:
  - src: photo_2020-12-28_02-01-07.jpg
tags: []
---
参考 [这篇](https://dogcraft.top/archives/106/)。

为了强行使用 Serverless，我使用 cf 的 worker 反代了 steam 的 api。

原理为在 worker 上写 fetch，然后直接将 worker url 作为 api。

这么做的原因在于 Steam API 的调用需要 apikey 与 userid，这两个按道理来说似乎不是应该随意公开的信息（其实能获得的东西有限，而且没有修改权限）。

结果发布在：[https://flag.zeka.cloud/steam](https://flag.zeka.cloud/steam)。

> 由于 PWA 的缓存问题，你可能需要多刷新几次才能看到内容。