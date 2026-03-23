# 🚀 性能测试快速启动指南

## 📋 **测试清单**

在开始性能测试之前，请确保：

- [ ] 开发服务器正在运行：`npm start`
- [ ] 浏览器已打开到 `http://localhost:4200`
- [ ] Chrome DevTools 已打开
- [ ] 已应用之前的性能优化修复

## 🎯 **立即执行测试**

### 方法 1：使用性能测试脚本（推荐）

1. **打开浏览器控制台**
   - 按 `F12` 打开开发者工具
   - 切换到 `Console` 标签页

2. **复制粘贴测试脚本**
   ```bash
   # 复制 performance-test.ts 的内容到控制台
   # 或者直接运行：
   fetch('./performance-test.ts').then(r => r.text()).then(code => eval(code))
   ```

3. **运行所有测试**
   ```javascript
   performanceTests.runAll()
   ```

### 方法 2：单独测试组件

#### 📡 事件监听器清理测试
```javascript
performanceTests.eventListeners()
```
**预期结果**：✅ 事件监听器清理测试通过！

#### 🎯 trackBy 优化测试
```javascript
performanceTests.trackBy()
```
**预期结果**：✅ Tabbar 性能优秀！

#### 💾 内存泄漏测试
```javascript
performanceTests.memory()
```
**预期结果**：✅ 内存泄漏测试通过！

#### 🍞 Toast 性能测试
```javascript
performanceTests.toast()
```
**预期结果**：✅ Toast 性能优秀！

#### 📊 生成性能报告
```javascript
performanceTests.report()
```

## 🔍 **Chrome DevTools 详细监控**

### 1. **Memory 标签页监控**

1. 打开 `Memory` 标签页
2. 选择 `Heap snapshot`
3. 点击 `Take snapshot`（基准）
4. 执行组件操作（创建/销毁）
5. 再次点击 `Take snapshot`
6. 对比快照，查找：
   - `(detached)` DOM 节点
   - 未清理的事件监听器
   - 闭包引用

### 2. **Performance 标签页监控**

1. 打开 `Performance` 标签页
2. 点击录制按钮
3. 执行快速操作：
   - 连续点击 Tabbar 项目
   - 快速打开/关闭 Picker
   - 批量创建/销毁 Toast
4. 停止录制并分析

### 3. **Lighthouse 性能评估**

1. 打开 `Lighthouse` 标签页
2. 选择 `Performance` 和 `Best Practices`
3. 点击 `Generate report`
4. 关注以下指标：
   - Performance score > 90
   - Best Practices score > 90
   - 无内存泄漏警告

## 📈 **性能目标验证**

### ✅ **优化成功标准**

| 指标 | 目标 | 验证方法 |
|------|------|----------|
| 事件监听器泄漏 | 0 个 | `performanceTests.eventListeners()` |
| 内存增长 | < 5MB | `performanceTests.memory()` |
| Tabbar 切换速度 | < 10ms | `performanceTests.trackBy()` |
| Toast 处理速度 | < 5ms | `performanceTests.toast()` |
| Lighthouse 评分 | > 90 | Lighthouse 报告 |

### ⚠️ **需要进一步优化的信号**

- 事件监听器数量持续增长
- 内存使用率 > 80%
- 组件操作延迟 > 20ms
- Lighthouse 评分 < 80

## 🛠️ **常见问题排查**

### 问题 1：找不到测试按钮
**解决方案**：
```javascript
// 手动查找按钮
const buttons = document.querySelectorAll('weui-button');
console.log('找到按钮:', Array.from(buttons).map(b => b.textContent));
```

### 问题 2：performance.memory API 不可用
**解决方案**：
- 使用 Chrome 浏览器
- 启用 `--enable-precise-memory-info` 标志
- 或使用 Chrome DevTools Memory 标签页

### 问题 3：测试结果不稳定
**解决方案**：
- 关闭其他浏览器标签页
- 清除浏览器缓存
- 多次运行取平均值

## 📝 **记录测试结果**

创建测试结果记录文件：
```bash
# 创建测试记录
echo "性能测试记录 - $(date)" > performance-test-results.log
echo "================================" >> performance-test-results.log

# 运行测试并记录结果
npm run test:components >> performance-test-results.log
```

## 🎯 **下一步行动**

1. **立即测试**：运行 `performanceTests.runAll()`
2. **记录基准**：保存当前性能数据
3. **持续监控**：定期运行测试检查回归
4. **优化迭代**：根据测试结果进一步优化

---

**🚀 现在开始性能测试吧！**

在浏览器控制台中运行：
```javascript
performanceTests.runAll()
```
