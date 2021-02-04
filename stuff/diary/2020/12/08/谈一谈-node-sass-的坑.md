---
date: 2020-12-08
title: 谈一谈 node-sass 的坑
tags:
  - 前端
---
> 这是在 Linux 开发的经验，可能不太适用其他环境。

使用框架开发，就离不开 node 环境，就离不开 npm 包管理器。
由于众所周知的原因，使用 npm 非常容易卡死，如果你在网上搜索，大家给你的解释是：换源。

```bash
npm config set registry https://registry.npm.taobao.org
```

在大部分情况下，这足以解决问题。但是任何使用过的人都知道，问题往往没有这么简单。网上描述的换源即起飞的情况似乎并没有出现。npm 依旧卡死，完全不想理你。

对此的解决办法很简单：使用 yarn。yarn 最大的特点是允许多线程下载包，所以你安装包的速度是 npm 的几倍。而且 yarn 的安装界面比 npm 更清晰，指令语义化更好，更符合逻辑（yarn 默认安装到 dependency,符合直觉）。关键是，yarn 多线程下载还附带很强的超时重试功能，这极大的方便了弱网（确信）环境的安装。

但是，这还只是痛苦的开始。对我来说，主要是和 node-sass battle。没错，node-sass 日常翻车，而且最近的 5.0.0 更新更是出现了大量问题。

node-sass 底层的 SASS 编译器是 C 写的，也就是说需要如 python2 之类的编译环境。对于正常 Linux 环境，往往自带，但是在 Docker,其他平台来说，就不是那么容易满足了。而且，源码编译用户体验也不好

好在 node-sass 只需要适配 node 环境，为此官方提供了编译好的二进制。这也带来了问题：二进制是依赖 node 编译的。如果 node 版本改变，就需要重新编译。

[官方](https://github.com/sass/node-sass#node-version-support-policy) 给出了适配的环境列表。

举个例子，如果你的 node 版本为 15,node-sass 版本为 5.0+，那么官方提供好了编译好的文件，安装 node-sass 的时候就会直接拉取文件，跳过编译过程。反之，如果你的 node 版本为 15，而 node-sass 版本为 4.14,那么就不符合官方要求（只有 node-sass5 支持 node15），这种情况，如果你要安装，就会拉取源码在本地编译，这就需要大量依赖。

现在问题是，Arch linux 会默认更新到最新版本，所以我现在的 node 版本是 15.3，需要 node-sass5 以上才能支持。而对于大部分项目来说，node-sass 是不可能升级到 5 的，因为升级到 5 意味着不支持 node14 及以下，而他们有着大量用户。

所以，全局 node 版本为 15,项目版本 node-sass 保留在 4。所以每次都需要重新编译（当然，缓存可以帮大忙），这也极大的拖慢了安装速度。

但是对 docker,强求安装环境完备几乎不可能，为此需要根据 node-sass 版本选择 node 版本的 docker。这样就能直接利用官方编译好的镜像。

你以为这就完了么？ Too Simply！

编译好的二进制文件不小，要命的是他不是 npm 的包，所以前面设置的淘宝镜像不起作用。你将直接从国外拉取，于是，，，

但是淘宝也料到了这一点，于是贴心的提供了 node-sass 源，简单来说，你只需要这样：

```bash
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
# or
export sass_binary_site=http://cdn.npm.taobao.org/dist/node-sass
```

这一点 [官方也贴心的给出了](https://github.com/sass/node-sass#install-from-mirror-in-china)。

简单来说，选好 node 版本与 node-sass 版本，不要随意升级（不升级，就永远不会出问题.webp）。

