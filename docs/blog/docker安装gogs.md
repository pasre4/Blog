---
title: Docker安装gogs
date: 2020-8-13
tags: 
  - docker
  - 日常积累
  - git
author: pasre
location: Suzhou  
---

## 环境
* 阿里云服务器
* Centos 7
* Docker 1.13.1
* gogs 1.11.1

## gogs配置参数
```
gogs工作目录:  /data
git文件和仓库数据:  /data/git
gogs配置:  /data/gogs
```

## 安装
1. 下载gogs镜像
```
docker pull gogs/gogs
```
2. 部署一个测试gogs 用于复制gogs配置目录
```
docker run --name gogs_test -p 10022:22 -p 10021:3000 -d gogs/gogs
```
3. 建立本机文件夹
```
cd /var
mkdir gogs
```
4. 将测试gogs的配置文件copy到本机对应文件夹中
```
docker cp gogs_test:/data/. /var/gogs
```
5. 关闭删除测试gogs
```
docker stop gogs_test
docker rm gogs_test
或
docker rm gogs_test -f
```
6. 建立真正的gogs服务
```
docker run --name gogs -p 10022:22 -p 10021:3000 -v /var/gogs:/data --privileged=true -v /etc/localtime:/etc/localtime:ro -d gogs/gogs
```
7. 查看gogs服务是否开启
```
docker ps -a
```
8. 登陆网址完成配置
(ip):10021
10022为ssh的端口号
10021为http/https的端口号
