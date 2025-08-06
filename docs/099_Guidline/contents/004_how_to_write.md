---
title: ドキュメントの描き方
parent: ドキュメント作成に当たって
nav_order: 4

author: 丸山響輝
last_modified_at: true

state: editing
---

# **ドキュメントの描き方**

[テンプレート](005_template/index)を参考にしてください。

## front matter
mdファイルの上で---によりくぎられているところをfront matterと呼びます。  
- title  
サイドバーに表示される名前です。parentの指定の時にも使われます。
- parent  
親を持つページでは指定してください。parentとして指定されたページには自動で目次が生成されます。
- nav_order  
スコープ内で何番目のページか示します。  
サブセクション番号、コンテンツ番号はそれぞれ.mdファイルのヘッダのnav_orderと揃えてください。
あとから書き足すことも考え、連番ではなく多少離した番号を設定してください。  
また、フォルダ名のsortの関係上、100未満の数であっても3桁で表してください(001,024...)。  
- author  
作成者の名前を記載してください。  
作成に関わる人は`_data/authors.yaml`の中にフォーマットに従って名前を追加して、そのキーをauthorとして指定してください。  
このとき、検索で使用できるよう、キーには本名を指定してください。
- edit   
他の人が書いたドキュメントに内容を追加、変更する時はeditに名前を書いてください。リスト型([person1, person2])で複数人指定できます。
- last_modified_at  
trueにするとgitのcommitから最終更新を取得します。
- state  
ページの場合、できるだけつけるようにしましょう。notyet, editing, doneの3つのstateを用意してあります。  

front matterやfooter、その他設定について中身が気になる、変更したい場合には[技術資料](010_technical_docs)を参照してください