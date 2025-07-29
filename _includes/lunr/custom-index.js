lunr.tokenizer.separator = /[\s]+/; // 通常の空白分割は使わない（念のため）

// load module for Japanese
lunr.ja.load();

window.searchIndex = lunr(function () {
  // use plugin for Japanese
  this.use(lunr.ja);

  this.ref("id");
  this.field("title", { boost: 15 });
  this.field("content");

  docs.forEach(function (doc, index) {
    doc.id = index;
    this.add(doc);
  }, this);
});
