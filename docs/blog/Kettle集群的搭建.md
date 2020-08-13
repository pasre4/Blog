---
title: Kettle集群的搭建
date: 2020-8-13
tags: 
  - Kettle
author: pasre
location: Suzhou  
---

## 集群的原理与优缺点
1. kettle是一个主carte服务器和从carte服务器组成的一个集群, 类似于master-slave结构. 区别在于 master carte服务器只做任务的分发和收集,不参与计算.master收到请求后将任务分成多个部分,交由slave carte服务器执行,最终回收结果 由master返回结果.
2. 集群的优点
    - 多服务器运行,处理速度高
    - 单从节点服务器异常不会影响整体任务
3. 集群的缺点
    - 主从结构不具备自主切换主节点功能,主节点宕机 则集群失效
    - 对网络要求较为严苛
    - 单独的主节点无处理能力  必需配合至少1台从节点
4. 适用场景
    - 需要保证kettle持续稳定运行
    - 大数据量的计算

## 集群搭建
### window下搭建集群
1. 配置服务器信息
>kettle > pwd 文件夹内
`Carte-config-master-8080.xml`是主服务器配置文件 </br>
 可添加用户名和密码 </br>
`<username>cluster</username>`</br>
`<password>cluster</password>`


![carte配置](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/carte_pwd_20181108162334.png "carte配置")

![carte主配置](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/carte_main_20181108164317.png "carte主配置")

2. 配置从服务器信息
>`master`标签内为主服务器信息  与主服务器保持一致即可

![carte从配置](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/carte_slave_20181108164607.png "carte从配置")

3. 添加服务器
打开Spoon.bat 在转化 `主对象树 > 子服务器`中添加

![添加服务器](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/master_config_20181108165107.png "添加服务器")

4. 配置集群
>在主对象树中选择kettle集群schemas，填写schema名称，端口、sokects缓存大小、sockets刷新时间间隔、socketts数据是否压缩。在右边点击选择子服务器，选择需要的子服务器。
```
Schema名称即集群的名称。
端口即集群对外服务的端口.
sockets缓存大小:sockets缓存
Sockets刷新时间间隔：达到多少行记录时刷新到子服务器。
Sockets数据是否压缩：如果网络状况差，则建议选择。网络良好时不用选择。
```
![集群配置](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/group_config_20181108165326.png "集群配置")

5. 执行转化
>右击步骤 点击集群  选择对应的集群  即可在步骤上方显示对应执行的子服务器数
![执行转化](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/do_tran_20181108165724.png "执行转化")


## 参考文档

>`windows:`[https://www.cnblogs.com/skyrim/p/5104557.html](https://www.cnblogs.com/skyrim/p/5104557.html) </br>
`linux:`[https://blog.csdn.net/lixuemei504/article/details/38271145](https://blog.csdn.net/lixuemei504/article/details/38271145)