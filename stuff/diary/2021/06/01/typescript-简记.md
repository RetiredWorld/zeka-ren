---
date: 2021-06-01
title: Typescript 简记
tags:
  - 前端
---
之前总是在写，而没有参照文档。最近抽空简单看了看文档，大概梳理了一下。

例子是自己写的，稍微结合了下自己的使用场景，希望能有帮助。

~~反正还是会忘，就算记下来了也不会翻。~~



# 接口声明

```ts
interface Item {
	my: string
}

interface SimpleDict {
    [dicStr: string]: Item
}

interface IWithFunc {
	foo(item: Item): void
}
```





# 声明类型并解构

```tsx
interface IProps {
    fuck: string
   	girlFriend: false
}

// for simple function
const demoFunc = ({ girlFriend }: IProps) => {
    console.log(`You have ${girlFriend ? 'a' : 'no'} girlfriend.`);
};

// React.FC is discouraged, but for me, I like it.
// See: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components
export const ReactFC: FC<IProps> = ({ girlFriend }) => {
    return (<>{ girlFriend }</>);
};
```

由于基本只作为用户，而不作为包提供者，所以是使用泛型多于自己定义。



# 强转类型

```ts
const ele = document.getElementById('some-id') as HTMLCanvasElement;
ele.getContext('2d');
// I prefer angle-bracket syntax
const ele2 = <HTMLCanvasElement>document.getElementById('some-id');
```

~~指鹿为马~~

不管看多少次还是感觉很变态（不是）。

```ts
let AString = 'I am a string!!!';
const BNum = (AString as any) as number;
// do it with two angle-bracket syntax
const CNum = <number><any>Astring;
```



# 枚举与元组

这两个在 `vanilla JavaScript` 中是不出现的。

枚举状态号：

```ts
enum StatusCode {
    OK = 0
    WARN
    ERROR
}

if (someThingWrong) {
    return StatusCode.ERROR;
} else {
    return StatusCode.OK;
}
```

元组：

> 暂时主要只想到在 `useState` 中使用，因为它恰好是返回一个元组。
>
> 其实可以不需要，类型推断大部分时候都足够了。

```ts
const myStat: [IProps, React.Dispatch<React.setStateAction<IProps>>] = useState<IProps>({});
```

我基本只有在偶尔需要将 `setter` 作为参数传递出去的时候才进行声明，当然传递出去不是好事，因为状态应该是组件的，`setter` 应该也只通过自己访问。

要做更好设计，可以考虑同时结合 `useContext` 和 `useRef` 钩子。其中 `Ref` 钩子范用性很强，不止可以绑定 DOM 元素。



# 模块声明

默认配置好的 `tsconfig.json` 会自动解析目录下的所有 `*.d.ts` 文件。

`d.ts` 文件中只要有 `export` 与 `import` 语句，就会被识别为一个模块。

模块非全局可见，要使用必须导入。

```typescript
// module example
import SomeType from 'some-where';

export declare namespace MyNamespace {
    let varName: string;
    const cvName: string;
   	function foo(someVar: string): void;
    interface Laap {
    	prop: string
    }
}
```

但是有时想使用全局模块，但是不得不导入其他文件的类型声明。我们可以用类似异步的方法导入。注意 `d.ts` 永远不会被编译出结果代码，所以无论怎样书写都行（不是）。

在这里，实际并不是异步导入。

```typescript
// global example

// access Items.item everywhere through your project
declare namespace Items {
    const item: import('types').ItemProp;
}
```



# 多类型与判断

我看 TS 文档，感觉其实它主要是在强调它很强（~~我很强，非常强，比你们都强~~）。这说的不是类型的强，而是它具有足够强大的类型推断能力。因此你可以放心的将很多事情交给他。

比如 TS 可以很方便的通过分支上下文推断具体类型：

```ts
type NumAndStr = number | string;
let var1: NumAndStr = 1;

if (typeof var1 === 'string') {
    // become string
    const foo = var1.split('/');
} else {
    const foo2 = var1 + 1;
}
```

`typeof` 基本只能推断出基本类型。要推断构造类型，使用 `instanceof` 即可，TS 也能准确的推断出来：

```typescript
type dateObj = Date | null;

let var1: dateObj = new Date();

if (var1 instanceof Date) {
    // Date type
} else {
    // null
}
```

如果是更多类型，可以简单写一个 `switch`。

此外还有函数重载等等。在我短暂的一生中，基本没有遇到需要使用函数重载的情况，因为太菜不需要做各种兼容。



# 与 React 使用

与 React 使用变为有点复杂的事情了，因为你可能同时要与浏览器类型与 React 类型打交道。浏览器发展到今天，类型声明已经非常惊人了。

~~即使是写一点简单的页面都感觉自己在和大项目打交道。~~

这些东西太多太杂。我的处理方式是首先书写数值，然后通过 IDE 推断出类型，然后再将推断出的类型提取出来。这在 IDE 中通过内置文档就能做到，毕竟基本大一点的项目类型声明写的还是舒服的。

如果还是有问题或者有疑问，那还是只能在网上查找相关文档或者解决方法。

~~或者 any。~~