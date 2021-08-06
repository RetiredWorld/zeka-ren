---
date: 2021-08-06
title: 为 Webstorm 添加 Liquid 语法支持
tags:
  - IDE
---
jekyll 默认在 HTML 中启用 Liquid 语法，为了获取语法高亮支持，我们需要安装 Liquid 插件。

> 或者直接使用 RubyMine 开发，其自带 Liquid 插件。

根据 [官方插件说明](https://www.jetbrains.com/help/ruby/liquid.html#supported_file_types)，它不会识别 `*.html` 文件。所以我们仍然无法得到语法高亮支持。

要使 HTML 文件也用上高亮，我们在 `Settings>Editor/File Types` 中找到 Liquid，并添加规则 `*.html`。Webstorm 会提示这与 HTML 冲突，但是没关系，因为 Liquid 似乎是 HTML 的一个超集，所以我们将声明改到 Liquid 后不会影响 HTML 的高亮。

之后就能正常使用高亮了。

