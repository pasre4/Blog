---
title: Docker安装Jenkins
date: 2020-8-13
tags: 
  - docker
  - 日常积累
  - jenkins
author: pasre
location: Suzhou  
---

## 环境
* 阿里云服务器
* Centos 7
* Docker 1.13.1
* Jenkins 2.60.3

## Jenkins配置参数
```
Jenkins工作目录: /var/jenkins_home
Jenkins时区配置: /etc/timezone
```

## 安装

1. 下载nginx镜像
```
docker pull jenkins
```
2. 部署一个测试jenkins 用于复制jenkins配置目录
```
docker run --name jenkins_test -P -d jenkins
```
3. 建立本机文件夹
```
cd /var
mkdir jenkins
```
4. 将测试jenkins的配置文件copy到本机对应文件夹中
```
docker cp jenkins_test:/var/jenkins_home/. /var/jenkins
```
5. 关闭删除测试jenkins
```
docker stop jenkins_test
docker rm jenkins_test
或
docker rm jenkins_test -f
```
6. 建立真正的jenkins服务
```
docker run --name jenkins -p 8080:8080 -p 50000:50000 -v /var/jenkins:/var/jenkins_home -v /etc/timezone:/etc/timezone -d jenkins
```
7. 查看nginx服务是否开启
```
docker ps -a
```
8. 登陆Jenkins页面配置
```
(ip):8080
```