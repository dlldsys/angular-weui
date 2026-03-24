# Angular WeUI Components - 生产构建指南

## 构建配置概述

本项目使用 Angular CLI 构建系统，支持多种构建目标：

1. **库构建** (`npm run build:lib`)
   - 生成生产级别的库文件
   - 支持 tree-shaking
   - 输出 ESM + UMD 格式

2. **应用构建** (`npm run build`)
   - 用于本地开发和演示

3. **Storybook 构建** (`npm run build-storybook`)
   - 生成交互式文档

## 体积优化策略

### 1. 按需引入

推荐使用按需引入来减小打包体积：

```typescript
// ❌ 不推荐：导入整个库
import { WeUIModule } from 'angular-weui-components';

// ✅ 推荐：只导入需要的组件
import { WeUIButtonComponent } from 'angular-weui-components/button';
import { WeUIToastService } from 'angular-weui-components/toast';
```

### 2. Tree-shaking 支持

项目配置了 `sideEffects: false`，确保打包工具可以安全地移除未使用的代码：

```json
{
  "sideEffects": false
}
```

### 3. 模块导出优化

每个组件都有独立的入口点：

```json
{
  "exports": {
    ".": {
      "types": "./angular-weui-components.d.ts",
      "esm2022": "./esm2022/angular-weui-components.mjs",
      "default": "./bundles/angular-weui-components.umd.js"
    },
    "./button": {
      "types": "./button/button.d.ts",
      "esm2022": "./button/angular-weui-button.mjs",
      "default": "./button/angular-weui-button.umd.js"
    }
  }
}
```

## 预期构建输出

### 完整库输出

```
dist/angular-weui/
├── angular-weui-components.d.ts  (类型定义)
├── angular-weui-components.umd.js (UMD 格式)
├── esm2022/                      (ES Module 2022)
│   ├── angular-weui-components.mjs
│   ├── button/
│   ├── toast/
│   └── ...
├── fesm2022/                      (扁平化 ES Module 2022)
│   └── angular-weui-components.mjs
└── bundles/                       (UMD 包)
    └── angular-weui-components.umd.js
```

### 单组件输出

```
dist/angular-weui/button/
├── angular-weui-button.d.ts
├── angular-weui-button.mjs
└── angular-weui-button.umd.js
```

## 性能目标

| 指标 | 目标值 | 说明 |
|-----|-------|------|
| 完整库体积 | < 200KB | 压缩后大小 |
| 单组件平均体积 | < 10KB | 每个组件的平均大小 |
| 首次加载时间 | < 500ms | 3G 网络环境下 |
| Tree-shaking 效率 | > 70% | 未使用代码的移除比例 |

## 构建命令

```bash
# 构建库
npm run build:lib

# 构建并发布
npm run publish:npm

# 构建 Storybook 文档
npm run build-storybook
```

## 验证清单

在发布前，请确保：

- [ ] 所有组件都可以正常导入
- [ ] 单元测试全部通过
- [ ] Storybook 可以正常启动
- [ ] 类型定义文件正确生成
- [ ] ESM 和 UMD 格式都正确输出
- [ ] README 文档与最新代码同步
- [ ] package.json 信息完整正确

## 常见问题

### 1. 构建失败

如果构建失败，请检查：

- Node.js 版本是否满足要求（>= 18.10.0）
- npm 依赖是否完整安装
- TypeScript 配置是否正确

### 2. Tree-shaking 不生效

确保：

- 导入路径正确（使用完整路径，如 `angular-weui-components/button`）
- `sideEffects` 设置为 `false`
- 使用支持 tree-shaking 的打包工具（如 webpack 5、rollup）

### 3. 类型定义错误

确保：

- `.d.ts` 文件正确生成
- 所有组件和模块都正确导出
- 类型定义与源代码同步更新

## 发布流程

1. 更新版本号（package.json）
2. 运行单元测试
3. 构建库
4. 验证构建输出
5. 发布到 npm
6. 更新 GitHub 仓库

```bash
# 完整发布流程
npm version patch  # 或 minor、major
npm run test
npm run build:lib
npm run publish:npm
git push && git push --tags
```
