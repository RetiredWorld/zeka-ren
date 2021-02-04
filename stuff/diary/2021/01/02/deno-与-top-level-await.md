---
date: 2021-01-02
title: Deno 与 top level await
tags:
  - 前端
  - Deno
---
单线程 JavaScript 能获得成功的一大原因在于其强大的异步能力。而作为 Node 的 “纠错者”，Deno 提供了更完善的异步支持。~~async await 满天飞~~

一个特征是 Deno 支持 top level await。

> top level await 特性似乎仍然处于提案阶段，各大浏览器似乎除了最新版 Chrome 没有支持的。

相信学习 JS 的人一开始对于 JS 没有 `sleep` 函数感到困惑。你无法直接让程序休眠一段时间，JS 只提供了 `setTimeout` 与 `setInterval` 方法。这是为了防止主线程阻塞。对于单线程程序，运行在浏览器里的 JS 主线程发生阻塞将会发生无法预知的效果。为此，浏览器只支持回调形式的延时，Top level 的执行在没错误的情况下是不会阻塞的。

但是有了而 top level await 之后，`sleep` 就变得顺理成章了：

```typescript
// define sleep function
const sleep = (sec: number) => {
    return new Promise((reslove) => {
        setTimeout(reslove, sec);
    });
};

// use in top level
console.log('execute at time 0');
await sleep(3);
console.log('execute at time 3');
```

有人说 [Top-level await is a footgun](https://gist.github.com/Rich-Harris/0b6f317657f5167663b493c722647221)，理由也很简单，阻塞了主线程执行，可能一个再正常不过的请求就会导致执行阻塞。

当然，只要加个 wrapper,就能实现伪 top level await 了 ~~机智的地球人~~：

```typescript
(async()=>{
    // everthing here！！！
    // I am top level :)
    await sleep(3);
})();
```

使用自然见仁见智了，但是如果运行环境不是浏览器，那么 Deno 的这个特性将会带来不少便利。比如上面提到的 `sleep` 函数，以及异步迭代器（`for await`），请求发送等等。

