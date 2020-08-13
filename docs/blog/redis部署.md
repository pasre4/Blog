---
title: Docker Redis部署
date: 2020-8-13
tags: 
  - docker
  - 日常积累
  - redis
author: pasre
location: Suzhou  
---


```
 docker run -p 6379:6379 --name redis -v $PWD/redis.conf:/etc/redis/redis.conf -v $PWD/data:/data -d redis redis-server /etc/redis/redis.conf --appendonly yes --requirepass "1453070013"

```