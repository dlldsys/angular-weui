# Angular WeUI 组件库

基于WeUI设计规范的Angular UI组件库，提供与微信原生视觉体验一致的UI组件。

## 📦 安装

```bash
npm install angular-weui
```

## 🚀 快速开始

### 导入模块

```typescript
import { NgModule } from '@angular/core';
import { 
  WeUIButtonModule,
  WeUICellModule,
  WeUIDialogModule,
  WeUIToastModule,
  WeUIActionSheetModule,
  WeUIFormModule,
  WeUINavbarModule,
  WeUITabbarModule,
  WeUIIconModule,
  WeUIProgressModule,
  WeUIArticleModule
} from 'angular-weui';

@NgModule({
  imports: [
    WeUIButtonModule,
    WeUICellModule,
    WeUIDialogModule,
    WeUIToastModule,
    WeUIActionSheetModule,
    WeUIFormModule,
    WeUINavbarModule,
    WeUITabbarModule,
    WeUIIconModule,
    WeUIProgressModule,
    WeUIArticleModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 使用组件

```html
<!-- 按钮 -->
<weui-button buttonType="primary" (click)="handleClick()">主要按钮</weui-button>

<!-- 对话框 -->
<weui-dialog 
  [visible]="dialogVisible" 
  title="提示" 
  content="这是一个对话框"
  (confirm)="handleConfirm()"
  (cancel)="handleCancel()">
</weui-dialog>

<!-- 输入框 -->
<weui-input 
  [(ngModel)]="inputValue"
  label="用户名"
  placeholder="请输入用户名"
  (input)="handleInput($event)">
</weui-input>

<!-- 图标 -->
<weui-icon type="success" size="large"></weui-icon>

<!-- 进度条 -->
<weui-progress [value]="75" status="success"></weui-progress>

<!-- 导航栏 -->
<weui-navbar title="页面标题" [showBack]="true"></weui-navbar>

<!-- 标签栏 -->
<weui-tabbar [items]="tabItems" [(activeIndex)]="activeTab"></weui-tabbar>

<!-- 文章 -->
<weui-article title="文章标题" author="作者">
  <p>文章内容...</p>
</weui-article>
```

## 📚 组件文档

### Button 按钮

基础按钮组件，支持多种类型和状态。

#### 基础用法

```html
<weui-button>默认按钮</weui-button>
<weui-button buttonType="primary">主要按钮</weui-button>
<weui-button buttonType="warn">警告按钮</weui-button>
```

#### 不同尺寸

```html
<weui-button size="small">小按钮</weui-button>
<weui-button size="normal">普通按钮</weui-button>
<weui-button size="large">大按钮</weui-button>
```

#### 特殊状态

```html
<weui-button disabled>禁用按钮</weui-button>
<weui-button loading>加载中</weui-button>
<weui-button block>块级按钮</weui-button>
```

### Dialog 对话框

模态对话框组件，支持多种类型和自定义内容。

#### 基础用法

```html
<weui-dialog 
  [visible]="dialogVisible"
  title="确认"
  content="您确定要执行此操作吗？"
  (confirm)="handleConfirm()"
  (cancel)="handleCancel()">
</weui-dialog>
```

#### 自定义内容

```html
<weui-dialog [visible]="dialogVisible">
  <ng-template #title>
    <div>自定义标题</div>
  </ng-template>
  <ng-template #content>
    <div>自定义内容区域</div>
  </ng-template>
</weui-dialog>
```

### Toast 提示

轻提示组件，用于显示简短的信息反馈。

#### 服务方式使用

```typescript
import { WeUIToastService } from 'angular-weui';

constructor(private toast: WeUIToastService) {}

showToast() {
  this.toast.success('操作成功');
  this.toast.error('操作失败');
  this.toast.loading('加载中...');
}
```

#### 组件方式使用

```html
<weui-toast 
  [visible]="toastVisible"
  message="提示信息"
  type="success">
</weui-toast>
```

### ActionSheet 操作列表

从底部弹出的操作菜单，支持多个操作项。

#### 服务方式使用

```typescript
import { WeUIActionSheetService } from 'angular-weui';

constructor(private actionSheet: WeUIActionSheetService) {}

showActionSheet() {
  this.actionSheet.show({
    title: '选择操作',
    actions: [
      { name: '选项1', value: 'option1' },
      { name: '选项2', value: 'option2', type: 'warn' }
    ]
  }).then(result => {
    if (result) {
      console.log('选择了:', result.item);
    }
  });
}
```

### Form 表单

表单组件集合，包含输入框等表单元素。

#### Input 输入框

```html
<weui-input 
  [(ngModel)]="username"
  label="用户名"
  placeholder="请输入用户名"
  clearable>
</weui-input>

<weui-input 
  type="password"
  [(ngModel)]="password"
  label="密码"
  placeholder="请输入密码">
</weui-input>
```

### Navbar 导航栏

页面顶部导航栏组件。

```html
<weui-navbar 
  title="页面标题"
  [showBack]="true"
  (back)="goBack()">
</weui-navbar>
```

### Tabbar 标签栏

页面底部标签栏组件。

```html
<weui-tabbar 
  [items]="tabbarItems"
  [(activeIndex)]="activeTab"
  (change)="handleTabChange($event)">
</weui-tabbar>
```

```typescript
// 在组件中定义标签项
tabbarItems = [
  { id: 'home', text: '首页', icon: 'icon-home' },
  { id: 'messages', text: '消息', icon: 'icon-messages', badge: 5 },
  { id: 'profile', text: '我的', icon: 'icon-profile' }
];
```

### Navbar 导航栏

页面顶部导航栏组件。

```html
<weui-navbar 
  title="页面标题"
  [showBack]="true"
  (back)="goBack()">
</weui-navbar>
```

```html
<!-- 自定义内容 -->
<weui-navbar title="自定义导航">
  <ng-template #left>
    <button (click)="handleMenu()">菜单</button>
  </ng-template>
  
  <ng-template #right>
    <button (click)="handleShare()">分享</button>
  </ng-template>
</weui-navbar>
```

## 🎨 主题定制

### CSS变量

组件库使用CSS变量进行主题定制，可以通过修改变量来自定义样式：

```css
:root {
  --weui-primary-color: #07c160;
  --weui-success-color: #07c160;
  --weui-warning-color: #ff9500;
  --weui-error-color: #fa5151;
  --weui-text-color: #333;
  --weui-bg-color: #fff;
}
```

### 暗黑模式

组件库支持暗黑模式，会自动检测系统主题设置：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --weui-text-color: #fff;
    --weui-bg-color: #1f1f1f;
  }
}
```

## 🔧 开发

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 启动Storybook
npm run storybook

# 构建项目
npm run build

# 运行测试
npm test
```

### 项目结构

```
projects/
├── core/                 # 核心模块
├── components/           # UI组件
│   ├── button/          # 按钮组件
│   ├── cell/            # 列表项组件
│   ├── dialog/          # 对话框组件
│   ├── toast/           # 提示组件
│   ├── actionsheet/     # 操作列表
│   ├── form/            # 表单组件
│   ├── navbar/          # 导航栏
│   ├── tabbar/          # 标签栏
│   ├── icon/            # 图标组件
│   ├── progress/        # 进度条组件
│   └── article/         # 文章组件
├── theme/               # 主题系统
└── docs/                # 文档站点
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request来帮助改进这个项目。

## 📞 支持

如果您在使用过程中遇到问题，可以通过以下方式获取帮助：

- 提交Issue到GitHub仓库
- 查看文档站点
- 联系维护者
