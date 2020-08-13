---
title: MongoDB
date: 2020-8-13
tags: 
  - 数据库
  - 知识点
author: pasre
location: Suzhou  
---

# 什么是NoSql
NoSql是对不同于传统的关系数据库的数据库管理系统的统称


# 常见NoSql数据库
```
* MongoDB
* Redis
* Apache Cassandra
```

# NoSql 和 RDBMS 对比
NoSql | RDBMS
--|--
代表着不仅仅是SQL<br>没有声明性查询语言<br>没有预定义的模式<br>键 - 值对存储，列存储，文档存储，图形数据库<br>最终一致性，而非ACID属性<br>非结构化和不可预知的数据<br>CAP定理<br>高性能，高可用性和可伸缩性 | 高度组织化结构化数据<br>结构化查询语言（SQL） (SQL)<br>数据和关系都存储在单独的表中。<br>数据操纵语言，数据定义语言<br>严格的一致性<br>基础事务

# 操作方式

## 新增
```
db.<collection>.insert()
单个文档插入使用实体 {}  批量插入使用数组 [{},{}]
```

## 查询
```
db.<collection>.find()
使用实体对照组的方式查询  例: {id: '001'}
```

## 修改
```
db.<collection>.update(<query>,<update>,upsert:<boolean>,multi:<boolean>)
query:  查询语句,参考查询  {<field>: <value>}
update: 编辑语句  { <修饰项>: { <field>: <value> } }
upsert: 可选项,默认false, 如何设置为true,未查询到文档时做新增操作
multi:  可选项,默认false,true为全部更新,false只更新一条
```

### 对单个字段的修改
编辑操作修饰项|描述
:--:|--
$inc|根据要添加的值递增该字段的值。
$mul|将该字段的值乘以指定的值
$rename|重命名字段
$setOnInsert|操作时,操作给相应的字段赋值
$set|用来指定一个键的值，如果不存在则创建它
$unset|用来指定一个键的值，如果不存在不创建创建它
$min|只有当指定的值小于现有字段值时才更新该字段
$max|只有当指定的值大于现有字段值时才更新该字段
$currentDate|设置当前日期字段的值，或者作为一个日期或时间戳

### 对数组字段的修改
名称|描述
:--:|--
$|作为一个占位符的更新与查询条件在一个更新的第一要素
$addToSet|将元素添加到数组中，仅当它们在集合中不存在
$pop|删除数组的第一个或最后一个项
$pullAll|从数组中移除所有匹配值
$pull|移除匹配指定查询的所有数组元素
$pushAll|将所有值添加到数组中
$push|将值添加到数组中，如果有的数组存在则向数组末尾添加该值，如果数组不存在则创建该数组并保存该值

## 删除
```
删除文档:  db.<collection>.remove()
          db.<collection>.remove({}) 删除全部数据  保留索引  类似于truncate
          db.<collection>.remove({<field>: <value>}) 按条件删除
删除集合:  db.<collection>.drop() 集合,索引都被删除了
```