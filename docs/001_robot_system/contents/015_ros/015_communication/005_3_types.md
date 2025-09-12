---
title: 3種類の通信
parent: communication

nav_order: 5

author: 丸山響輝
last_modified_at: true
state: editing
---

# **3種類の通信**
{: .no_toc }

## 目次
{: .no_toc .text-delta }

1. TOC
{:toc}

ROSの通信には主に3つの種類が存在します。基本的に使うのはpub/sub通信のみですが、場合によってほかの通信も有効であることがあるので、見ていきましょう。

## pub/sub
publisher, subscriberが存在する最も基本的な通信です。publisherであるnodeがtopicをpublish(出版)して、subscriberであるnodeがそれをsubscribe(購読)します。  
ここで重要なのが、おなじtopicにたいしてpublisherは一人でしかありえませんが、subscriberは何人でもよいということです。  
flip型の絵を使って説明しましょう。  
![flip](imgs/005_flip.png)  

このようにpublisherが見せたtopicにたいし、その名前のtopicを欲しがっているsubscriberが読むという通信方式がpub/sub通信です。  

もう一つ重要なのが、どのnodeもpublisherとsubscriberに同時になり得るということです。  
回転寿司屋の絵を使って説明しましょう。  
この回転寿司屋は一般的なところと違って客がネタをレーンに載せることが出来ます。ただし客が載せるネタは、たまに流れてくる広告みたいなやつで、ほかの客が載せた広告を勝手にとることはしないとしましょう。  
![sushi](imgs/005_sushi.png)  

このように、それぞれのnodeがpublisher,subscriberの性質を持ちながら互いに通信することが出来るのがROSのシステムです。
