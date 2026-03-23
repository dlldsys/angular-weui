# Angular WeUI Storybook UI 修复计划

## 问题总览

经过全面检查，发现项目没有正确参照官方 WeUI 实现，主要问题：

| 问题类型 | 严重程度 | 影响组件 |
|---------|---------|---------|
| 缺少官方 WeUI CSS | 🔴 严重 | 全部 |
| 图标系统不兼容 | 🔴 严重 | Button, Cell, Toast, Tabbar |
| 类名命名不一致 | 🔴 严重 | Button, Cell, Dialog |
| CSS 变量缺失/不一致 | 🟠 中等 | 全部 |
| 样式实现细节偏离 | 🟠 中等 | 全部 |
| Storybook 配置问题 | 🟡 轻微 | 全部 |

---

## 修复任务详情

### Task 1: 安装官方 weui 包并配置基础样式

**问题**: 项目完全没有导入官方 WeUI 的 CSS 基础样式

**当前 `src/styles.scss`**:
```scss
/* You can add global styles to this file, and also import other style files */
```

**修复步骤**:
1. 安装 weui 包: `npm install weui`
2. 更新 `src/styles.scss` 导入官方样式
3. 更新 Storybook 配置导入全局样式

---

### Task 2: 修复 CSS 变量与官方保持一致

**问题**: 项目 CSS 变量与官方 WeUI 规范不一致

**当前 `projects/theme/_variables.scss`** 与官方差异:

| 变量 | 项目值 | 官方值 | 状态 |
|-----|-------|-------|------|
| `--weui-font-size-md` | `14px` | `17px` | ❌ |
| `--weui-font-size-lg` | `16px` | `17px` | ❌ |
| `--weui-border-radius-md` | `8px` | `0px` | ❌ |
| 间距系统 | 自定义 | 官方规范 | ❌ |

**修复步骤**:
1. 对照官方 `_variables.less` 重写 `_variables.scss`
2. 确保所有变量名和值与官方一致

---

### Task 3: 修复 Button 组件类名和样式

**问题**: 项目使用 `.weui-button-*` 而官方使用 `.weui-btn_*`

**当前类名**:
```scss
.weui-button { }
.weui-button--primary { }
.weui-button--default { }
.weui-button--disabled { }
```

**应该改为**:
```scss
.weui-btn { }
.weui-btn_primary { }
.weui-btn_default { }
.weui-btn_disabled { }
.weui-btn_loading { }
.weui-btn_plain-primary { }
.weui-btn_plain_default { }
```

**修复步骤**:
1. 更新 `button.component.ts` 中的组件类名
2. 更新 `button.component.scss` 中的样式类名
3. 修复尺寸样式: 官方使用 `.weui-btn_mini`, `.weui-btn_small`, `.weui-btn_large`
4. 修复 padding 和字体大小

---

### Task 4: 修复 Cell 组件样式

**问题**: 组件结构与官方不完全一致

**修复步骤**:
1. 检查官方 `weui_cell_global.scss` 结构
2. 确保 `.weui-cell__hd`, `.weui-cell__bd`, `.weui-cell__ft` 结构正确
3. 移除额外的 `__title`, `__desc` 嵌套层级
4. 修复 cell-access 的箭头样式

---

### Task 5: 修复 Dialog 组件样式

**问题**: 
- 颜色使用硬编码而非 CSS 变量
- 圆角值不正确

**当前**:
```scss
.weui-dialog__title {
  color: #333;  // 硬编码
}
```

**应该**:
```scss
.weui-dialog__title {
  color: #000000;
}
.weui-dialog__bd {
  color: var(--weui-text-color-gray);
}
```

**修复步骤**:
1. 移除硬编码颜色，改用官方颜色值
2. 修复圆角为 `0px` (官方规范)
3. 修复宽度限制 `max-width: 270px`

---

### Task 6: 修复 Toast 组件样式

**问题**: 
- 使用 Base64 SVG 而非官方图标
- 圆角不正确

**当前**:
```scss
.weui-toast {
  border-radius: 8px;  // 错误
}
```

**应该**:
```scss
.weui-toast {
  border-radius: 0;  // 官方是0
}
```

**修复步骤**:
1. 移除 Base64 图标，改用官方 `.weui-icon-success` 等类名
2. 修复圆角为 `0px`
3. 修复 `min-width: 88px`
4. 使用官方 `weui-toast` 相关类名

---

### Task 7: 修复 ActionSheet 组件样式

**问题**: 圆角和间距不符合官方规范

**修复步骤**:
1. 修复 `.weui-actionsheet__menu` 圆角为 `0px`
2. 修复 `.weui-actionsheet__cell` 高度为 `56px` (官方)
3. 修复字体大小为 `17px` (官方)
4. 使用官方 `.weui-actionsheet` 类名结构

---

### Task 8: 修复 Navbar 组件样式

**问题**: 高度和样式不符合官方规范

**当前**:
```scss
.weui-navbar {
  height: 44px;
}
```

**应该**:
```scss
.weui-navbar {
  height: 45px;  // 官方是 45px
}
```

**修复步骤**:
1. 修复高度为 `45px`
2. 修复字体大小为 `17px`
3. 确保背景色使用官方色值

---

### Task 9: 修复 Tabbar 组件样式

