# 贡献指南  <!-- omit from toc -->

- [开始之前](#开始之前)
- [项目主要目录结构说明](#项目主要目录结构说明)
- [编写组件](#编写组件)
  - [起手结构](#起手结构)
  - [暴露 `ref` 句柄](#暴露-ref-句柄)
  - [导出子组件](#导出子组件)
  - [组件样式](#组件样式)
- [](#)


## 开始之前

该项目借助 EditorConfig、ESLint、Prettier、Stylelint 来完成 TypeScript JSX、Sass 代码规范检查和格式化，如果你使用 VS Code，请先安装好对应的插件。

仓库提供了 VS Code 工作区配置文件，主要做了以下设置：
- 设定默认的格式化程序
- 开启保存时自动格式化

如果你使用 VS Code 进行开发，一般来说，不再需要对 VS Code 设置进行调整


## 项目主要目录结构说明

项目内主要包含两个源码目录

- `site` 用于展示所有组件的实时演示和 API 文档的站点源码和资源
- `src` 组件库所有组件的源码和资源


## 编写组件

> 💡 本节主要以编写**按钮**及相关组件为例，其中也可能会穿插其他组件的内容作为附加说明


### 起手结构

首先，在 `src` 中新建一个与组件的同名的目录，你的组件将会在这个目录内进行编写。组件名称应当使用 PascalCase，在这个例子中就是 `Button`。因此在 `src` 目录下新建一个 `Button` 目录，并在其中新建一个 `Button.tsx`、`Button.scss` 和 `index.ts` 文件


```
`- src
 `- Button
  |- Button.tsx
  |- Button.scss
  `- index.ts
```

在 `Button.tsx` 和 `index.ts` 中添加代码

```tsx
// Button.tsx

// 1 //
import './Button.scss';

// 2 //
export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'outline' | 'ghost';
  status?: 'normal' | 'success' | 'warning' | 'danger';
  size?: 's' | 'm' | 'l';
  shape?: 'square' | 'rounded' | 'circle';

  /* ...需要的其他属性等等... */
}

// 3 //
const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
  } = props;

  /* ... */

  return (<button>{children}</button>);
};

// 4 //
export default ForwardRefButton;


// index.ts
// 在该文件统一的导入导出这个组件所有应当导出的定义
import Button from './Button';

export type { ButtonProps } from './Button';

export default Button;
```

在以上代码中
  1. 导入实现该组件所需要的任何其他库、代码或是资源
  2. 导出该组件所有属性类型声明
  3. 组件渲染函数及其代码
  4. 使用默认导出组件

> ⚠ 由于组件属性类型声明与组件本身是强绑定的，因此不推荐也没必要单独写在一个文件中



### 暴露 `ref` 句柄

> ⚠️ 如果组件**明确不需要**这种行为，则可以跳过这一节

通过包裹 `React.forwardRef()` 让组件接收来自父组件的 `ref`。修改之前的代码

```tsx
// 3 //
const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
  /* ... */
  return (<button ref={ref}>{children}</button>);
}

/* 你也可以写成 */
const Button = (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
  /* ... */
  return (<button ref={ref}>{children}</button>);
}

// 4 //
const ForwardRefButton = React.forwardRef(Button);

/* 手动设置一次 displayName，可以不写 */
ForwardedRefButton.displayName = 'Button';

/* 将包装过的组件导出 */
export default ForwardRefButton;
```

> 💡 这样做通常是暴露 DOM 节点给父组件，但你也可以选择暴露例如自定义方法等其他东西，详见 [`React.useImperativeHandle()`](https://zh-hans.react.dev/reference/react/useImperativeHandle#usage)



### 导出子组件

假设 `Button` 有一个子组件 `ButtonGroup` 放在同一目录下

```
`- Button
 |- Button.tsx
 |- Button.scss
 |- ButtonGroup.tsx
 |- ButtonGroup.scss
 `- index.ts
```

我们希望仅通过导入 `Button` 便能使用 `ButtonGroup`

```tsx
// 不需要再单独引入
// import ButtonGroup from '@yie-design/Button/ButtonGroup';
import Button from '@yike-design/Button';

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
// Button.tsx

// 1 //
// 导入 ButtonGroup
import ButtonGroup from './ButtonGroup';
/* ... */

// 4 //
// 修改导出
const ButtonComponent = Button as typeof Button & {
  Group: typeof ButtonGroup;
};

ButtonComponent.Group = ButtonGroup;

export default ButtonComponent;

// index.ts

// 仅额外导出 ButtonGroup 的属性声明
export type { ButtonGroupProps } from './ButtonGroup';

/* ... */
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

尽管使用了 BEM 命名规范，对于 DOM 层级较复杂的组件
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


##
