// Angular WeUI 性能测试脚本
// 在浏览器控制台中运行此脚本来测试性能优化效果

console.log('🚀 Angular WeUI 性能测试开始...');

// ==================== 事件监听器清理测试 ====================

function testEventListenersCleanup() {
  console.log('\n=== 📡 事件监听器清理测试 ===');
  
  // 获取初始事件监听器数量
  const getListenerCount = () => {
    const listeners = [];
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      const events = (el as any)._eventListeners || {};
      Object.keys(events).forEach(event => {
        listeners.push(...events[event]);
      });
    });
    return listeners.length;
  };
  
  const initialCount = getListenerCount();
  console.log(`初始事件监听器数量: ${initialCount}`);
  
  // 测试 Picker 组件
  const pickerButton = Array.from(document.querySelectorAll('weui-button')).find(btn => 
    btn.textContent?.includes('Picker') || btn.textContent?.includes('选择')
  );
  
  if (pickerButton) {
    console.log('打开 Picker 组件...');
    pickerButton.click();
    
    setTimeout(() => {
      const afterOpenCount = getListenerCount();
      console.log(`打开 Picker 后事件监听器数量: ${afterOpenCount}`);
      
      // 关闭 Picker
      const mask = document.querySelector('.weui-mask');
      if (mask) {
        console.log('关闭 Picker 组件...');
        mask.click();
        
        setTimeout(() => {
          const afterCloseCount = getListenerCount();
          console.log(`关闭 Picker 后事件监听器数量: ${afterCloseCount}`);
          
          const listenerDiff = afterCloseCount - initialCount;
          if (listenerDiff === 0) {
            console.log('✅ 事件监听器清理测试通过！');
          } else {
            console.log(`❌ 事件监听器清理失败，泄漏了 ${listenerDiff} 个监听器`);
          }
        }, 500);
      }
    }, 500);
  }
}

// ==================== trackBy 优化测试 ====================

function testTrackByOptimization() {
  console.log('\n=== 🎯 trackBy 优化测试 ===');
  
  // 测试 Tabbar 性能
  const tabbarItems = document.querySelectorAll('.weui-tabbar__item');
  if (tabbarItems.length > 0) {
    console.log(`找到 ${tabbarItems.length} 个 Tabbar 项目`);
    
    const startTime = performance.now();
    let clickCount = 0;
    
    const clickInterval = setInterval(() => {
      if (clickCount < tabbarItems.length) {
        tabbarItems[clickCount].click();
        clickCount++;
      } else {
        clearInterval(clickInterval);
        const endTime = performance.now();
        const avgTime = (endTime - startTime) / clickCount;
        
        console.log(`Tabbar 快速切换完成:`);
        console.log(`- 总耗时: ${(endTime - startTime).toFixed(2)}ms`);
        console.log(`- 平均每次切换: ${avgTime.toFixed(2)}ms`);
        
        if (avgTime < 10) {
          console.log('✅ Tabbar 性能优秀！');
        } else if (avgTime < 20) {
          console.log('⚠️ Tabbar 性能良好');
        } else {
          console.log('❌ Tabbar 性能需要优化');
        }
      }
    }, 50);
  }
}

// ==================== 内存泄漏测试 ====================

function testMemoryLeaks() {
  console.log('\n=== 💾 内存泄漏测试 ===');
  
  if (!performance.memory) {
    console.log('⚠️ 当前浏览器不支持 performance.memory API');
    return;
  }
  
  const getMemoryInfo = () => ({
    used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
    total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
    limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
  });
  
  const initialMemory = getMemoryInfo();
  console.log('初始内存使用:', initialMemory);
  
  // 执行内存压力测试
  let testRound = 0;
  const maxRounds = 10;
  
  const memoryTest = setInterval(() => {
    // 创建多个 Toast
    for (let i = 0; i < 5; i++) {
      const successButton = Array.from(document.querySelectorAll('weui-button')).find(btn => 
        btn.textContent?.includes('成功') || btn.textContent?.includes('success')
      );
      if (successButton) {
        successButton.click();
      }
    }
    
    // 关闭 Toast
    setTimeout(() => {
      const toasts = document.querySelectorAll('.weui-toast__wrp');
      toasts.forEach(toast => toast.remove());
    }, 100);
    
    testRound++;
    
    if (testRound >= maxRounds) {
      clearInterval(memoryTest);
      
      // 强制垃圾回收
      if (window.gc) {
        window.gc();
      }
      
      setTimeout(() => {
        const finalMemory = getMemoryInfo();
        console.log('最终内存使用:', finalMemory);
        
        const memoryIncrease = finalMemory.used - initialMemory.used;
        console.log(`内存增长: ${memoryIncrease}MB`);
        
        if (memoryIncrease < 5) {
          console.log('✅ 内存泄漏测试通过！');
        } else if (memoryIncrease < 15) {
          console.log('⚠️ 轻微内存增长，需要关注');
        } else {
          console.log('❌ 存在明显内存泄漏！');
        }
      }, 1000);
    }
  }, 1000);
}

// ==================== Toast 性能基准测试 ====================

