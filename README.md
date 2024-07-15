# vue-template

前端项目模板：旨在提供一个高效、稳定且易于维护的 Vue 项目起点。



## 项目结构

```js
vue-template/
|- bin          // bat脚本，可在无需打开编辑器的情况下运行和打包项目
|- node_modules         // 下载的依赖包
|- public       // 静态页面目录
   |- favicon.ico      // 项目图标
   |- index.html       // 项目入口
|- src      	// 源码目录
   |- api      	   // http 请求目录
      |- index.js        // api 地址管理
      |- interceptor.js  // axios 拦截器
      |- requestor.js    // axios 请求封装
   |- assets       // 静态资源目录，这里的资源会被wabpack构建
      |- fonts           // font 存放目录
      |- icons           // icon 存放目录
      |- images          // image 存放目录
      |- styles          // 公共样式 styles 存放目录
		 |- font.css      		// 引入和定义自定义字体
         |- global.scss      	// 公共样式
         |- mixin.scss      	// 通用混入样式
         |- normalize.css       // 规范化样式表
         |- reset.css      		// 重置样式表
         |- transition.css      // 过度样式
   |- components   // 组件
      |- FileUpload.vue          // 文件上传
      |- ImageUpload.vue         // 图片上传
      |- SvgIcon.vue         	 // svg加载器
      |- NavMenu.vue         	 // 导航菜单
      |- SlideVerify.vue         // 图片验证
		 ......
   |- mixins       // 混入
      |- crudMixin.js       // 通用 crud 混入
   |- plugins      // 按需引入插件（可选）
   |- router       // 路由
      |- index.js         		// 路由管理
      |- permission.js          // 路由拦截器
   |- store        // 全局状态管理（可选）
   |- utils        // 工具存放目录
      |- coords.js        	// 坐标转换工具
      |- crypto.js        // 加解密工具
      |- func.js          // 常用函数
      |- sort.js          // 数组排序工具
      |- uuid.js          	// uuid生成工具
      |- validate.js      // 校验工具
   |- views        // 页面存放目录
      |- backPages      	// 后台页面存放目录
      |- errorPages      	// 错误页面存放目录
      |- mainPages      	// 主页面存放目录
   |- App.vue      		// 根组件
   |- main.js      		// 入口文件
   |- tests        		// 测试用例（可选）
   |- .env.dev          // 开发环境配置
   |- .env.prod         // 正式环境配置
   |- .gitignore        // git 忽略规则
   |- babel.config.js   // babel 规则
   |- package.json      // 依赖
   |- package-lock.json // 依赖锁
   |- README.md         // 项目 README
   |- vue.config.js 	// webpack 配置
```



## 开发规范

市面上常用的命名规范：

- `camelCase`（小驼峰式命名法 —— 首字母小写）
- `PascalCase`（大驼峰式命名法 —— 首字母大写）
- `kebab-case`（短横线连接式）
- `Snake`（下划线连接式）

### 1.1 项目文件命名

#### 1.1.1 项目名

全部采用小写方式， 以**短横线**分隔。例：`my-project-name`。

#### 1.1.2 目录名

**参照项目命名规则，有复数结构时，要采用复数命名法**。例：`assets`、`components`、`directives`、`mixins`、`utils`、`views`。

#### 1.1.3 图像文件名

全部采用小写方式， 优先选择单个单词命名，多个单词命名以**下划线**分隔。例：`logo_police.gif`、`pic_people.jpg`、`pic_TV.jpg`。

#### 1.1.4 HTML 文件名

全部采用小写方式， 优先选择单个单词命名，多个单词命名以**下划线**分隔。例：`error_report.html`

#### 1.1.5 CSS 文件名

全部采用小写方式， 优先选择单个单词命名，多个单词命名以**短横线**分隔。例：`normalize.less`、`date-picker.scss`

#### 1.1.6 JavaScript 文件名

全部采用小写方式， 优先选择单个单词命名，多个单词命名以**短横线**分隔。例：`index.js`、`date-util.js`

> 上述规则可以快速记忆为“静态文件下划线，编译文件短横线。



### 1.2 Vue 组件命名

#### 1.2.1 单文件组件名

