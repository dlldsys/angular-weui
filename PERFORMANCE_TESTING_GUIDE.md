# 性能测试和监控指南

## 🧪 **立即测试：验证事件监听器清理和 trackBy 优化效果**

### 1. **事件监听器清理测试**

#### 测试步骤：
1. 启动开发服务器：`npm start`
2. 打开 Chrome DevTools → Console
3. 运行以下测试代码：

```javascript
// 测试 Picker 组件事件监听器清理
function testPickerEventListeners() {
  console.log('=== Picker 事件监听器测试 ===');
  
  // 记录初始事件监听器数量
  const initialListeners = getEventListeners(document);
  console.log('初始事件监听器数量:', Object.keys(initialListeners).length);
  
  // 创建并销毁 Picker
  const pickerButton = document.querySelector('weui-button[buttonType="primary"]');
  if (pickerButton) {
    pickerButton.click(); // 打开 Picker
    
    setTimeout(() => {
      // 检查新增的事件监听器
      const afterOpenListeners = getEventListeners(document);
      console.log('打开 Picker 后事件监听器数量:', Object.keys(afterOpenListeners).length);
      
      // 关闭 Picker
      const cancelButton = document.querySelector('.weui-half-screen-dialog__ft button');
      if (cancelButton) {
        cancelButton.click();
        
        setTimeout(() => {
          // 检查事件监听器是否被正确清理
          const afterCloseListeners = getEventListeners(document);
          console.log('关闭 Picker 后事件监听器数量:', Object.keys(afterCloseListeners).length);
          
          // 验证清理效果
          const wheelListeners = afterCloseListeners.wheel || [];
          const touchListeners = afterCloseListeners.touchstart || [];
          
          console.log('✅ 事件监听器清理测试结果:');
          console.log('- wheel 事件监听器数量:', wheelListeners.length);
          console.log('- touchstart 事件监听器数量:', touchListeners.length);
          
          if (wheelListeners.length === 0 && touchListeners.length === 0) {
            console.log('🎉 事件监听器清理成功！');
          } else {
            console.log('❌ 事件监听器清理失败，存在内存泄漏风险');
          }
        }, 500);
      }
    }, 500);
  }
}

// 运行测试
testPickerEventListeners();
```

### 2. **trackBy 优化效果测试**

#### 测试步骤：
1. 打开 Chrome DevTools → Performance
2. 点击录制按钮
3. 运行以下操作：
   - 快速切换 Tabbar 项目
   - 在 Picker 中快速滚动
   - 快速创建多个 Toast

```javascript
// 测试 trackBy 优化效果
function testTrackByOptimization() {
  console.log('=== trackBy 优化测试 ===');
  
  // 测试 Tabbar 性能
  const tabbarItems = document.querySelectorAll('.weui-tabbar__item');
  console.log('Tabbar 项目数量:', tabbarItems.length);
  
  // 模拟快速点击
  let clickCount = 0;
  const clickInterval = setInterval(() => {
    if (clickCount < tabbarItems.length) {
      tabbarItems[clickCount].click();
      clickCount++;
    } else {
      clearInterval(clickInterval);
      console.log('Tabbar 快速切换测试完成');
    }
  }, 100);
}

// 运行测试
testTrackByOptimization();
```

## 📊 **监控内存：使用 Chrome DevTools Memory 标签页检查泄漏**

### 1. **内存泄漏检测步骤**

#### 准备工作：
1. 打开 Chrome DevTools → Memory 标签页
2. 勾选 "Heap snapshot" 和 "Allocation instrumentation"

#### 测试流程：
```javascript
// 内存泄漏检测脚本
function memoryLeakTest() {
  console.log('=== 内存泄漏检测 ===');
  
  // 1. 获取基准内存
  if (performance.memory) {
    console.log('基准内存使用:', {
      used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + ' MB',
      total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + ' MB',
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024) + ' MB'
    });
  }
  
  // 2. 执行内存压力测试
  let testCount = 0;
  const memoryTest = setInterval(() => {
    // 创建多个组件
    for (let i = 0; i < 5; i++) {
      // 创建 Toast
      const toastEvent = new CustomEvent('click');
      document.querySelector('weui-button[buttonType="primary"]').dispatchEvent(toastEvent);
      
      // 创建 Picker
      const pickerEvent = new CustomEvent('click');
      document.querySelectorAll('weui-button')[2].dispatchEvent(pickerEvent);
      
      // 关闭组件
      setTimeout(() => {
        const closeEvent = new CustomEvent('click');
        document.querySelector('.weui-mask')?.dispatchEvent(closeEvent);
      }, 100);
    }
    
    testCount++;
    if (testCount >= 10) {
      clearInterval(memoryTest);
      
      // 3. 强制垃圾回收
      setTimeout(() => {
        if (window.gc) {
          window.gc();
        }
        
        // 4. 检查最终内存
        setTimeout(() => {
          if (performance.memory) {
            console.log('测试后内存使用:', {
              used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + ' MB',
              total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + ' MB'
            });
          }
        }, 1000);
      }, 2000);
    }
  }, 2000);
}

// 运行内存测试
memoryLeakTest();
```

#### Heap Snapshot 分析：
1. 在测试前拍摄 Heap Snapshot
2. 执行组件创建/销毁操作
3. 拍摄第二个 Heap Snapshot
4. 对比两个快照，查找：
   - `(detached)` DOM 节点
   - 未清理的事件监听器
   - 闭包引用

## 🚀 **性能测试：使用 Lighthouse 评估整体性能**

### 1. **Lighthouse 测试配置**