function testToastPerformance() {
  console.log('\n=== 🍞 Toast 性能基准测试 ===');
  
  const iterations = 50;
  const successButton = Array.from(document.querySelectorAll('weui-button')).find(btn => 
    btn.textContent?.includes('成功') || btn.textContent?.includes('success')
  );
  
  if (!successButton) {
    console.log('❌ 找不到 Toast 测试按钮');
    return;
  }
  
  console.log(`开始 ${iterations} 次 Toast 性能测试...`);
  
  const startTime = performance.now();
  let completedTests = 0;
  
  const testInterval = setInterval(() => {
    if (completedTests < iterations) {
      successButton.click();
      
      // 立即销毁 Toast
      setTimeout(() => {
        const toast = document.querySelector('.weui-toast__wrp');
        if (toast) {
          toast.remove();
        }
        completedTests++;
      }, 10);
    } else {
      clearInterval(testInterval);
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const avgTime = totalTime / iterations;
      
      console.log(`Toast 性能测试结果:`);
      console.log(`- 总耗时: ${totalTime.toFixed(2)}ms`);
      console.log(`- 平均耗时: ${avgTime.toFixed(2)}ms`);
      console.log(`- 每秒可处理: ${(1000 / avgTime).toFixed(0)} 个 Toast`);
      
      if (avgTime < 5) {
        console.log('✅ Toast 性能优秀！');
      } else if (avgTime < 10) {
        console.log('⚠️ Toast 性能良好');
      } else {
        console.log('❌ Toast 性能需要优化');
      }
    }
  }, 20);
}

// ==================== 综合性能报告 ====================

function generatePerformanceReport() {
  console.log('\n=== 📊 综合性能报告 ===');
  
  const now = new Date().toLocaleString();
  console.log(`报告生成时间: ${now}`);
  
  // 页面基本信息
  console.log('\n📄 页面信息:');
  console.log(`- URL: ${window.location.href}`);
  console.log(`- User Agent: ${navigator.userAgent.substring(0, 50)}...`);
  
  // 性能指标
  if (performance.timing) {
    const timing = performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
    
    console.log('\n⚡ 页面加载性能:');
    console.log(`- 页面加载时间: ${loadTime}ms`);
    console.log(`- DOM 就绪时间: ${domReady}ms`);
    
    if (loadTime < 1000) {
      console.log('✅ 页面加载速度优秀');
    } else if (loadTime < 2000) {
      console.log('⚠️ 页面加载速度良好');
    } else {
      console.log('❌ 页面加载速度需要优化');
    }
  }
  
  // 内存使用
  if (performance.memory) {
    const memory = performance.memory;
    const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
    const totalMB = Math.round(memory.totalJSHeapSize / 1024 / 1024);
    const limitMB = Math.round(memory.jsHeapSizeLimit / 1024 / 1024);
    const usage = (usedMB / limitMB * 100).toFixed(1);
    
    console.log('\n💾 内存使用情况:');
    console.log(`- 已使用: ${usedMB}MB`);
    console.log(`- 总计: ${totalMB}MB`);
    console.log(`- 限制: ${limitMB}MB`);
    console.log(`- 使用率: ${usage}%`);
    
    if (usage < 50) {
      console.log('✅ 内存使用率健康');
    } else if (usage < 80) {
      console.log('⚠️ 内存使用率偏高');
    } else {
      console.log('❌ 内存使用率过高');
    }
  }
  
  // 组件统计
  console.log('\n🧩 组件统计:');
  const toastCount = document.querySelectorAll('.weui-toast__wrp').length;
  const pickerCount = document.querySelectorAll('.weui-picker__wrp').length;
  const dialogCount = document.querySelectorAll('.weui-dialog').length;
  
  console.log(`- Toast 组件: ${toastCount} 个`);
  console.log(`- Picker 组件: ${pickerCount} 个`);
  console.log(`- Dialog 组件: ${dialogCount} 个`);
  
  console.log('\n🎯 性能优化建议:');
  console.log('1. 定期运行此测试脚本监控性能');
  console.log('2. 使用 Chrome DevTools Memory 标签页检查内存泄漏');
  console.log('3. 使用 Lighthouse 评估整体性能');
  console.log('4. 关注组件创建/销毁的性能指标');
}

// ==================== 主测试函数 ====================

function runAllTests() {
  console.log('🚀 开始运行所有性能测试...\n');
  
  // 按顺序执行测试
  setTimeout(() => testEventListenersCleanup(), 1000);
  setTimeout(() => testTrackByOptimization(), 3000);
  setTimeout(() => testMemoryLeaks(), 5000);
  setTimeout(() => testToastPerformance(), 8000);
  setTimeout(() => generatePerformanceReport(), 12000);
}

// 导出测试函数到全局作用域
(window as any).performanceTests = {
  runAll: runAllTests,
  eventListeners: testEventListenersCleanup,
  trackBy: testTrackByOptimization,
  memory: testMemoryLeaks,
  toast: testToastPerformance,
  report: generatePerformanceReport
};

console.log('🎯 性能测试函数已加载！');
console.log('使用方法:');
console.log('- performanceTests.runAll() // 运行所有测试');
console.log('- performanceTests.eventListeners() // 测试事件监听器');
console.log('- performanceTests.trackBy() // 测试 trackBy 优化');
console.log('- performanceTests.memory() // 测试内存泄漏');
console.log('- performanceTests.toast() // 测试 Toast 性能');
console.log('- performanceTests.report() // 生成性能报告');

// 自动运行所有测试（可选）
// runAllTests();
