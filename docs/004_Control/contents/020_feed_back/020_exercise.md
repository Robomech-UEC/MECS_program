---
title: PID制御の実装
parent: フィードバック制御

nav_order: 20

author: 丸山響輝
last_modified_at: true
state: editing
---

# **PID制御の実装**
{: .no_toc }

## 目次
{: .no_toc .text-delta }

1. TOC
{:toc}

PID制御を体験してみましょう。  
まずは、Robo-MECSの演習用githubをcloneしてください。
```shell
git clone https://github.com/Robomech-UEC/Robo-MECS_exercise.git
```
ファイルの中の`004_control/002_feed_back/pole_simulation`に今回使う、ポールのシミュレーション環境が入っています。まずは実行してみましょう。  
必要なlibararyをインストールします。  
```shell
pip install gymnasium pygame matplotlib pandas
```
ではまずは実行してみましょう
```shell
python example.py
```
もしかしたらほかに必要なlibraryがあるかもしれません。適宜インストールしてください。  
成功すると12秒のシミュレーションが流れ、その後グラフが表示されるはずです。  
![pole](imgs/020_test_pole.png)  
![pole](imgs/020_test_graph.png)  
