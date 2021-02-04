---
date: 2020-12-16
title: 年轻人的第一个 Github Actions
tags:
  - 网络
---
写了一个简单的 Githb Actions,每次 pull 都自动将 Next.js 部署到服务器并运行。稍微记录下使用到的 actions：

- [actions/checkout@v2.3.4](https://github.com/actions/checkout)：官方 checkout,转化到指定分支执行;
- [AEnterprise/rsync-deploy@v1.0](https://github.com/AEnterprise/rsync-deploy)：通过 rsync 将 actions 构建的东西上传到服务器，要求服务器安装 rsync;
- [appleboy/ssh-action@master](https://github.com/appleboy/ssh-action)：在服务器上执行指令。