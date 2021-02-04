---
date: 2020-12-29
title: 记 React Context 造成的死循环
tags:
  - 前端
  - React
---
React Context 也是 Redux 的基础，相对也更容易用（？）。

我的使用方法参照了 [gatsby-plugin-layout](https://www.gatsbyjs.com/plugins/gatsby-plugin-layout/#passing-data-from-layout-to-page--from-page-to-layout) 的方式。但是出现了死循环。报错说明是重复 `setState` 所致。

原因是 Provider 与 Comsumer 恰好是父子组件关系，子组件通过 Context 调用了父组件的 `setState` 方法。调用后触发了父组件的更新，然后再次触发了子组件的 setState。

解决方法为使用 if 判断，如果相同，则触发 `setState`