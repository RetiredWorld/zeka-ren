---
date: 2021-01-24
title: 修复 KDE 主题 WhiteSur Aurorae 底部边界透明问题
images:
  - alt: 主题透明底部
    src: screenshot_20210124_100323.png
  - src: screenshot_20210124_101025.png
tags: []
---
对于 4k 屏幕来说，各种主题兼容性都不太好，往往存在缩放问题。为此 [WhiteSur Aurorae](https://store.kde.org/p/1398835/) 主题提供了不同的缩放比（1.25, 1.5, 2）。

对于我的屏幕，1.25 倍缩放比是合适的，但是出现了透明的边框。而作者提供的另一种主题 Sharp 消去了底部边框，所以没有这个问题。但是很可惜的是 Sharp 主题没有提供不同的缩放比，也就是说要么把 Sharp 改造成 1.25 倍的，要么将 1.25 倍的白边修复。

打开主题文件夹，发现主要装饰是一个矢量图（decoration.svg）。不知道是出于疏忽还是怎么，这个矢量图底部是透明的，于是一下子就找到了问题，只要修改填充颜色即可。

由于手头没有 SVG 编辑工具，于是暴力拿浏览器打开，找到相应的样式：

```css
opacity: 0.6;
fill: #f5f5f5;
fill-opacity: 1;
stroke: none;
stroke-width: 1.41421;
```

不知为何设置了 opacity，以及与主题不同的颜色，修改成如下即可：

```css
opacity: 1;
fill: #ffffff;
fill-opacity: 1;
stroke: none;
stroke-width: 1.41421;
```

这样的地方一共需要修改三处，修改完成后重启就完成了。

> 但是这样还是有一个 bug，当处于 deactivate 模式时，透明度又来了。