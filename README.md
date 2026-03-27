# Angular WeUI Components

[![npm version](https://badge.fury.io/js/angular-weui-components.svg)](https://badge.fury.io/js/angular-weui-components)
[![npm downloads](https://img.shields.io/npm/dm/angular-weui-components.svg)](https://www.npmjs.com/package/angular-weui-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Angular WeUI Components 是基于微信官方 WeUI 设计语言开发的 Angular 组件库，为移动端 Web 应用提供一致的微信风格用户体验。

🚀 **在线演示**: https://dlldsys.github.io/angular-weui/

## 特性

- 🎨 **基于 WeUI 设计规范** - 完美还原微信视觉风格
- 📱 **移动端优化** - 专为移动设备设计的交互体验
- 🅰️ **Angular 15-21 支持** - 使用最新 Angular 技术
- 📦 **TypeScript 支持** - 完整的类型定义
- 🎯 **组件化开发** - 模块化设计，支持按需引入
- 🌳 **Tree-shaking 优化** - 自动移除未使用的代码
- ⚡ **OnPush 变更检测** - 高性能组件渲染
- ✅ **完整的单元测试** - 确保组件稳定性
- 🚀 **在线演示** - https://dlldsys.github.io/angular-weui/

## 支持的 Angular 版本

| Angular 版本 | 支持状态 |
|------------|--------|
| Angular 15  | ✅  支持  |
| Angular 16  | ✅  支持  |
| Angular 17  | ✅  支持  |
| Angular 18  | ✅  支持  |
| Angular 19  | ✅  支持  |
| Angular 20  | ✅  支持  |
| Angular 21  | ✅  支持  |

## 安装

```bash
# 使用 npm 安装稳定版
npm install angular-weui-components

# 使用 npm 安装 alpha 预览版
npm install angular-weui-components@alpha

# 使用 yarn
yarn add angular-weui-components

# 使用 pnpm
pnpm add angular-weui-components
```

## 快速开始

### 方式一：按需引入（推荐）

```typescript
import { Component } from '@angular/core';
import { WeUIButtonComponent, WeUIButtonModule } from 'angular-weui-components/button';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [WeUIButtonComponent]
})
export class ExampleComponent {}
```

### 方式二：模块化导入

```typescript
import { NgModule } from '@angular/core';
import { WeUIButtonModule } from 'angular-weui-components/button';
import { WeUIToastModule } from 'angular-weui-components/toast';

@NgModule({
  imports: [
    WeUIButtonModule,
    WeUIToastModule
  ]
})
export class AppModule { }
```

### 方式三：完整导入

```typescript
import { NgModule } from '@angular/core';
import { WeUIModule } from 'angular-weui-components';

@NgModule({
  imports: [
    WeUIModule.forRoot()
  ]
})
export class AppModule { }
```

## 组件列表

### 表单组件

| 组件 | 说明 | 按需引入路径 |
|-----|------|------------|
| Button | 按钮组件 | `angular-weui-components/button` |
| Cell | 单元格组件 | `angular-weui-components/cell` |
| Picker | 选择器组件 | `angular-weui-components/picker` |

### 导航组件

| 组件 | 说明 | 按需引入路径 |
|-----|------|------------|
| Navbar | 导航栏组件 | `angular-weui-components/navbar` |
| Tabbar | 标签栏组件 | `angular-weui-components/tabbar` |

### 反馈组件

| 组件 | 说明 | 按需引入路径 |
|-----|------|------------|
| Toast | 轻提示组件 | `angular-weui-components/toast` |
| Dialog | 对话框组件 | `angular-weui-components/dialog` |
| Progress | 进度条组件 | `angular-weui-components/progress` |
| Actionsheet | 操作菜单组件 | `angular-weui-components/actionsheet` |
| Gallery | 图片查看器组件 | `angular-weui-components/gallery` |

### 布局组件

| 组件 | 说明 | 按需引入路径 |
|-----|------|------------|
| List | 列表容器组件 | `angular-weui-components/list` |
| Panel | 面板容器组件 | `angular-weui-components/panel` |
| Article | 文章组件 | `angular-weui-components/article` |
| Flex | 弹性布局组件 | `angular-weui-components/flex` |
| Grid | 网格布局组件 | `angular-weui-components/grid` |
| Footer | 底部组件 | `angular-weui-components/footer` |

### 展示组件

| 组件 | 说明 | 按需引入路径 |
|-----|------|------------|
| Preview | 预览组件 | `angular-weui-components/preview` |
| Icon | 图标组件 | `angular-weui-components/icon` |
| Loadmore | 加载更多组件 | `angular-weui-components/loadmore` |
| Steps | 步骤条组件 | `angular-weui-components/steps` |
| Badge | 徽章组件 | `angular-weui-components/badge` |

## 使用示例

### Button 按钮组件

```typescript
import { Component } from '@angular/core';
import { WeUIButtonComponent } from 'angular-weui-components/button';

@Component({
  selector: 'app-example',
  template: `
    <weui-button buttonType="primary" (click)="onClick()">主要按钮</weui-button>
    <weui-button buttonType="default">默认按钮</weui-button>
    <weui-button buttonType="warn">警告按钮</weui-button>
    <weui-button [loading]="true">加载中</weui-button>
    <weui-button [disabled]="true">禁用</weui-button>
  `,
  imports: [WeUIButtonComponent]
})
export class ExampleComponent {
  onClick() {
    console.log('按钮点击');
  }
}
```

### Toast 轻提示组件

```typescript
import { Component } from '@angular/core';
import { WeUIToastService } from 'angular-weui-components/toast';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="showSuccess()">成功提示</button>
    <button (click)="showLoading()">加载提示</button>
  `
})
export class ExampleComponent {
  constructor(private toast: WeUIToastService) {}

  showSuccess() {
    this.toast.success('操作成功！');
  }

  showLoading() {
    this.toast.loading('加载中...');
    // 模拟异步操作
    setTimeout(() => {
      this.toast.hide();
    }, 2000);
  }
}
```

### Dialog 对话框组件

```typescript
import { Component } from '@angular/core';
import { WeUIDialogComponent } from 'angular-weui-components/dialog';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="showAlert()">显示警告对话框</button>
    <button (click)="showConfirm()">显示确认对话框</button>
    
    <weui-dialog #dialog></weui-dialog>
  `
})
export class ExampleComponent {
  constructor(private dialog: WeUIDialogComponent) {}

  showAlert() {
    this.dialog.show({
      title: '提示',
      content: '这是一个警告对话框',
      confirmText: '确定'
    });
  }

  showConfirm() {
    this.dialog.show({
      title: '确认',
      content: '确定要执行此操作吗？',
      confirmText: '确定',
      cancelText: '取消'
    }).then(() => {
      console.log('用户点击了确定');
    }).catch(() => {
      console.log('用户点击了取消');
    });
  }
}
```

### Picker 选择器组件

```typescript
import { Component } from '@angular/core';
import { WeUIPickerComponent, WeUIPickerColumn } from 'angular-weui-components/picker';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="showPicker()">显示选择器</button>
    
    <weui-picker
      #picker
      [columns]="columns"
      title="请选择"
      (confirm)="onConfirm($event)"
      (cancel)="onCancel()">
    </weui-picker>
  `
})
export class ExampleComponent {
  columns: WeUIPickerColumn[][] = [
    [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ]
  ];