#### 测试环境：
- 设备：Desktop (1920x1080)
- 网络：Fast 3G
- 节流：无

#### 测试步骤：
1. 打开 Chrome DevTools → Lighthouse
2. 选择 "Performance" 和 "Best Practices" 类别
3. 点击 "Generate report"

### 2. **性能指标监控**

#### 关键指标：
```javascript
// 性能指标监控
function performanceMonitor() {
  console.log('=== 性能指标监控 ===');
  
  // 监控 First Contentful Paint
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        console.log('FCP:', entry.startTime + 'ms');
      }
    }
  }).observe({ entryTypes: ['paint'] });
  
  // 监控 Largest Contentful Paint
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('LCP:', entry.startTime + 'ms', entry.element);
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });
  
  // 监控 Cumulative Layout Shift
  let clsScore = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsScore += entry.value;
      }
    }
    console.log('CLS:', clsScore);
  }).observe({ entryTypes: ['layout-shift'] });
  
  // 监控 First Input Delay
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('FID:', entry.processingStart - entry.startTime + 'ms');
    }
  }).observe({ entryTypes: ['first-input'] });
}

// 启动性能监控
performanceMonitor();
```

### 3. **组件性能基准测试**

#### Toast 组件性能：
```javascript
// Toast 性能基准测试
function toastPerformanceTest() {
  console.log('=== Toast 性能测试 ===');
  
  const iterations = 100;
  const startTime = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    // 创建 Toast
    const createEvent = new CustomEvent('click');
    document.querySelector('weui-button[buttonType="primary"]').dispatchEvent(createEvent);
    
    // 立即销毁
    setTimeout(() => {
      const toastElement = document.querySelector('.weui-toast__wrp');
      if (toastElement) {
        toastElement.remove();
      }
    }, 10);
  }
  
  const endTime = performance.now();
  const avgTime = (endTime - startTime) / iterations;
  
  console.log(`Toast 创建/销毁平均耗时: ${avgTime.toFixed(2)}ms`);
  console.log(`总耗时: ${(endTime - startTime).toFixed(2)}ms`);
}
```

#### Picker 组件性能：
```javascript
// Picker 性能基准测试
function pickerPerformanceTest() {
  console.log('=== Picker 性能测试 ===');
  
  const iterations = 50;
  const startTime = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    // 打开 Picker
    const openEvent = new CustomEvent('click');
    document.querySelectorAll('weui-button')[2].dispatchEvent(openEvent);
    
    // 模拟滚动
    setTimeout(() => {
      const pickerContent = document.querySelector('.weui-picker__content');
      if (pickerContent) {
        pickerContent.scrollTop = Math.random() * 200;
      }
      
      // 关闭 Picker
      setTimeout(() => {
        const closeEvent = new CustomEvent('click');
        document.querySelector('.weui-mask')?.dispatchEvent(closeEvent);
      }, 50);
    }, 100);
  }
  
  const endTime = performance.now();
  const avgTime = (endTime - startTime) / iterations;
  
  console.log(`Picker 打开/滚动/关闭平均耗时: ${avgTime.toFixed(2)}ms`);
}
```

## 🔄 **持续优化：建立性能监控和优化流程**

### 1. **自动化性能监控**

#### 添加性能监控服务：
```typescript
// performance-monitor.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitorService {
  private metrics: Map<string, number> = new Map();
  
  startMeasure(name: string): void {
    this.metrics.set(name, performance.now());
  }
  
  endMeasure(name: string): number {
    const startTime = this.metrics.get(name);
    if (startTime) {
      const duration = performance.now() - startTime;
      console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
      this.metrics.delete(name);
      return duration;
    }
    return 0;
  }
  
  measureMemoryUsage(): void {
    if (performance.memory) {
      const usage = {
        used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
      };
      console.log('[Memory] Usage:', usage);
      
      // 内存使用率超过80%时警告
      if (usage.used / usage.limit > 0.8) {
        console.warn('[Memory] High memory usage detected:', usage);
      }
    }
  }
}
```

### 2. **性能预算设置**

#### 在 angular.json 中添加预算：
```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "2mb",
      "maximumError": "4mb"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "2kb",
      "maximumError": "4kb"
    },
    {
      "type": "anyScript",
      "maximumWarning": "4kb",
      "maximumError": "8kb"
    }
  ]
}
```

### 3. **CI/CD 性能测试**

#### 添加性能测试到 package.json：
```json
{
  "scripts": {
    "test:performance": "ng build --configuration production && lhci autorun",
    "test:memory": "node scripts/memory-test.js",
    "benchmark": "node scripts/benchmark.js"
  }
}
```

### 4. **性能优化检查清单**

#### 每次代码审查时检查：
- [ ] 是否使用了 trackBy 函数？
- [ ] 事件监听器是否正确清理？
- [ ] 是否使用了 OnPush 变更检测？
- [ ] 是否避免了不必要的 detectChanges()？
- [ ] 定时器是否正确清理？
- [ ] DOM 查询是否优化？
- [ ] 是否存在内存泄漏风险？

## 📈 **性能目标**

### 短期目标（1-2周）：
- 消除所有内存泄漏
- 列表渲染性能提升50%
- 组件创建/销毁性能提升30%

### 中期目标（1个月）：
- Lighthouse 性能评分 >90
- 内存使用稳定在合理范围
- 建立完整的性能监控体系

### 长期目标（3个月）：
- 自动化性能回归测试
- 性能预算管理
- 持续性能优化流程

---

**开始执行测试，验证优化效果！** 🚀