**问题**: 
- 使用占位图片而非官方图标
- 高度不正确

**当前**:
```typescript
icon: 'https://via.placeholder.com/24/...'  // 占位图
```

**应该**:
```html
<i class="weui-tabbar__icon">
  <svg><use xlink:href="#icon-home"></use></svg>
</i>
```

**修复步骤**:
1. 修复高度为 `50px` (官方)
2. 修复图标尺寸为 `24px` (官方)
3. 更新 Storybook 使用官方图标
4. 修复 `.weui-tabbar__text` 字体大小为 `12px`

---

### Task 10: 修复 Input/Form 组件样式

**问题**: 
- 圆角不符合官方
- 高度不符合官方

**当前**:
```scss
.weui-input {
  border-radius: 8px;  // 错误
  height: 44px;  // 错误
}
```

**应该**:
```scss
.weui-input {
  border-radius: 0;  // 官方是 0
  height: 45px;  // 官方是 45px
}
```

**修复步骤**:
1. 修复圆角为 `0px`
2. 修复高度为 `45px`
3. 修复字体大小为 `17px`
4. 使用官方 `.weui-label` 等类名

---

### Task 11: 修复 Icon 组件使用官方图标

**问题**: 使用自定义 SVG 路径而非官方图标类

**当前**:
```typescript
private iconPaths: Record<IconType, string> = {
  'success': 'M12 2C6.48 2...',  // 自定义 SVG
};
```

**应该**: 使用官方 `.weui-icon-*` CSS 类

**修复步骤**:
1. 移除自定义 SVG 路径
2. 组件输出应直接支持官方图标类名
3. 添加必要的图标尺寸和样式

---

### Task 12: 修复 Progress 组件样式

**问题**: 进度条高度和样式不符合官方

**当前**:
```scss
.weui-progress__track {
  height: 4px;  // 可能不正确
}
```

**修复步骤**:
1. 修复轨道高度为 `6px` (官方)
2. 修复圆角为 `3px` (官方)
3. 使用官方 `.weui-progress` 类名

---

### Task 13: 修复 Article 组件样式

**问题**: 样式与官方文章页规范不一致

**修复步骤**:
1. 确保使用官方 `.weui-article` 结构
2. 修复标题层级样式
3. 使用官方间距规范

---

### Task 14: 配置 Storybook 全局样式和装饰器

**问题**: 
- 装饰器可能覆盖原生样式
- 缺少全局样式导入

**当前 `preview.ts`**:
```typescript
decorators: [
  (story) => ({
    component: story,
    props: {},
  }),
],
```

**修复步骤**:
1. 创建 `src/stories/globals.scss` 导入官方样式
2. 更新 `.storybook/preview.ts` 导入全局样式
3. 简化装饰器配置
4. 添加必要的 weui-icon 基础样式

---

### Task 15: 验证所有组件 Storybook 预览

**修复步骤**:
1. 启动 Storybook: `npm run storybook`
2. 逐个检查组件预览效果
3. 与官方 WeUI Demo 对比
4. 修复发现的不一致问题

---

## 官方 WeUI 参考资源

- GitHub: https://github.com/weui/weui
- 官方 Demo: https://weui.io
- NPM: https://www.npmjs.com/package/weui

## 关键官方样式文件

```
weui/src/style/widget/weui_button/weui_button.scss
weui/src/style/widget/weui_cell/weui_cell_global.scss
weui/src/style/widget/weui_dialog/weui_dialog.scss
weui/src/style/widget/weui_toast/weui_toast.scss
weui/src/style/widget/weui_actionsheet/weui_actionsheet.scss
weui/src/style/widget/weui_navbar/weui_navbar.scss
weui/src/style/widget/weui_tabbar/weui_tabbar.scss
weui/src/style/widget/weui_form/weui_form.scss
weui/src/style/widget/weui_icon/weui_icon_font.scss
weui/src/style/widget/weui_progress/weui_progress.scss
weui/src/style/widget/weui_article/weui_article.scss
```

---

## 实施顺序

1. **Task 1** - 安装依赖和配置基础样式 (P0)
2. **Task 2** - 修复 CSS 变量 (P0)
3. **Task 14** - 配置 Storybook 全局样式 (P0)
4. **Task 3** - 修复 Button 组件 (P0)
5. **Task 4** - 修复 Cell 组件 (P1)
6. **Task 5** - 修复 Dialog 组件 (P1)
7. **Task 6** - 修复 Toast 组件 (P1)
8. **Task 7** - 修复 ActionSheet 组件 (P1)
9. **Task 8** - 修复 Navbar 组件 (P1)
10. **Task 9** - 修复 Tabbar 组件 (P1)
11. **Task 10** - 修复 Input/Form 组件 (P1)
12. **Task 11** - 修复 Icon 组件 (P1)
13. **Task 12** - 修复 Progress 组件 (P2)
14. **Task 13** - 修复 Article 组件 (P2)
15. **Task 15** - 验证所有组件 (P0)

---

## 验证标准

修复完成后，每个组件应满足：
- [ ] 类名与官方 WeUI 规范一致
- [ ] CSS 变量值与官方一致
- [ ] 样式细节（圆角、高度、间距）与官方一致
- [ ] Storybook 预览效果与官方 Demo 一致
- [ ] 图标使用官方 weui-icon 类
