---
title: kettle使用情况
date: 2020-8-13
tags: 
  - Kettle
author: pasre
location: Suzhou  
---

## 环境
* kettle版本: 7.1.0.0-12
* jdk: 1.8.0_181
* mariaDB:
    - 本机MariaDB  10.3.10
    - nasMariaDB 10.3.7    服务器20M上传带宽
* MSSql: Sql Server 2017 开发版

## 具体测试情况

### 单表同步数据
1. 从本地Maria同步10W数据至本地MSsql
> 高速度

![同步数据maria-mssql](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/maria_to_mssql(10w)_5581539827050192.png "同步数据maria-mssql")

2. 本地Maria同步10W数据至nas_Maria
> 受限于手机热点上传速度  性能低下 无法作为参考

![同步数据maria-nas](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/maria_to_nas(10w)_5581539827050192.png "同步数据maria-nas")

3. 本地Maria同步10W数据到本地Maria
> `maria/mysql` 本身的导入速度一般
修改配置可优化批量导入性能
`
useServerPrepStmts=false `</br>`
rewriteBatchedStatements=true  `</br>`
useCompression=true
`

![同步数据maria-maria](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/maria_to_maria_7301539827785605.png "同步数据maria-maria")

>批量导入优化原理
- `useCompression=true` 压缩数据传输，优化客户端和MySQL服务器之间的通信性能
- `rewriteBatchedStatements=true` 开启批量写功能
    ```
    导入maria默认使用大批量单条插入语句
    INSERT INTO t (c1,c2) VALUES ('One',1);
    INSERT INTO t (c1,c2) VALUES ('Two',2);
    INSERT INTO t (c1,c2) VALUES ('Three',3);
    修改配置后改为
    INSERT INTO t (c1,c2) VALUES ('One',1),('Two',2),('Three',3);
    ```
- `useServerPrepStmts=false` 关闭服务器端编译，sql语句在客户端编译好再发送给服务器端</br>
如果为true,sql会采用占位符方式发送到服务器端，在服务器端再组装sql语句

### 合并导入
1. (10W)合并2个本地库数据至MariaDb
![合并数据-maria](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/2data_to_maria_5631540259409567.png "合并数据-maria")

2. (10W)合并2个本地库数据至MSSql
![合并数据-mssql](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/2data_to_mssql_20041539847923909.png "合并数据-mssql")

3. (100W)合并2个本地卡数据至MSSql
![合并数据-mssql](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/(100W)2data_to_mssql_20041539847923909.png "合并数据-mssql")

4. 多字段导入和字符串关联测试
![更多字段](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/more_fields_6121540430490848.png "更多字段")
> 字符串继续增加后  受限于cpu性能  速度有所下降 </br>
建议只导入需要的字符串 以提高性能

### 插入/更新
> 使用`插入/更新`组件需要注意
>* 比较字段需要设置索引
>* 字段类型最好保证一致  如果不一致则可在kettle中变更字段类型

## 使用过程中遇到的坑

1. 用jdk10时   kettle Spoon打开是系统内部异常  无法正常执行  重新安装jdk8后  无异常
2. 使用kettle链接MariaDB数据库时,需要安装对应的JDBC程序  window下kettle链接Maria    [mariadb-java-client-2.3.0.jar](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/mariadb-java-client-2.3.0.jar)
3. 使用kettle连接MSSql
    - windows验证  需要安装微软jdbc包  [sqljdbc42.jar](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/sqljdbc42.jar)
    - sql验证模式  安装jdbc包  [jtds-1.3.1.jar](http://nas.pasre.cn:10021/pasre/Image/raw/master/Kettle/jtds-1.3.1.jar)
4. `本地`数据库同步至公网`nas`数据库时
    - 同步失败  异常 `Couldn't get row from result set`
    - 修改配置 `net_read_timeout` 设置读取超时时间
    - 中间新增步骤 将数据缓存至kettle 例: `选择字段`
    - 原因:手机热点上传速度过慢  拖延了整体进度
5. 数据同步时  如果目标表字段设置为`非null`
    - 数据导入失败 提示字段不可为null
    - 可使用js脚本处理数据 替换null为空字符串
    - 注意: 内部字段类型非string   无法直接使用正则替换

## 经验收集

1. 导出数据时,可以使用kettle自身缓存存储一些临时数据  加快处理速度(例:字段选择)
2. 可通过调节配置可变更kettle缓存大小 用于提高处理速度
3. kettle 默认将空字符串看做null  导致导入数据中的空字符串在流中修改为null   
4. 修改`KETTLE_EMPTY_STRING_DIFFERS_FROM_NULL`可解决该问题
5. 如果数据库字段设置为非null  为null的数据导入时会发生异常   需要处理null字段
