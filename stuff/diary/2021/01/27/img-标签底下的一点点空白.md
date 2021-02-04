---
date: 2021-01-27
title: img 标签底下的一点点空白
images:
  - src: s.png
    alt: 图片没有占用全部空间，留出了一层空隙
tags:
  - CSS
  - 前端
---
最近突然发现站点的 img 标签不能占满全部空间，而是留下了一层空。指定 `height:100%` 没有效果。

搜了下，在 [这里](https://stackoverflow.com/questions/5804256/image-inside-div-has-extra-space-below-the-image) 找到了答案。只需将图片的 `display` 设置成 `block` 就好了。

简单来说，图片默认的 `display` 属性为 `inline` 而不是 `block`。这导致了其展示与文字类似（联想图片可以通过浮动设置文字环绕）。

默认的文字排版方式为 `baseline`，这个排版的影响一般只体现在 [西文](https://en.wikipedia.org/wiki/Descender) 中。因此图片多出来的部分恰恰就是它的小尾巴。因此另一种解决方式为设置 `vertical-align` 为 `bottom`。

