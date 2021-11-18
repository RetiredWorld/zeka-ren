---
date: 2021-11-18
title: "与框架使用 CSS Module "
tags:
  - CSS
---
使用 CSS Module 非常爽，这意味着你可以随心所欲的写出：

```scss
.btn {
    .red {
    	color: red;
    }
}
```

但是当你遇到 UI 框架，Module 编译的 Scope css 对框架内固定的 `className` 无效，所以需要使用 prefix 解决。

```scss
// React
.btn {
	global(.framework-red) {
		color: red;
	}
}
```

```scss
// Vue
.btn {
	::v-deep .framework-red {
		color: red;
	}
}
```

