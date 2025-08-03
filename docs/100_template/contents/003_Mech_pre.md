---
title: ハードプレ
parent: テンプレート
nav_order: 3

author: 後藤波瑠
last_modified_at: true
---

# 設計の進め方
{: .no_toc }

## 目次
{: .no_toc .text-delta }

1. TOC
{:toc}

目次を先頭に持ってきた方がいいのかなあ

## 構想

To generate a *Table of Contents* in a page, you use Kramdown's `{:toc}` method, immediately after the start of a list. This will automatically generate a list of anchor links to various sections of the page, based on headings and heading levels.

{: .note }
`{:toc}` can be used only once on each page.

You **must** have a list immediately preceding the table of contents. The type of list determines the style of your table of contents.

For an *ordered* table of contents, use the following markdown code:

```md
1. TOC
{:toc}
```

The `{:toc}` line *must* follow the `1. TOC` line, which begins a list.

For an *unordered* table of contents, instead use the following markdown code:

```
- TOC
{:toc}
```

## ポンチ絵

If you want to omit a particular heading from the TOC, follow it immediately by `{: .no_toc }` (possibly together with other CSS class names).

```markdown
# In-Page Navigation
{: .no_toc }

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}
```

This example omits the top-level heading (`In-Page Navigation`) from the TOC, as well as the heading for the *Table of Contents* itself.

## CAD

You can make the Table of Contents collapsible using the `<details>` and `<summary>` elements, as in the following example.

```markdown
<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>
```

The attribute `open` (which expands the Table of Contents by default) and the styling (here with `text-delta`) are optional.

## 試作

{: .warning }
The default id for a section with heading "Back to Top" is `"back-to-top"`.
To avoid invalid HTML, sites that set the `back_to_top` configuration variable
should override the default id for such sections. The Markdown source file for
the current page uses `## Back to Top {#back-to-top-doc}`.

You can add a link from the bottom of each page to its top. You do this by including the `back_to_top` configuration option in your site's `_config.yml` file, together with `back_to_top_text` for the anchor link.


{: .warning }
Back-to-top links currently appear only when *other* configuration options require footer generation!