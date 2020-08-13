---
title: linux常用指令
date: 2020-8-13
tags: 
  - linux
  - 日常积累
author: pasre
location: Suzhou  
---

## 文件操作
### 压缩/解压缩

* 单个文件压缩打包 tar czvf {name.tar} file1
* 多个文件压缩打包 tar czvf {name.tar} file1 file2,...
* 单个目录压缩打包 tar czvf {name.tar} dir1
* 多个目录压缩打包 tar czvf {name.tar} dir1 dir2
* 解包至当前目录：tar xzvf {name.tar}

### 下载/上次
> 安装工具 lrzsz
 lrzsz是一个unix通信套件提供的X，Y，和ZModem文件传输协议,可以用在windows与linux 系统之间的文件传输，体积小速度快
 `yum install -y lrzsz`

* 下载  `sz 文件名`
* 上次  `rz` 上传到当前目录


### 切换账号
`su {Account}`