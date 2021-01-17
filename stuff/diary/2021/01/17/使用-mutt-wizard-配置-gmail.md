---
date: 2021-01-17
title: 使用 mutt wizard 配置 gmail
tags: []
---
> 参考的是 [Mutt 终端邮箱](https://teaper.dev/Mutt-f17401710cb4432f824e66bfcd5d0c2c),gmail 流程稍有不同。

使用顺利，但是在生成完密钥，输入帐号密码登陆 gmail 的时候出现了问题：

```bash
mw -a mymail@gmail.com -x "mypasswd"
```

提示密码错误，按照某个 issue 提到的，密码中的特殊字符需要转义，如 `!` 需要转化为 `\!`。测试后失败。

再依据 [这个 issue](https://github.com/LukeSmithxyz/mutt-wizard/issues/246) 提到的，由于我的 gmail 开启了多步验证，所以不允许任意 app 登陆。mutt 作为一个 app,需要使用 google 生成一个 app token 登陆（也就是以 app 形式登陆，参考 OAuth 模型，不直接使用主密码有利于防止第三方客户端滥用帐号的全部权限）。

在 [这里](https://myaccount.google.com/security) 下面的 “App passwords” 申请一个密钥，中间要求输入帐号密码确认，确认后点击生成就能获取一个全新的密钥。

再使用这个密钥登陆就可以啦：

```bash
mw -a mymail@gmail.com -x "apppasswd"
```