文件扩展名为 `.vue` 的 `single-file components` (单文件组件)。单文件组件名应该始终是**单词大写开头** (PascalCase)。

```
components/
|- MyComponent.vue
```

#### 1.2.2 单例组件名

**只拥有单个活跃实例的组件应该以 `The` 前缀命名，以示其唯一性。**

这不意味着组件只可用于一个单页面，而是_每个页面_只使用一次。这些组件永远不接受任何 prop，因为它们是为你的应用定制的。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，_只是目前_在每个页面里只使用一次。

比如，头部和侧边栏组件几乎在每个页面都会使用，不接受 prop，该组件是专门为该应用所定制的。

```
components/
|- TheHeading.vue
|- TheSidebar.vue
```

> 组件名应该始终是多个单词组成（大于等于 2），且命名规范为PascalCase格式。
>
> 这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的。
>
> 单词大写开头对于代码编辑器的自动补全最为友好，因为这使得我们在 JS(X) 和模板中引用组件的方式尽可能的一致。



### 1.3 代码参数命名

#### 1.3.1 模板中组件

**对于绝大多数项目来说，在单文件组件和字符串模板中组件名应该总是 PascalCase 的，但是在 DOM 模板中总是 kebab-case 的。**

```
<!-- 在单文件组件和字符串模板中 --> 
<MyComponent/>

<!-- 在 DOM 模板中 --> 
<my-component></my-component>
```

#### 1.3.2 prop

**在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case**。我们单纯的遵循每个语言的约定，在 JavaScript 中更自然的是 camelCase。而在 HTML 中则是 kebab-case。

```vue
<MyComponent text-value='test'></MyComponent>
export default {
  name: 'MyComponent',
   props: {
    textValue: {
      type: String,
      required: true,
      default: ''
    }
  }
}
```

#### 1.3.3 router

**path除了采用kebab-case命名规范以外，必须以 / 开头，即使是children里的path也要以 / 开头**。若不用以/开头，path为parent和children组成的，可能需要在router文件里搜索多次才能找到，而如果以/开头，则能立刻搜索到对应的组件

**name 命名规范采用KebabCase命名规范且和component组件名保持一致！**因为要保持keep-alive特性，keep-alive按照component的name进行缓存，所以两者必须高度保持一致

```
{
    path: '/file',
    name: 'File',
    component: Main,
    meta: {
      title: '文件服务',
      icon: 'ios-cloud-upload'
    },
    children: [
      {
        path: '/file/file-list',
        name: 'FileList',
        component: () => import('@/views/file/file-list.vue')
      },
      {
        path: '/file/file-add',
        name: 'FileAdd',
        component: () => import('@/views/file/file-add.vue')
      },
      {
        path: '/file/file-update',
        name: 'FileUpdate',
        component: () => import('@/views/file/file-update.vue')
      }
    ]
  }
```

#### 1.3.4 自定义事件

**自定义事件应始终使用 kebab-case 的事件名。**

不同于组件和 prop，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称。

`v-on` 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 `v-on:myEvent` 将会变成 `v-on:myevent`——导致 `myEvent` 不可能被监听到。

```
this.$emit('my-event')
<MyComponent @my-event="handleDoSomething" />
```

为了区分 _原生事件  和 _自定义事件_ 在 Vue 中的使用，建议除了多单词事件名使用 kebab-case 的情况下，命名还需遵守为 **`on` + 动词** 的形式

```
<!-- 父组件 -->
<div
  @on-search="handleSearch"
  @on-clear="handleClear"
  @on-clickoutside="handleClickOutside">
</div>
// 子组件
export default {
  methods: {
    handleTriggerItem () {
      this.$emit('on-clear')
    }
  }
}
```

#### 1.3.5 事件方法

- 命名方法：camelCase
- 命名规范：handle + 名称（可选）+ 动词

```
<template>
  <div
    @click.native.stop="handleItemClick()"
    @mouseenter.native.stop="handleItemHover()">
  </div>
</template>

<script>

export default {
  methods: {
    handleItemClick () {
      //...
    },
    handleItemHover () {
      //...
    }
  }
}
</script>
```

#### 1.3.6 样式命名

css命名时请参考 `BEM` 命名规范：