  constructor(private picker: WeUIPickerComponent) {}

  showPicker() {
    this.picker.show();
  }

  onConfirm(result: any) {
    console.log('选择的值:', result.values);
  }

  onCancel() {
    console.log('用户取消了选择');
  }
}
```

## API 文档

### Button 组件

#### Inputs

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|------|
| buttonType | `'primary' \| 'default' \| 'warn'` | `'default'` | 按钮类型 |
| size | `'small' \| 'normal' \| 'large'` | `'normal'` | 按钮大小 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否显示加载状态 |
| block | `boolean` | `false` | 是否块级显示 |
| plain | `boolean` | `false` | 是否扁平样式 |
| round | `boolean` | `false` | 是否圆角 |
| circle | `boolean` | `false` | 是否圆形 |

#### Outputs

| 事件 | 说明 |
|-----|------|
| click | 点击事件 |

### Toast 服务

#### 方法

| 方法 | 说明 |
|-----|------|
| show(options) | 显示提示 |
| success(message) | 显示成功提示 |
| warning(message) | 显示警告提示 |
| error(message) | 显示错误提示 |
| info(message) | 显示信息提示 |
| loading(message) | 显示加载提示 |
| hide() | 隐藏提示 |

## 注意事项

1. **Tree-shaking 支持**: 推荐使用按需引入，可以显著减小打包体积
2. **OnPush 变更检测**: 所有组件都支持 OnPush 变更检测模式
3. **移动端优先**: 组件针对移动端进行了优化，支持触摸交互
4. **微信浏览器兼容**: 组件样式与微信内置浏览器保持一致
5. **TypeScript 支持**: 所有组件都提供完整的类型定义

## 📄 文档

- **🚀 在线演示**: https://dlldsys.github.io/angular-weui/
- **📖 Storybook**: 查看组件示例和交互演示
- **📚 API文档**: 详细的组件API说明

## 开发

```bash
# 克隆仓库
git clone https://github.com/dlldsys/angular-weui.git
cd angular-weui

# 安装依赖
npm install

# 启动开发服务器
npm start

# 运行测试
npm test

# 构建库
npm run build:lib

# 发布到 npm
npm run publish:npm
```

## 许可证

### v0.1.0-alpha.3 (2026-03-27)
- 🚀 添加GitHub Pages在线演示地址
- 📝 完善README文档和npm包信息
- 🔧 修复组件编译错误和类型问题
- 📦 更新版本并同步发布

### v0.1.0-alpha.2 (2026-03-24)

- 统一组件命名规范
- 优化组件支持 OnPush 变更检测
- 修复潜在内存泄漏问题
- 文档完善
  - 提供多种导入方式说明
  - 添加详细的使用示例
  - 补充完整的 API 文档

### v0.1.0-alpha.1 (2026-03-23)

- 初始版本发布
- 实现基础组件库架构
- 添加 Storybook 文档
- 支持 GitHub Pages 部署
