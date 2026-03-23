# Toast AutoClose Feature

## 概述

Toast 组件现在支持自动关闭配置，允许开发者控制提示是否自动关闭以及关闭延迟时间。同时实现了单一 Toast 模式，确保同时只能存在一个 Toast 实例。

## 新增功能

### 1. 自动关闭配置

- **`autoClose`**: 控制是否自动关闭，默认为 `true`
- **`duration`**: 自动关闭延迟时间，默认为 `1500` 毫秒

### 2. 单一 Toast 模式

- **自动替换**: 新 Toast 出现时自动关闭现有 Toast
- **全局管理**: 组件级别和 Service 级别的 Toast 都统一管理
- **销毁所有**: 提供销毁所有活跃 Toast 的方法

### 3. 使用方式

#### 组件方式

```html
<weui-toast 
  [visible]="toastVisible" 
  [message]="toastMessage" 
  [type]="toastType"
  [autoClose]="true"
  [duration]="1500"
  (close)="hideToast()">
</weui-toast>
```

#### Service 方式

```typescript
constructor(private toastService: WeUIToastService) {}

// 默认配置（自动关闭，1500毫秒）
this.toastService.success('操作成功');

// 自定义延迟时间
this.toastService.warning('警告信息', { duration: 3000 });

// 禁用自动关闭
this.toastService.info('需要手动关闭的提示', { autoClose: false });

// Loading 提示（默认不自动关闭）
this.toastService.loading('正在处理...');

// 销毁所有 Toast
this.toastService.destroyAll();
```

#### 静态方法（组件级别）

```typescript
// 销毁所有活跃的 Toast 组件
WeUIToastComponent.destroyAll();
```

## 配置选项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `autoClose` | boolean | `true` | 是否自动关闭 |
| `duration` | number | `1500` | 自动关闭延迟时间（毫秒） |

## 单一 Toast 行为

### 自动替换机制

1. **组件级别**: 使用 `WeUIToastComponent.showToast()` 时，会自动销毁其他组件 Toast
2. **Service 级别**: 使用 `WeUIToastService.show()` 时，会自动销毁其他 Service Toast
3. **跨级别**: 组件 Toast 和 Service Toast 也会相互替换

### 示例场景

```typescript
// 场景1：快速连续显示，只有最后一个会显示
this.showToast('success', '第一个');
this.showToast('warning', '第二个'); // 第一个被销毁
this.showToast('error', '第三个');   // 第二个被销毁

// 场景2：组件和Service混合
this.showToast('success', '组件Toast');
this.toastService.error('Service Toast'); // 组件Toast被销毁
```

## 特殊情况

- **Loading 类型**: 默认不自动关闭（`duration: 0`），需要手动调用 `hide()` 方法
- **autoClose 为 false**: 不会自动关闭，需要手动关闭
- **duration 为 0**: 不会自动关闭，相当于禁用自动关闭

## 销毁所有 Toast

### Service 方法

```typescript
// 销毁所有 Service 创建的 Toast
this.toastService.destroyAll();
```

### 组件静态方法

```typescript
// 销毁所有组件级别的 Toast
WeUIToastComponent.destroyAll();
```

### Demo 示例方法

```typescript
// 销毁所有类型的 Toast（组件 + Service）
destroyAllToasts(): void {
  this.hideToast();              // 销毁组件级别
  this.toastService.destroyAll(); // 销毁Service级别
}
```

## 示例场景

### 1. 成功提示（自动关闭）
```typescript
this.toastService.success('保存成功');
// 1500毫秒后自动关闭
```

### 2. 重要警告（延迟关闭）
```typescript
this.toastService.warning('请注意检查输入内容', { duration: 5000 });
// 5000毫秒后自动关闭
```

### 3. 长时间操作（手动关闭）
```typescript
this.toastService.loading('正在上传文件...', { autoClose: false });
// 需要手动调用 this.toastService.hide() 关闭
```

### 4. 单一 Toast 演示
```typescript
demonstrateSingleToast(): void {
  this.showToast('success', '第一个');
  setTimeout(() => this.showToast('warning', '第二个'), 500);   // 第一个被销毁
  setTimeout(() => this.showToast('error', '第三个'), 1000);    // 第二个被销毁
  setTimeout(() => this.showToast('info', '第四个'), 1500);     // 第三个被销毁
}
```

## 迁移指南

### 旧版本（2000毫秒固定延迟）
```typescript
// 旧版本
setTimeout(() => {
  this.toastVisible = false;
}, 2000);
```

### 新版本（1500毫秒默认延迟 + 单一模式）
```typescript
// 新版本 - 组件方式
<weui-toast [autoClose]="true" [duration]="1500"></weui-toast>

// 新版本 - Service 方式
this.toastService.success('操作成功'); // 自动1500毫秒关闭，自动替换其他Toast
```

## 注意事项

1. **Loading 类型**始终需要手动关闭，除非显式设置 `duration > 0`
2. 设置 `autoClose: false` 时，`duration` 参数将被忽略
3. 组件销毁时会自动清理定时器，避免内存泄漏
4. **单一模式**确保用户体验一致，避免多个 Toast 重叠显示
5. **销毁所有**功能适用于页面切换或需要清理所有提示的场景

## 性能优化

- 使用静态集合管理活跃 Toast，避免内存泄漏
- 自动清理机制确保组件销毁时正确释放资源
- 单一模式减少 DOM 节点数量，提升渲染性能
