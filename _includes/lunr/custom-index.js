const content_to_merge = [docs[i].content, docs[i].author, docs[i].edit];
docs[i].content = content_to_merge.join(' ');
