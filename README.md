# Angular WeUI Components

Angular WeUI Components 是基于微信官方 WeUI 设计语言开发的 Angular 组件库，为移动端 Web 应用提供一致的微信风格用户体验。

## ⚠️ 开发状态警告

**当前版本：0.1.0-alpha.1**

> **重要提醒：此库仍在开发中，请谨慎使用！**
> 
> - API 可能会发生变化
> - 部分功能可能不稳定
> - 建议仅用于测试和评估
> - 生产环境使用请等待正式版发布

## 📦 安装

```bash
# 安装 alpha 预览版
npm install angular-weui-components@alpha

# 或使用 yarn
yarn add angular-weui-components@alpha

# 或使用 pnpm
pnpm add angular-weui-components@alpha
```

## 🚀 快速开始

```typescript
import { ComponentModule } from 'angular-weui-components';

@NgModule({
  imports: [
    ComponentModule
  ]
})
export class AppModule { }
```

## ✨ 特性

- 🎨 **基于 WeUI 设计规范** - 完美还原微信视觉风格
- 📱 **移动端优化** - 专为移动设备设计的交互体验
- 🅰️ **Angular 21+ 支持** - 使用最新 Angular 技术
- 📦 **TypeScript 支持** - 完整的类型定义
- 🎯 **组件化开发** - 模块化设计，按需引入
- 📖 **完整文档** - 详细的API文档和使用示例
- 🚀 **零配置** - 开箱即用，简单易用

## 📚 组件列表

### 基础组件
- **Button** (按钮) - 各种样式的按钮组件
- **Cell** (单元格) - 列表项单元格组件
- **Icon** (图标) - WeUI风格图标组件

### 导航组件
- **Navbar** (导航栏) - 顶部导航栏
- **Tabbar** (标签栏) - 底部标签栏

### 反馈组件
- **Toast** (提示) - 轻提示组件
- **Dialog** (对话框) - 模态对话框
- **Progress** (进度条) - 进度显示组件

### 表单组件
- **Picker** (选择器) - 选择器组件
- **Actionsheet** (操作列表) - 上拉操作菜单

### 展示组件
- **List** (列表) - 列表容器
- **Panel** (面板) - 面板容器
- **Preview** (预览) - 文件预览组件

### 其他组件
- **Steps** (步骤条) - 步骤指示器
- **LoadMore** (加载更多) - 加载更多组件

## 📖 使用示例

### 按钮组件
```typescript
import { Component } from '@angular/core';
import { ButtonComponent } from 'angular-weui-components';

@Component({
  selector: 'app-example',
  template: `
    <weui-button type="primary">主要按钮</weui-button>
    <weui-button type="default">默认按钮</weui-button>
    <weui-button type="warn">警告按钮</weui-button>
  `
})
export class ExampleComponent {}
```

### 提示组件
```typescript
import { Component } from '@angular/core';
import { ToastService } from 'angular-weui-components';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="showToast()">显示提示</button>
  `
})
export class ExampleComponent {
  constructor(private toast: ToastService) {}
  
  showToast() {
    this.toast.show('操作成功！');
  }
}
```

## 🔧 开发

```bash
# 克隆仓库
git clone https://github.com/dlldsys/angular-weui.git
cd angular-weui

# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建
npm run build

# 运行测试
npm test

# 启动 Storybook
npm run storybook
```

## 📄 文档

- **在线文档**: https://dlldsys.github.io/angular-weui/
- **Storybook**: 查看组件示例和交互演示
- **API文档**: 详细的组件API说明

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📦 npm 包信息

- **包名**: `angular-weui-components`
- **版本**: `0.1.0-alpha.1`
- **标签**: `alpha`
- **安装**: `npm install angular-weui-components@alpha`
- **npm页面**: https://www.npmjs.com/package/angular-weui-components

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 📋 更新日志

### v0.1.0-alpha.1 (2026-03-23)
- 🎉 初始版本发布
- ✨ 实现基础组件库架构
- 📚 添加 Storybook 文档
- 🚀 支持 GitHub Pages 部署
- 📦 发布到 npm (alpha 标签)
- ⚠️ 添加开发状态警告

---

**⚠️ 重要提醒**: 这是一个 alpha 预览版本，API 可能会发生变化。请关注更新日志获取最新信息。
