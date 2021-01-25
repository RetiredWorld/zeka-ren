---
date: 2021-01-25
title: 替换 node-sass 为 dart-sass
tags: []
---
[在这里](https://flag.zeka.cloud/2020/12#%E8%B0%88%E4%B8%80%E8%B0%88%20node-sass%20%E7%9A%84%E5%9D%91) 曾提到过 node-sass 兼容性问题，对此官方的做法是换用 dart-sass。

替换只需要两行就行了：

```bash
yarn remove node-sass
# dart-sass package name 
yarn add sass 
```

安装会丝滑很多。
