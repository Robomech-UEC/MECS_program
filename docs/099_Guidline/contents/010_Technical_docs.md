---
title: 技術資料
parent: ドキュメント作成に当たって
nav_order: 10

author: hibiki
last_modified_at: true
---

# 技術資料

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

# last modified at

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

# search
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