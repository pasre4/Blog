---
title: Docker中安装Nginx
date: 2020-8-13
tags: 
  - docker
  - 日常积累
  - nginx
author: pasre
location: Suzhou  
---

## 环境
* 阿里云服务器
* Centos 7
* Docker 1.13.1
* Nginx 1.15.5

## nginx配置参数
```
日志文件地址: /var/log/nginx
配置文件地址: /etc/nginx
html资源地址: /usr/share/nginx/html
```

## 安装
1. 下载nginx镜像
```
docker pull nginx
```
2. 部署一个测试nginx 用于复制nginx文件及配置
```
docker run --name nginx_test -P -d nginx
```
3. 建立本机文件夹
```
cd /var
mkdir nginx
cd nginx
mkdir conf 用于配置
mkdir html  用于放置html
mkdir log  用于存放日志
```
4. 将测试nginx的配置文件copy到本机对应文件夹中
```
docker cp nginx_test:/var/log/nginx/. /var/nginx/log
docker cp nginx_test:/etc/nginx/. /var/nginx/conf
docker cp nginx_test:/usr/share/nginx/html/. /var/nginx/html
```
5. 关闭删除测试nginx
```
docker stop nginx_test
docker rm nginx_test
或
docker rm nginx_test -f
```
6. 建立真正的nginx服务
```
docker run --name mynginx -p 80:80 -v /var/nginx/log:/var/log/nginx -v /var/nginx/conf:/etc/nginx -v /var/nginx/html:/usr/share/nginx/html -d nginx
```
7: 查看nginx服务是否开启
```
docker ps -a
```
8. 查看nginx页面
```
curl localhost:80 (:80可省略  使用自定义的端口)
或
在网页上访问
```
9. 部署web页面
>将打包好后的代码放入`/var/nginx/html`中
刷新页面即可
