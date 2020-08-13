---
title: Jenkins构建maven程序
date: 2020-8-13
tags: 
  - docker
  - 日常积累
  - jenkins
author: pasre
location: Suzhou  
---

## 环境
* Jenkins 2.60.3
* JDK 1.8
* Maven 3.6

## 安装插件
> Maven Integration plugin
Deploy to container Plugin  将war包发送至tomcat服务器

## 全局工具配置 (Global Tool Configuration)

> 系统管理 > Global Tool Configuration
### jdk配置
![jdk配置](http://nas.pasre.cn:10021/pasre/Image/raw/master/Jenkins/jdk_config_20181106105154.png "jdk配置")

该Jenkins镜像中已存在jdk1.8 可直接使用
地址: '/usr/lib/jvm/java-8-openjdk-amd64'
### maven配置

![maven配置](http://nas.pasre.cn:10021/pasre/Image/raw/master/Jenkins/maven_config_20181106105154.png "maven配置")

使用自动安装即可  在第一次触发构建时会自动下载

## 新建maven项目
1. 新建项目
![maven配置](http://nas.pasre.cn:10021/pasre/Image/raw/master/Jenkins/create_maven_20181106110938.png "maven配置")
![项目配置展示](http://nas.pasre.cn:10021/pasre/Image/raw/master/Jenkins/maven_save_20181106111130.png "项目配置展示")
2. 配置git
![git配置](http://nas.pasre.cn:10021/pasre/Image/raw/master/Jenkins/git_config_20181106111330.png "git配置")
>本机配置为1M阿里云服务器
如果项目过大 可通过设置git选项修改时间配置

![时间配置](http://nas.pasre.cn:10021/pasre/Image/raw/master/Jenkins/git_timeout_20181106111602.png "时间配置")

3. 远程构建配置
![远程构建配置](http://nas.pasre.cn:10021/pasre/Image/raw/master/Jenkins/build_config_20181106111805.png "远程构建配置")
```
http://git.pasre.cn:8080/job/demo/build?token=pasre
H/5 * * * * 表示每5分钟检查一次
```

4. 打包设置
![打包设置](http://nas.pasre.cn:10021/pasre/Image/raw/master/Jenkins/build_20181106112119.png "打包设置")

