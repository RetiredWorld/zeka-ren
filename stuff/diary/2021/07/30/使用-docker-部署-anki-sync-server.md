---
date: 2021-07-30
title: 使用 Docker 部署 anki-sync-server
tags:
  - Docker
---
本来 Docker 部署应该是一件很舒服的事情，并没有什么好说的。但是我遇到了无数迷惑的问题。
> 总结为：除非脑子不好，否则不要自己用 docker 部署这玩意。

如果你的安装环境有 python3.8，那么推荐直接在 `virtualenv` 安装。
> 这版本高的有点迷了，但是我不确定是否真的用上了 3.8 的特性，所以不好说什么。但是显然直接在大部分 LTS 上直接安装的期望破灭了。

如果你使用的是 LTS 的自带 python，而且不打算更新（比如我 Debian10 的 3.7），那么你可能打算使用 Docker 安装。

# 坑一，arm 无法使用
在 arm 环境下，anki 似乎落后了几个版本，这导致很难安装。此外，官方暂时没有考虑提供 arm 容器，如果自己修改难度可能比较高。对于我们这种想快速使用的用户，就不打这个主意了。
> 无敌的树莓派受挫

# 坑二，官方 `docker-compose.yml` 过时无法使用
当你打开 [官方 docker 安装指南](https://github.com/ankicommunity/anki-devops-services#about-this-docker-image)，并找到官方写好的 compose 文件时，你可能认为已经结束了。

但是，如果你在 dockerhub 上搜索它 [使用的镜像](https://hub.docker.com/r/kuklinistvan/anki-sync-server)，你会发现它的最后更新时间为一年前。这直接导致它与新版本的 AnkiDroid 不兼容。如果你不打算在安卓手机上使用，那么你可以忽略这个过问题。

因此，自己构建镜像成为不得不做的事情。

# 坑三，在强国构建镜像
为了部署速度，我选择在国内部署 anki。但是 anki 部署需要从 github 上拉取仓库，同时还需要使用 pip 安装环境。

可选方法有：
1. 从可以正常访问的服务器构建，并保存镜像上传到部署服务器
2. 像我一样忘记了方法二，修改部署文件构建。

自己构建，官方有一个专门的 [构建仓库](https://github.com/ankicommunity/anki-devops-services#about-this-docker-image) 和[应用仓库](https://github.com/ankicommunity/anki-sync-server).

构建时，拉取构建仓库（devops）并执行 `scripts` 目录下的 `build-devops.sh`。这个脚本会自动 clone 应用仓库(sync-server)，并执行安装指令。我们需要修改构建仓库的 Dockerfile 来防止网络问题 （路径位于 `anki-devops-services/services/anki-sync-server/images/Dockerfile`）

修改 Dockerfile 如下：
```docker
# -- BUILDER --
FROM library/python:3.9-buster as builder

ARG ANKISYNCD_ROOT=/opt/ankisyncd
RUN mkdir -p ${ANKISYNCD_ROOT}
WORKDIR ${ANKISYNCD_ROOT}

COPY bin/download-release.sh ./bin/download-release.sh
COPY bin/pip.conf /root/.pip/pip.conf
COPY bin/src /root/src

ARG PYTHONUSERBASE=/opt/venv
RUN sh ./bin/download-release.sh && \
        pip3 install --upgrade pip && \
    pip3 install --user -r ./release/requirements.txt

# -- DEPLOYER --
FROM python:3.9-slim-buster

# Copy Python dependencies
ARG PYTHONUSERBASE=/opt/venv
ENV PYTHONUSERBASE=${PYTHONUSERBASE}
COPY --from=builder ${PYTHONUSERBASE} ${PYTHONUSERBASE}

# Copy Anki Sync Server release and scripts
ARG ANKISYNCD_ROOT=/opt/ankisyncd
COPY --from=builder ${ANKISYNCD_ROOT}/release ${ANKISYNCD_ROOT}
WORKDIR ${ANKISYNCD_ROOT}

# Create data volume.
ARG ANKISYNCD_DATA_ROOT=/srv/ankisyncd
RUN mkdir -p ${ANKISYNCD_DATA_ROOT}
VOLUME ${ANKISYNCD_DATA_ROOT}

# Set default environment variables.
ARG ANKISYNCD_PORT=27701
ARG ANKISYNCD_BASE_URL=/sync/
ARG ANKISYNCD_BASE_MEDIA_URL=/msync/
ARG ANKISYNCD_AUTH_DB_PATH=./auth.db
ARG ANKISYNCD_SESSION_DB_PATH=./session.db

ENV ANKISYNCD_HOST=0.0.0.0 \
        ANKISYNCD_PORT=${ANKISYNCD_PORT} \
        ANKISYNCD_DATA_ROOT=${ANKISYNCD_DATA_ROOT} \
        ANKISYNCD_BASE_URL=${ANKISYNCD_BASE_URL} \
        ANKISYNCD_BASE_MEDIA_URL=${ANKISYNCD_BASE_MEDIA_URL} \
        ANKISYNCD_AUTH_DB_PATH=${ANKISYNCD_AUTH_DB_PATH} \
        ANKISYNCD_SESSION_DB_PATH=${ANKISYNCD_SESSION_DB_PATH}

COPY bin/entrypoint.sh ./bin/entrypoint.sh

EXPOSE ${ANKISYNCD_PORT}

# TODO: Change to ENTRYPOINT. Currently CMD to allow shell access if needed.
CMD ["/bin/sh", "./bin/entrypoint.sh"]

HEALTHCHECK --interval=60s --timeout=3s CMD wget -q -O - http://127.0.0.1:27701/ || exit 1
```

同时提前准备好 `anki-sync-server` 的 `src` 文件夹。在 `bin` 目录提前放置，并放置一个 pip.conf 文件：

```ini
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

构建完成后，修改镜像为自己之前构建的即可。

# 坑四，修改 Nginx 配置
要在 Ankidroid 上正常使用，必须 “正确” 配置 Nginx。
Ankidroid 似乎对 http2 支持有一定问题，同步媒体文件时会跳出 `okhttp http2 NO_ERROR` 错误。但是 Ankidroid 又强制要求 ssl 证书，所以 Nginx 是不可避免的。

要正确关闭 Nginx http2 有一个小问题。一个端口不能同时使用 http1.1 与 http2.所以如果你打算在 80 443 端口开启 http2（其他服务） ，并同时使用 `anki-sync-server` 的话，你的唯一选择是更换端口（比如 444）.

# 坑五，文件持久化
自己构建的镜像无法实现文件持久化，因为文件目录已经发生了改变。所以 README 中提到的 `docker-compose.yml` 挂载是有问题的。

一个很大的问题是，虽然容器内有 `ankisyncd.conf` 文件，但是不论如何修改这个文件都无法使得目录更改起效。

简单翻阅了下源码没有找到问题，所以唯一方法是手动一个个的挂载。

最少要挂载的文件有两个，一个是位于 `/opt/ankisyncd/` 目录下的 `auth.db` 文件，其中保存了用户的用户名与密码信息。

另一个是位于 `/srv/ankisyncd` 文件下的媒体文件。

一个问题在于 `auth.db` 最开始无法创建，所以可行的办法是首先挂载目录，等进入容器添加用户后再移动道挂载目录中（也就是从容器中拿到宿主机环境中），然后再修改 `docker-compose.yml` 文件启动。

> `/opt/ankisyncd/` 下还有一个 `session.db` 文件，用于记录登录凭证，如果有必要也可以照前面拿出 `auth.db` 步骤拿出来。但是这个是用于登录 session 会话，不挂载不影响使用。唯一影响是重启容器所有客户端需要重新登录。

