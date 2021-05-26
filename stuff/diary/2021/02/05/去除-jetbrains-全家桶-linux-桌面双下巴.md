---
date: 2021-02-05
title: 去除 JetBrains 全家桶 Linux 桌面双下巴
tags:
  - Linux
  - KDE
images:
  - src: 2021-02-05_11-50.png
    alt: 双下巴
  - src: 1.png
    alt: 解决
---
>  实际使用环境为 Arch KDE,KDE 桌面展示插件使用的是 [Window AppMenu Applet](https://github.com/psifidotos/applet-window-appmenu)。

在之前，不论是 PyCharm 还是 WebStorm， Goland 都能通过这个插件正常显示。但是通过某次更新后，都渐渐不能显示了。这个问题直接导致了双（三）下巴的出现（图一）。

在查找很久后，这个 [issue](https://youtrack.jetbrains.com/issue/JBR-2945) 解决了这个问题。

安装插件 [JavaFX Runtime for Plugins](https://plugins.jetbrains.com/plugin/14250-javafx-runtime-for-plugins),重启 IDEA 即可。

效果见图二

那么，还能不能再去掉一层呢？~~资本家还能不能进一步剥削呢？~~
- 在 KDE 桌面下，使用 `Win+H` 可以隐藏边框。通过这种方式可以使编辑器多显示一行代码。
- Jetbrains 全家桶还能将周围边框隐藏，从而再多获取半行空间。需要使用边框时双击 `Alt`（第二下需要按住不放） 即可重新呼出，松开即可重新释放。
- 如果你愿意，其实最顶上的自定义 header 也可以干掉（现在的 Windows 用户常干的事）。但是我有频繁查看内存与 CPU 占用的习惯，因此一般是不隐藏的。


~~《为了节省空间，我说不定连边框都能干掉》~~