# 贡献指南  <!-- omit from toc -->

- [Monorepo 和 pnpm](#monorepo-和-pnpm)
    - [其他准备事项](#其他准备事项)
  - [目录结构](#目录结构)
    - [公共样式、方法和类型声明](#公共样式方法和类型声明)
      - [公共样式](#公共样式)
      - [公共类型](#公共类型)
      - [工具代码](#工具代码)
  - [组件开发](#组件开发)
    - [目录结构](#目录结构-1)
    - [编写组件](#编写组件)
    - [声明组件的属性](#声明组件的属性)
    - [暴露 `ref` 句柄](#暴露-ref-句柄)
    - [导出子组件](#导出子组件)
    - [组件样式](#组件样式)
  - [文档编写](#文档编写)
    - [文档目录结构说明](#文档目录结构说明)
    - [使用 Markdown](#使用-markdown)
      - [添加文档标题](#添加文档标题)
      - [添加文档章节](#添加文档章节)
      - [添加示例框](#添加示例框)
      - [注入前置代码](#注入前置代码)
      - [文档分割](#文档分割)
    - [使用 TypeScript React](#使用-typescript-react)


## 写在前面

### 如何贡献代码

我们重视每位参与者的贡献，感谢每一行代码的产生。同时，为了维护组件库代码提交规范性，推荐采用以下流程提交代码

1. 在 Github 上 fork [此项目](https://github.com/itsatan/yike-design-react) 到你的帐户中
2. 克隆自己的 fork 到本地，并将此项目添加为 upstream

    ```bash
    git clone git@github.com:<GitHubAccountName>/yike-design-react.git
    cd ./yike-design-react
    git remote add upstream https://github.com/ecaps1038/yike-design-dev.git
    ```

3. 每当你准备开始一个新功能的开发或者提交 PR 之前，请先从 upstream 拉取最新的代码并合并到仓库的对应分支

    ```bash
    git fetch --all
    git checkout yike-dev
    git pull upstream yike-dev
    ```

4. 创建需求分支

    > ⚠️ 对于每个开发需求，需要在本地仓库先建立一个新的分支。尽量**避免**在一个分支上完成多个需求。

    推荐按照 `<type>/<scope>/<description>` 的格式命名分支，其中
     - `<type>` 表示分支类型，可以是以下其一：
       - `feature` 功能分支
       - `fix` 修复分支
       - `docs` 文档分支
       - `refactor` 重构分支
       - `misc` 杂项分支（若不属于以上任一分支才使用）
     - `<scope>` 表示涉及的组件或模块，例如 button、icon、upload、utils 等；若是关于项目基础设施（如脚手架、构建配置等），则为 base
     - `<description>` 可选，表示分支的更具体内容。根据你的功能来自由命名，采用短横线命名法。如果有对应的 Github Issue ，可以使用 Issue 编号作为前缀

    分支名具体例子：
     - `feature/button`
     - `feature/base/add-markdown-pure`
     - `fix/icon/issue-5-misalignment`
     - `docs/upload/add-image-preview`
     - `refactor/base/project-structure`

5. 编写完成后，先重复第 3 步，从 upstream 拉取最新代码，然后将本地代码 push 到自己 fork 的仓库中，然后

### 提交规范

我们使用了 `commitlint/config-conventional` 对提交信息进行校验，因此强烈建议你按照[约定式提交规范](https://www.conventionalcommits.org/zh-hans/v1.0.0/)来撰写你的提交内容


我们提供以下关键字用作提交类型 type
- `feat` 新特性、新功能
- `fix` 修复 Bug
- `docs` 文档修改
- `refactor` 代码重构
- `chore` 其他修改, 比如改变构建流程、或者增加依赖库、工具等
- `build` 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
- `test` 测试用例修改
- `revert` 回滚某次提交

以下是具体实例。当然，中文的提交说明目前也是可接受的！
```
feat(button): 新增 Button 组件
```
```
fix(icon): misalignment when placed along with texts

Fixes #12
```


# Monorepo 和 pnpm

该项目使用 Monorepo 组织仓库代码，并使用 `pnpm` 来进行包管理。如果还没有安装，请运行以下命令全局安装 `pnpm`

```bash
npm i -g pnpm
```

之后便可以使用 `pnpm` 进行包管理了

```bash
pnpm i
```


### 其他准备事项

该项目借助 EditorConfig、ESLint、Prettier、Stylelint 来完成 TypeScript JSX、Sass 代码规范检查和格式化，如果你使用 VS Code，请先安装好对应的插件。

仓库提供了 VS Code 工作区配置文件，主要做了以下设置：
- 设定默认的格式化程序
- 开启保存时自动格式化

如果你使用 VS Code 进行开发，一般来说，不再需要对 VS Code 设置进行调整。


## 目录结构

```
|- demo/                  # 文档工程目录
|  |- public/             # 文档工程静态资源目录
|  |- src/
|  |  |- assets/          # 文档工程资源
|  |  |- components/      # 组件
|  |  |- constant/
|  |  |- layout/          # 布局
|  |  |- router/          # 路由
|  |  |- styles/          # 样式
|  |  |- theme/
|  |  |- view/
|  |  |- App.scss
|  |  |- App.tsx
|  |  `- main.tsx         # 入口文件
|  |- env.d.ts
|  |- index.html
|  |- package.json
|  |- tsconfig.json
|  `- vite.config.ts
|- packages/
|  `- yike-design/              # 组件库工程目录
|     |- src/
|     |  |- assets/             # 资源目录
|     |  |- common/             # 公共代码目录
|     |  |- components/         # 组件目录
|     |  |- styles/             # 公共 Sass 样式目录
|     |  |  |- _variables.scss  # 公共 Sass 变量
|     |  |  `- index.scss
|     |  |- utils/              # 工具代码目录
|     |  `- index.ts            # 组件库入口文件
|     |- package.json
|     |- tsconfig.json
|     `- vite.config.ts
|- CONTRIBUTING.md              # 贡献指南（也就是本文档）
|- package.json
|- README.md                    # README 文档
|- package.json
|- tsconfig.json
|- ...
```

### 公共样式、方法和类型声明

#### 公共样式

[查看 Yike Design 设计稿](https://codesign.qq.com/s/6W3G0m4m8q9lOwL)

为了保持组件库所有组件样式风格统一，请遵循 Yike Design 设计稿中的样式进行开发，且推荐采用 `_variables.scss`、`_functions.scss`、`_mixins.scss` 中的 Sass 变量、函数和混入

```scss
@use "../styles/variables.scss";
@use "../styles/functions.scss";
@use "../styles/mixins.scss";
```

> ⚠️ 该部分暂不完整，等待后续补充完备

> 💡 未来计划：为了在开发时减少手动导入，将对 Sass 编译配置修改，以达到自动在文件头部插入以上 `@use` 指令，无须再手动添加


#### 公共类型


#### 工具代码

每一个工具函数一个文件，并使用 `export default` 默认导出。然后在 `index.ts` 中将工具函数导入，同时进行单独导出和合并导出：

```ts
// utils/myUtilFunc.ts
const myUtilFunc = () => {};

export default myUtilFunc;


// utils/index.ts
import myUtilFunc from './myUtilFunc';

export {
  someOtherUtil,
  myUtilFunc,
};

const Utils = {
  someOtherUtil,
  myUtilFunc,
};

export default Utils;

```


## 组件开发


### 目录结构

以 `Button` 组件为例


```
- components
  |- Button                 # Button 组件目录
  |  |- Button.scss         # Button 样式文件
  |  |- Button.tsx          # Button 代码文件
  |  |- ButtonGroup.scss    # ButtonGroup 样式文件
  |  |- ButtonGroup.tsx     # ButtonGroup 代码文件
  |  `- index.ts            # 组件入口文件
  |- ...
```


### 编写组件

```tsx
// Button.tsx

// 1 //
// 导入实现该组件所需要的任何其他库、代码或是资源
import './Button.scss';

// 2 //
// 导出该组件所有属性类型声明
export interface ButtonProps {
  /* ... */
}

// 3 //
// 组件渲染函数及其代码
const Button: React.FC<ButtonProps> = (props) => {
  /* ... */
};

// 4 //
// 使用 export default 导出
export default ForwardRefButton;


// index.ts
// 作为入口点，在该文件统一导出
import Button from './Button';

export type { ButtonProps } from './Button';

export default Button;
```

> ⚠️ 由于组件属性类型声明与组件本身是强绑定的，因此**不推荐**（也没必要）单独写在一个文件中


### 声明组件的属性

```ts
export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'outline' | 'ghost';
  status?: 'normal' | 'success' | 'warning' | 'danger';
  size?: 's' | 'm' | 'l';
  shape?: 'square' | 'rounded' | 'circle';
  block?: boolean;
  disabled?: boolean
}
```

在 `interface ButtonProps` 中声明组件可以接收的属性，`?` 表示该属性为可选

> 💡 通常来说，组件的属性都是可选的

通过在组件渲染函数中对 `props` 参数进行解构赋值获取每个属性值

```tsx
const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (props) => {
  const {
    children,

    type = 'primary', // 赋予默认值 'primary'
    status = ''
  } = props;

  return (<button>{children}</button>);
};
```


### 暴露 `ref` 句柄

> ⚠️ 如果组件**明确不需要**这种行为，则可以跳过这一节

通过包裹 `React.forwardRef()` 让组件接收来自父组件的 `ref`。修改之前的代码

```tsx
// Button.tsx

// 3 //
// 添加第二个参数 ref， 并修改原有的类型注解
// 类型注解可以写在 const 声明上
const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
  /* ... */
  return (<button ref={ref}>{children}</button>);
}

// 类型注解也可以写在函数的每个参数上
const Button = (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
  /* ... */
  return (<button ref={ref}>{children}</button>);
}

// 4 //
// 用 React.forwardRef(Button) 包裹
const ForwardRefButton = React.forwardRef(Button);

// 手动设置一次 displayName，可以不写
ForwardRefButton.displayName = 'Button';

// 将包装过的组件导出
export default ForwardRefButton;
```

> 💡 这样做通常是暴露 DOM 节点给父组件，但你也可以选择暴露例如自定义方法等其他东西，详见 [`React.useImperativeHandle()`](https://zh-hans.react.dev/reference/react/useImperativeHandle#usage)



### 导出子组件

例如 `ButtonGroup` 和 `Button`

```
`- Button
 |- Button.tsx
 |- Button.scss
 |- ButtonGroup.tsx
 |- ButtonGroup.scss
 `- index.ts
```

由于 `ButtonGroup` 总是需要和 `Button` 配合使用，因此不需要单独导出 `ButtonGroup`，而是把 `Button` 看作一个命名空间，将 `ButtonGroup` 放在 `Button` 命名空间内

```tsx
// 不需要再单独引入
// import ButtonGroup from '@yike-design/react/Button/ButtonGroup';

// Button 此时既是组件也是命名空间
import Button from '@yike-design/react/Button';

const MyPage = () => {
  return (
     <Button.Group>
       <Button>Add</Button>
       <Button>Edit</Button>
       <Button>Remove</Button>
     </Button.Group>
  );
};
```

要达到这样的效果，修改之前的代码


```tsx
// ButtonGroup.tsx

export interface ButtonGroupProps {}

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  /* ... */
};

export default ButtonGroup;


// Button.tsx

// 1 //
// 导入 ButtonGroup
import ButtonGroup from './ButtonGroup';
/* ... */

// 4 //
// 修改类型注解
// 将 ButtonGroup 附加在 Button 上，并修改导出
const ButtonComponent = Button as typeof Button & {
  Group: typeof ButtonGroup;
};

ButtonComponent.Group = ButtonGroup;

export default ButtonComponent;


// index.ts

// 其余不变，仅额外导出 ButtonGroup 的属性声明
export type { ButtonGroupProps } from './ButtonGroup';
```


### 组件样式

组件的 CSS 样式类名统一以 `.yk-` 作为前缀，并遵循 [CSS BEM 命名规范](https://juejin.cn/post/6844903672162304013)，即

```
.yk-<块>-<元素>--<修饰符>
```

例如

```scss
// Button.scss
.yk-button {
  .yk-button--primary {}
  .yk-button--size-s {}
  .yk-button--state-success {}
  .yk-button--shape-circle {}
  .yk-button--block {}
}

// ButtonGroup.scss
.yk-button-group {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  .yk-button {
    flex: 0 0 auto;
  }
}
```

尽管使用了 BEM 命名规范，但对于 DOM 层级较复杂的组件还是
  1. 尽可能地控制单个类名中表示 Element 的数量（最好只有 1 个），以保持类名简短
  2. 在一定程度上合理地反映 DOM 结构的大致关系


例如

```tsx
// Modal.tsx

const Modal = () => {
  return React.createPortal(
    (
      <span>
        <div className="yk-modal">
          <div className="yk-modal-backdrop"></div>

          <div className="yk-modal-content">
            <div className="yk-modal-header"></div>
            <div className="yk-modal-body"></div>
            <div className="yk-modal-footer"></div>
          </div>
        </div>
      </span>
    ),
    document.body,
  );
};
```

```scss
// Modal.scss
$prefix: "yk-modal";

.#{$prefix} { // -> .yk-modal
  & &-content { // -> .yk-modal .yk-modal-content
    & .#{$prefix}-header {} // -> .yk-modal .yk-modal-content .yk-modal-header
    & .#{$prefix}-body {}   // -> .yk-modal .yk-modal-content .yk-modal-body
    & .#{$prefix}-footer {} // -> .yk-modal .yk-modal-content .yk-modal-footer
  }

  & &-backdrop {} // -> .yk-modal .yk-modal-backdrop
}
```


## 文档编写

### 文档目录结构说明

```
`- /demo/src/view/Module/         # 组件示例和 API 文档
   |- Button/                     # 单个组件目录
   |  |- index.md                 # 文档入口 [*]
   |  `- index.tsx                # 文档入口 [*]
   |- ...
```

> 👍 优先考虑使用 Markdown 来编写文档。仅当编写 Markdown 不能满足要求时才使用 TypeScript React 编写文档

> ⚠️ 若 Markdown 或 TypeScript React 都存在，则只有 TypeScript React 生效


### 使用 Markdown

我们为 vite 编写了一个 Markdown 插件 [vite-plugin-md](./demo/plugins/vite-plugin-md.ts)，并在 Markdown 原有语法上做了一些拓展，以便使用 Markdown 直接编写组件文档。同时，插件会自动导入以下库和组件，你可以直接使用而不再需要使用 import 块导入

```tsx
// React
import React from 'react';
// classnames
import classNames from 'classnames';
// 文档工程的所有通用组件 demo/src/components
import { ... } from '@/components';
// Yike Design 的所有组件
import Yk from '@yike-design/react';
```

#### 添加文档标题

添加 Markdown 的 1 级标题即可

```md
# Typography 排版
用于展示标题、段落、文本内容
```


#### 添加文档章节

添加一个 2 级标题即可

```md
# Typography 排版
用于展示标题、段落、文本内容

## 标题
不同等级的标题
```


#### 添加示例框

添加一个围栏式代码块，并在语言标记后跟随一个 `[demo]` 指令，即可将该代码块标记为示例框。渲染后的示例展示和代码会自动包裹在一个卡片中

~~~md
## 标题文字
不同等级的标题

```tsx [demo]
<Yk.Typography.Title level={1}>Heading 1</Yk.Typography.Title>
<Yk.Typography.Title level={2}>Heading 2</Yk.Typography.Title>
<Yk.Typography.Title level={3}>Heading 3</Yk.Typography.Title>
<Yk.Typography.Title level={4}>Heading 4</Yk.Typography.Title>
<Yk.Typography.Title level={5}>Heading 5</Yk.Typography.Title>
<Yk.Typography.Title level={6}>Heading 6</Yk.Typography.Title>
```
~~~

如果你需要编写完整的示例组件以使用 React Hooks 等，则可以在代码块语言标记添加一个 `[name]` 指令并指定与示例组件相同的名称。例如

```tsx [demo][name=FullDemo]
const FullDemo = () => {
  const state = React.useState(false);

  React.useEffect(() => { /* ... */ }, [])

  return /* ... */;
};
```

> ⚠️ 请自行保证示例组件名称在整篇文档中的唯一性


#### 注入前置代码

如果你的示例需要导入其他第三方库或者定义文档内的全局变量等，你可以添加一个围栏式代码块，并在语言标记后跟随 `[pre]` 指令

~~~
```tsx [pre]
import _ from 'lodash';
import axios from 'axios';

const ax = axios.create({ baseURL: '/api' });
```
~~~

> ⚠️ 请自行保证导入名和变量名在整篇文档中的唯一性


#### 文档分割

如果文档内容比较多，想分割为若干个子文档，那么可以添加一个围栏式代码块，将其语言标记为 `docref` 并在其后跟随子文档的路径即可

~~~md
```docref ./ButtonExample1.md
```
~~~


### 使用 TypeScript React

一切由你决定
