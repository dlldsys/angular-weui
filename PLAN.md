# WeUI Angular 组件库任务计划

## 一、已完成的 P1 组件

| 组件 | 状态 | 说明 |
|------|------|------|
| Progress | ✅ 已完成 | 进度条组件 |
| Loading | ✅ 已完成 | 图标位置稳定性 |
| Badge | ✅ 已完成 | 徽章组件 |
| Flex | ✅ 已完成 | 弹性布局 |
| Footer | ✅ 已完成 | 页面底部 |
| Grid | ✅ 已完成 | 九宫格 |
| Panel | ✅ 已完成 | 面板组件 |
| Gallery | ✅ 已完成 | 图片预览 |
| Preview | ✅ 已完成 | 预览组件 |

## 二、已完成的 P2 组件（参考 WeUI 设计）

| 组件 | 状态 | 说明 |
|------|------|------|
| **List** | ✅ 已完成 | 列表组件（基础列表、链接列表、图文列表） |
| **Steps** | ✅ 已完成 | 步骤条（横向/纵向） |
| **Loadmore** | ✅ 已完成 | 加载更多 |

## 三、待完成的 P2 功能组件 （UI参考 WeUI 设计）

| 组件名 | 说明 | 优先级 |
|--------|------|--------|
| Slider | 滑块 | P2 |
| Uploader | 上传组件 | P2 |
| Picker | 选择器 | P2 |
| Half-screen-dialog | 半屏弹窗 | P2 |
| Msg | 消息提示页 | P2 |
| Information Bar | 信息条 | P3 |

## 四、组件设计规范（参考 WeUI）

### 4.1 List 组件
```
weui-list          # 列表容器
  weui-list__group # 分组
  weui-list__group-title  # 分组标题
  weui-list__item  # 列表项
    weui-list__item__hd   # 头部（图标/缩略图）
    weui-list__item__bd   # 主体（标签）
    weui-list__item__ft   # 尾部（值/箭头）
```

### 4.2 Steps 组件
```
weui-steps         # 步骤容器
  weui-step        # 单个步骤
    weui-step__icon    # 步骤图标/数字
    weui-step__title   # 步骤标题
    weui-step__desc    # 步骤描述
```

### 4.3 Loadmore 组件
```
weui-loadmore      # 加载更多
  weui-loadmore__loading  # 加载中图标
  weui-loadmore__tips     # 提示文字
```

## 五、已完成的工作

### List 组件
- `list.component.ts` - 容器组件 + 列表项组件
- `list.component.scss` - WeUI 样式规范
- `list.stories.ts` - 6 个故事示例
- `index.ts` - 导出

### Steps 组件
- `steps.component.ts` - 步骤容器 + 单个步骤组件
- `steps.component.scss` - WeUI 样式规范
- `steps.stories.ts` - 5 个故事示例
- `index.ts` - 导出

### Loadmore 组件
- `loadmore.component.ts` - 加载更多组件
- `loadmore.component.scss` - WeUI 样式规范
- `loadmore.stories.ts` - 5 个故事示例
- `index.ts` - 导出

---

## 六、Bug 修复任务

| 任务 | 问题描述 | 状态 |
|------|----------|------|
| **按钮计数器 bug** | 点击一次按钮计数器却增加 2 | 待修复 |
| **Gallery 图片源** | 图库需要使用 Bing 图片而非默认占位图 | 待修复 |

## 七、功能新增任务

| 任务 | 说明 | 优先级 |
|------|------|--------|
| **Picker 选择器** | 添加时间选择器、日期选择器等 picker 组件 | P1 |

---

请确认计划后开始执行。
