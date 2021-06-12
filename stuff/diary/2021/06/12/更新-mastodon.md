---
date: 2021-06-12
title: 更新 Mastodon
tags:
  - Linux
---
由于没有自己构建而是直接拉取的官方镜像，所以不需要在本地 build。

在确定要升级前，最好仔细阅读官方的 `release notes`： [这里](https://github.com/tootsuite/mastodon/releases)。如果没有 `breaking changes`，则可以按照一般流程走下去。

备份数据库：
```bash
docker exec mastodon_db_1 pg_dump -Fc -U postgres postgres > name_of_the_backup.dump
```
> 如果没有使用 OSS 等外部存储，媒体文件也是需要进行备份的，但是一般不会有问题。

拉取最新镜像：
```bash
docker pull tootsuite/mastodon:latest
```

按照 [官方指示](https://github.com/tootsuite/mastodon/releases) 进行操作。一般来说操作的时候是不需要停止镜像的。

操作完成后，重启镜像：
```bash
docker-compose down
docker-compose up -d
```
启动后可以通过 `docker ps` 查看是否有异常。Mastodon 启动需要一定时间。

在确保稳定后，删除旧镜像。Mastodon 镜像文件比较大，虽然大部分 layer 可以直接复用，但是还是会对存储空间产生一定压力。重新 pull 最近镜像后，旧镜像变为 `untagged`。

> 下面指令不仅仅去除 `untagged` 镜像，还会移除没有使用的任何镜像，网络等等。如果你有要保留那些镜像的需求，这条指令不适合你。
```bash
sudo docker system prune -a
```