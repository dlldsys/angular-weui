# Angular WeUI

基于WeUI设计规范的Angular UI组件库，提供与微信原生视觉体验一致的用户界面组件。

## 🚀 特性

- ✅ 与WeUI设计规范完全一致
- ✅ 支持Angular 17+ (standalone components)
- ✅ TypeScript支持
- ✅ 主题定制 (支持暗黑模式)
- ✅ 响应式设计
- ✅ 无障碍访问支持
- ✅ Tree-shaking友好

## 📦 安装

```bash
npm install angular-weui
```

## 🎯 快速开始

```typescript
import { Component } from '@angular/core';
import { WeUIButtonComponent, WeUICellComponent } from 'angular-weui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [WeUIButtonComponent, WeUICellComponent],
  template: `
    <div class="demo">
      <weui-button buttonType="primary">主要按钮</weui-button>
      <weui-cell title="标题" description="描述">内容</weui-cell>
    </div>
  `
})
export class ExampleComponent {}
```

## 🎨 组件

### Button 按钮

```html
<weui-button buttonType="primary">主要按钮</weui-button>
<weui-button buttonType="default">默认按钮</weui-button>
<weui-button buttonType="warn">警告按钮</weui-button>

<!-- 不同尺寸 -->
<weui-button buttonType="primary" size="small">小按钮</weui-button>
<weui-button buttonType="primary" size="large">大按钮</weui-button>

<!-- 不同样式 -->
<weui-button buttonType="primary" [plain]="true">朴素按钮</weui-button>
<weui-button buttonType="primary" [round]="true">圆角按钮</weui-button>
<weui-button buttonType="primary" [block]="true">块级按钮</weui-button>

<!-- 状态 -->
<weui-button buttonType="primary" [loading]="true">加载中</weui-button>
<weui-button buttonType="default" [disabled]="true">禁用按钮</weui-button>
```

### Cell 单元格

```html
<weui-cell title="标题文字" description="描述文字" value="值"></weui-cell>
<weui-cell title="带图标的单元格" icon="weui-icon-home" value="图标"></weui-cell>
<weui-cell title="可点击的单元格" [clickable]="true" (click)="handleClick()"></weui-cell>
<weui-cell title="链接样式" [isLink]="true" value="跳转"></weui-cell>
<weui-cell title="禁用状态" [disabled]="true" value="不可点击"></weui-cell>
```

### Icon 图标

```html
<!-- 基础图标 -->
<weui-icon type="success"></weui-icon>
<weui-icon type="warning"></weui-icon>
<weui-icon type="error"></weui-icon>

<!-- 不同尺寸 -->
<weui-icon type="home" size="small"></weui-icon>
<weui-icon type="home" size="normal"></weui-icon>
<weui-icon type="home" size="large"></weui-icon>

<!-- 自定义颜色和旋转 -->
<weui-icon type="loading" spin="true"></weui-icon>
<weui-icon type="heart" color="#ff1744"></weui-icon>

<!-- 自定义图标 -->
<weui-icon size="large">⭐</weui-icon>
```

### Progress 进度条

```html
<!-- 基础进度条 -->
<weui-progress [value]="60" [max]="100"></weui-progress>

<!-- 不同尺寸 -->
<weui-progress [value]="75" size="small"></weui-progress>
<weui-progress [value]="75" size="normal"></weui-progress>
<weui-progress [value]="75" size="large"></weui-progress>

<!-- 不同状态 -->
<weui-progress [value]="100" status="success"></weui-progress>
<weui-progress [value]="30" status="error"></weui-progress>

<!-- 文字内置 -->
<weui-progress [value]="85" textInside="true"></weui-progress>

<!-- 不确定进度 -->
<weui-progress indeterminate="true"></weui-progress>

<!-- 自定义颜色 -->
<weui-progress [value]="70" color="#ff6b6b" trackColor="#ffe0e0"></weui-progress>
```

### Article 文章

```html
<!-- 基础文章 -->
<weui-article title="文章标题" author="作者" time="2024-01-01">
  <p>这是文章的第一段内容。</p>
  <h2>二级标题</h2>
  <p>这是二级标题下的内容段落。</p>
  <blockquote>这是一个引用块。</blockquote>
</weui-article>

<!-- 自定义模板 -->
<weui-article>
  <ng-template #header>
    <div>自定义标题区域</div>
  </ng-template>
  <ng-template #content>
    <div>自定义内容区域</div>
  </ng-template>
</weui-article>
```

## 🎭 主题

### 使用主题

```typescript
import { WeUIThemeService } from 'angular-weui';

@Component({...})
export class ExampleComponent {
  constructor(private themeService: WeUIThemeService) {}

  setDefaultTheme() {
    this.themeService.setTheme('default');
  }

  setDarkTheme() {
    this.themeService.setTheme('dark');
  }
}
```

### 自定义主题

```scss
:root {
  --weui-primary-color: #07C160;
  --weui-bg-color: #FFFFFF;
  --weui-text-color: #000000;
  // ... 更多变量
}

[data-weui-theme="dark"] {
  --weui-bg-color: #1F1F1F;
  --weui-text-color: #FFFFFF;
  // ... 更多变量
}
```

## 🏗️ 项目结构

```
angular-weui/
├── projects/
│   ├── core/                 # 核心模块
│   │   ├── src/
│   │   │   ├── services/    # 主题服务、配置服务等
│   │   │   └── utils/       # 工具类
│   ├── components/           # UI组件
│   │   ├── button/          # 按钮组件
│   │   ├── cell/            # 列表项组件
│   │   └── ...              # 更多组件
│   ├── theme/               # 主题系统
│   │   ├── _variables.scss   # CSS变量
│   │   ├── _mixins.scss     # Mixins
│   │   └── index.scss      # 主题入口
│   └── docs/                # 文档站点
├── src/                      # 演示应用
└── package.json
```

## 🛠️ 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建库
npm run build

# 运行测试
npm test
```

## 📝 开发计划

- [x] 分析WeUI组件结构和设计规范
- [x] 制定Angular UI库架构计划
- [x] 设计组件目录结构和模块划分
- [x] 创建基础样式系统和主题支持
- [x] 实现核心组件(Button, Cell等)
- [x] 修复导入路径和编译错误
- [x] 实现反馈组件(Dialog, Toast, Actionsheet等)
- [x] 实现基础组件(Icon, Progress, Article等)
- [ ] 实现导航和布局组件
- [ ] 创建文档站点和示例
- [ ] 添加单元测试和集成测试
- [ ] 优化打包和发布配置

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request来帮助改进这个项目。

## 📞 支持

如果你在使用过程中遇到问题，请提交Issue。
