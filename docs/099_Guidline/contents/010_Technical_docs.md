---
title: 技術資料
parent: ドキュメント作成に当たって
nav_order: 10

author: 丸山響輝
last_modified_at: true

state: editing
---

# **技術資料**
{: .no_toc }

## 目次
{: .no_toc .text-delta }

1. TOC
{:toc}

Robo-MECSのページを作成する際にテンプレートから変更した点について書いてあります。

## custom footer

authorや最終更新について各ページに書き込むためにfooterを変更しました。  
[公式ドキュメントのOverrideの章](https://just-the-docs.github.io/just-the-docs/docs/customization/#override-includes)を読むと`_includes`フォルダの中で色々カスタムできると書いてあります。  
ドキュメントの通り`_includes`に`footer_custom.html`を作成し、  
```html
{% raw %}
{%- if page.author -%}
  {% assign person = site.data.authors[page.author] -%}
  <p class="text-small text-grey-dk-100 mb-0">
	作成者: 
	{{ person.name | default: page.author }}
	/ {{ person.year | default: }}
	/ {{ person.unit | default: }}
  </p>
{%- endif -%}
{% endraw %}
```  
を書き込みました。  
これにより、page.authorを書くと作成者についてのfooterを、各ページごとに書くことができるようになりました。  
authorの情報をすべて書くのは大変です。そこで、`_data/authors.yaml`を作成し、その中に
```yaml
hibiki: 
  name: "丸山響輝"
  year: "23"
  unit: "HR・レスキュー"
```
のようにして各作成者の情報をまとめておけるようにしました。これで、`author: hibiki`と書くだけですべての情報をフッターに入れられるようになります。

## last modified at

最終更新を書いておきたいなと思い作成しました。jekyllにgitと連携するライブラリが存在していたので、`Gemfile`に
```Gemfile
gem "jekyll-last-modified-at"
```
を追加し、さらに`_config.yaml`でpluginとして読み込みました。
```yaml
plugins:
  - jekyll-last-modified-at

last_modified_at:
  enabled: true
  date_format: "%Y-%m-%d"
```
あとはfooterとして出力するだけです。`footer-custom.html`に
```html
{% raw %}
<p class="text-small text-grey-dk-100 mb-0">
  最終更新: {{ page.last_modified_at | date: "%Y年 %m/%d" }}
</p>
{% endraw %}
```
を追加しておしまい。

## search
Just the Docsテンプレートはもともと英語向けなので、日本語は検索対象に入っていませんでした。調べてみたところ、テンプレートはもともとlunrというシステムを使っており、lunrには日本語対応機能もあったので、これを導入しました。  
ここで、[ドキュメント](https://just-the-docs.github.io/just-the-docs/docs/search/#enable-search-in-configuration)にsearchセクションのカスタマイズについて乗っていたのですがこれでは足りなかったので、`assets/js/just-the-docs.js`と`_layouts/default.html`を直接編集することになりました。  
まず`assets/js/lunr-languages`に`lunr.ja.js`、`lunr.setmmer.support.js`、`tinyseg.js`を公式サイトからダウンロードし、`default.html`に
```html
<script src="{{ '/assets/js/lunr-languages/lunr.setmmer.support.js' | relative_url }}"></script>
<script src="{{ '/assets/js/lunr-languages/tinyseg.js' | relative_url }}"></script>
<script src="{{ '/assets/js/lunr-languages/lunr.ja.js' | relative_url }}"></script>
```
を追加しました。  
つづいてlunr.jaを使ってもらうため、`just-the-docs.js`のlunr関数の設定に  
```js
 var index = lunr(function(){
		// add plugin for Japanese
		this.use(lunr.ja);

        this.ref('id');
		...
```
のように書き加えました。  
これにより、日本語検索機能を実装しました。  

さらに、作成者や編集者での検索を可能にするため、`_includes/lunr`の中に以下の2つのファイルを作成しました。  
custom-data.json  
```js
{% raw %}
{%- capture newline %}
{% endcapture -%}
"author": {{ include.page.author | markdownify | replace:newline,' ' | strip_html | normalize_whitespace | strip | jsonify }},
"edit": {{ include.page.edit | markdownify | replace:newline,' ' | strip_html | normalize_whitespace | strip | jsonify }},
{% endraw %}
```  
custom-index.json  
```js
const content_to_merge = [docs[i].content, docs[i].author, docs[i].edit];
docs[i].content = content_to_merge.join(' ');
```  

これにより、author,editの中に書かれている名前を検索することができます。

## Build and Deploy

BuildとDeployについては、`.github/workflows`の中に入っているyamlファイルに従って行われます。  
設定はTemplateをコピーしたときから変えていません。  
mainブランチをbuild,deployすることになっており、pushされたタイミングでjobを実行します。  
ciがbuild、pagesがdeployについて書かれているもの(らしい)ので、うまくいかなかったら参照してください。  
Githubのsetting/pagesでGithubActionを選ぶとjekyll.yamlを作らせようとしてきますが、すでにworkflowは存在するので新しいものは作らないでください。  
pushするとしばらく時間はかかりますがjobがおわり、urlが表示される(または内容が更新される)ようになりますので、しばらく待ちましょう。

# state
各ページごとに編集stateが欲しいと思い作りました。stateはnavigationバーに表示されます。  
どうやらnavに関するhtml変換は`_includes/components/nav`に入っているようなので、ここをあさります。  
開発者ツールを使ってnavigationバーを見てみたところ、タイトルは`nav-list-link`というclassになっているようです。もっとよく見てみると、  
`side-bar -> site-header -> nav:Main -> ul:nav-list -> li:nav-list-item -> a:class:nav-list-item`(書き方あってるかは知らない)  
のような構造になっていたので、構造をたどりながら調べた。  
すると、`_includes/componetns/nav/links.html`に対称のaタグを見つけたので次のように編集  
```html
{% raw %}
<li class="nav-list-item">
	{%- if nav_children.size >= 1 -%}
	<button class="nav-list-expander btn-reset" aria-label="toggle items in {{ node.title }} category" aria-pressed="false">
	<svg viewBox="0 0 24 24" aria-hidden="true"><use xlink:href="#svg-arrow-right"></use></svg>
	</button>
	{%- endif -%}
	<a href="{{ node.url | relative_url }}" class="nav-list-link">
	{{ node.title }} 
	<!-- show page state after title -->
	{%-if node.state -%}
		[
		<span style="font-size: 0.5em; margin-left: -0.3em; vertical-align: middle">
		{{ site.data.states[node.state] }}
		</span>
		]
	{%- endif -%}
	</a>
	{%- if nav_children.size >= 1 -%}
	{%- if node.child_nav_order == 'desc' or node.child_nav_order == 'reversed' -%}
		{%- assign nav_children = nav_children | reverse -%}
	{%- endif -%}
	{%- assign nav_ancestors = include.ancestors | push: node.title -%}
	{%- include components/nav/links.html pages=nav_children ancestors=nav_ancestors all=include.all -%}
	{%- endif -%}
</li>
{% endraw %}
```  
このとき、後でstateを追加しやすいように、`_data/states.yaml`を書いた。
```yaml
notyet: " "
editing: "○"
done: "●"
```
