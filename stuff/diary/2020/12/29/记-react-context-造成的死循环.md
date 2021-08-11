---
date: 2020-12-29
title: 记 React Context 造成的死循环
tags:
  - 前端
  - React
---
使用 React context 可以方便的跨组件传值~~但很容易滥用~~。

参照 [gatsby-plugin-layout](https://www.gatsbyjs.com/plugins/gatsby-plugin-layout/#passing-data-from-layout-to-page--from-page-to-layout) 的方式。但是出现了死循环。报错说明是重复 `setState` 所致。

原因是 Provider 与 Comsumer 恰好是父子组件关系，子组件通过 Context 调用了父组件的 `setState` 方法。调用后触发了父组件的更新，然后再次触发了子组件的 setState，最终导致了无限循环。

解决方法为使用 if 判断，如果不同，则触发 `setState`，这样就只会调用一次。

如果是挂载在组件上的回调则不会触发此循环。

由于 setState 是异步，所以在 context 多个子组件多次使用 setState（常见于 context）可能会导致数值不正确。这是因为两个回调拿到的可能是同一个原始值，从而导致更新出现问题。

一个不保险（但是 work）的方法是在你期望延后执行的 setState 上包裹一层 setTimeout。