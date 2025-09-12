---
title: ROSのシステム
parent: ROS

nav_order: 10

author: 丸山響輝
last_modified_at: true
state: editing
---

# **ROSのシステム**
{: .no_toc }

## 目次
{: .no_toc .text-delta }

1. TOC
{:toc}

ROSが実際にどうやって動いているか、見ていきましょう。ROS2はpythonとC++のどちらでも書くことができますが、ここではC++の場合について見ていきましょう。  

## package
まず、ROSはpackage単位で動作しています。packageを作ってそれをbuildすることでROSを動かすことができるのです。そのため、開発管理もpackageで行うべきだ、と考えています。  
書くpackageごとにgitのリポジトリを作り、管理しましょう。  
例外として、複数のpackageを含むが再利用性があまりないプロジェクトの場合、複数packageをまとめたフォルダをgitで管理することも考えられます。

## ディレクトリ構成
packgeのディレクトリ構成は次のようになっています。  

|-launch
|  |-your_launch_file.launch.py
|-src
|  |-your_ros2_program.cpp
|-CMakeLists.txt
|-package.xml

### launch
後で説明します。ない場合もあります。launchファイル、というファイルを入れておくところです。  

### src
source を意味します。ソースコードをすべてここに入れます。

### CMakeLists.txt
CMakeListsとは、c,cppにおいて複数のファイルをまとめてビルドする際、どうやってビルドしてどんな名前で保存するかを決めるファイルです。  
CMakeListsをかけるようになるとC言語で色々なものを書くスピードが早くなります。  

## package.xml
どの外部packageを使うかが書かれています。  
xmlとはhtmlに近いマークダウン式の言語で、システム的な内容について書くことができます。  