- Bem 是块（block）、元素（element）、修饰符（modifier）的简写，由 Yandex 团队提出的一种前端 CSS 命名方法论。

> \-  中划线 ：仅作为连字符使用，表示某个块或者某个子元素的多单词之间的连接记号。

> __  双下划线：双下划线用来连接块和块的子元素

> _   单下划线：单下划线用来描述一个块或者块的子元素的一种状态

```css
.block {}

.block__element {}

.block--modifier {}
```



## 组件文档

### svg-icon

自定义全局 Svg Icon 图标组件。

默认在 @/icons/index.js 中注册到全局中，可以在项目中任意地方使用。所以图标均可在 @/icons/svg。可自行添加或者删除图标，所以图标都会被自动导入，无需手动操作。

#### 使用方式

```html
<!-- icon-class 为 icon 的名字; class-name 为 icon 自定义 class-->
<svg-icon icon-class="password"  class-name='custom-class' />
```

#### 改变颜色

`svg-icon` 默认会读取其父级的 color `fill: currentColor`;

你可以改变父级的`color`或者直接改变`fill`的颜色即可。

> 如果是从 [iconfont (opens new window)](https://www.iconfont.cn/)下载的图标，记得使用如 Sketch 等工具规范一下图标的大小问题，不然可能会造成项目中的图标大小尺寸不统一的问题。



### file-upload

自定义全局文件/图片上传组件。

使用v-model实现双向绑定，并在内部处理了图片回显。只需要绑定v-mode就可以实现图片上传与回显。

#### 使用方式

```vue
<!-- limit 为最大允许上传个数，达到最大上传个数则隐藏图片上传框 -->
<image-upload v-model="editorForm.headSculpture" :limit="1"></image-upload>
```

#### 属性

| 参数            | 说明       | 类型         | 默认值                                             |
| --------------- | ---------- | ------------ | -------------------------------------------------- |
| value / v-model | 绑定值     | String/Array | []                                                 |
| action          | 上传地址   | String       | process.env.VUE_APP_BASE_API + '/file/uploadMinio' |
| prefix          | 图片前缀   | String       | process.env.VUE_APP_RESOURCE_URL                   |
| headers         | 上传请求头 | Object       | {token: getToken()}，getToken()：公用获取token方法 |
| limit           | 允许上传数 | Number       | undefind                                           |
| readOnly        | 是否只读   | Boolean      | false                                              |



### horizon-scroll

自定义全局水平方向滚动组件。

不再需要 `shift` 配滚轮实现水平方向滚轮，使用 `horizon-scroll` 组件包裹你需要水平滚动的内容，便可直接使用滚轮进行水平方向滚动。

#### 使用方式

```vue
<!-- 使用 HorizonScroll 组件包裹需要滚动内容即可 -->
<HorizonScroll>
    <ul style="display: flex">
        <li v-for="item in 100" :key="item">
            <img src="../../../assets/images/main/button_active.png" alt="">
            <p>测试{{ item }}</p>
        </li>
    </ul>
</HorizonScroll>
```

#### 实现原理

组件通过`transform`属性先将外部容器`.v-scroll`逆时针旋转并垂直平移，然后在其内部`.content`元素中顺时针旋转内容以恢复水平排列，并通过`left: var(--scroll-h);`定位`.content`到容器底部，同时利用`ResizeObserver`监听尺寸变化，动态更新滚动区域的尺寸。

```vue
<script>
    export default {
        methods: {
            initResizeObserver() {
                this.resizeObserver = new ResizeObserver((entries) => {
                    for (const entry of entries) {
                        this.handleChange({
                            width: entry.borderBoxSize[0].inlineSize,
                            height: entry.borderBoxSize[0].blockSize
                        });
                    }
                });
                this.resizeObserver.observe(this.$el); // 监听组件根元素
            },
        }
    }
</script>
<style lang="scss" scoped>
    .scroll-container {
		...

        .v-scroll {
            transform-origin: left top;
            transform: translateY(var(--scroll-h)) rotate(-90deg);
			...

            .content {
                left: var(--scroll-h);
                transform-origin: left top;
                transform: rotate(90deg);
                ...
            }
        }
    }
</style>
```
