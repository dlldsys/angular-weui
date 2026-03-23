import { Injectable } from '@angular/core';

// 扩展 Window 接口以包含 memory API
declare global {
  interface Window {
    gc?: () => void;
  }
  
  interface Performance {
    memory?: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
  }
}

export interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  startTime?: number;
}

export interface MemoryUsage {
  used: number;
  total: number;
  limit: number;
  usagePercentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitorService {
  private metrics: PerformanceMetric[] = [];
  private memoryHistory: MemoryUsage[] = [];
  private maxHistorySize = 100;

  constructor() {
    // 定期监控内存使用
    if (typeof window !== 'undefined' && performance.memory) {
      setInterval(() => {
        this.measureMemoryUsage();
      }, 5000); // 每5秒监控一次
    }
  }

  /**
   * 开始性能测量
   */
  startMeasure(name: string): void {
    const metric: PerformanceMetric = {
      name,
      duration: 0,
      timestamp: performance.now()
    };
    
    // 存储开始时间
    (metric as any).startTime = performance.now();
    this.metrics.push(metric);
  }

  /**
   * 结束性能测量
   */
  endMeasure(name: string): number {
    const metric = this.metrics.find(m => m.name === name && (m as any).startTime);
    if (metric) {
      const duration = performance.now() - (metric as any).startTime;
      metric.duration = duration;
      delete (metric as any).startTime;
      
      console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
      
      // 性能警告
      if (duration > 100) {
        console.warn(`[Performance] Slow operation detected: ${name} took ${duration.toFixed(2)}ms`);
      }
      
      return duration;
    }
    return 0;
  }

  /**
   * 测量内存使用
   */
  measureMemoryUsage(): void {
    if (performance.memory) {
      const memory = performance.memory;
      const usage: MemoryUsage = {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
        usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
      };

      this.memoryHistory.push(usage);
      
      // 保持历史记录在合理范围内
      if (this.memoryHistory.length > this.maxHistorySize) {
        this.memoryHistory.shift();
      }

      // 内存使用率警告
      if (usage.usagePercentage > 80) {
        console.warn(`[Memory] High memory usage: ${usage.usagePercentage.toFixed(1)}% (${usage.used}MB/${usage.limit}MB)`);
      } else if (usage.usagePercentage > 60) {
        console.info(`[Memory] Memory usage: ${usage.usagePercentage.toFixed(1)}% (${usage.used}MB/${usage.limit}MB)`);
      }
    }
  }

  /**
   * 获取平均性能指标
   */
  getAverageMetric(name: string, sampleSize: number = 10): number | null {
    const recentMetrics = this.metrics
      .filter(m => m.name === name && m.duration > 0)
      .slice(-sampleSize);
    
    if (recentMetrics.length === 0) return null;
    
    const total = recentMetrics.reduce((sum, m) => sum + m.duration, 0);
    return total / recentMetrics.length;
  }

  /**
   * 获取内存使用趋势
   */
  getMemoryTrend(sampleSize: number = 20): MemoryUsage[] {
    return this.memoryHistory.slice(-sampleSize);
  }

  /**
   * 检查是否存在内存泄漏
   */
  checkMemoryLeak(): boolean {
    if (this.memoryHistory.length < 10) return false;
    
    const recent = this.memoryHistory.slice(-10);
    const trend = recent.map(m => m.usagePercentage);
    
    // 计算趋势斜率
    let slope = 0;
    for (let i = 1; i < trend.length; i++) {
      slope += trend[i] - trend[i - 1];
    }
    
    // 如果内存使用率持续上升，可能存在内存泄漏
    const isLeaking = slope > 5 && trend[trend.length - 1] > 70;
    
    if (isLeaking) {
      console.error('[Memory] Memory leak detected! Memory usage is consistently increasing.');
    }
    
    return isLeaking;
  }

  /**
   * 强制垃圾回收（仅在开发环境）
   */
  forceGarbageCollection(): void {
    if (typeof window !== 'undefined' && (window as any).gc) {
      (window as any).gc();
      console.log('[Memory] Garbage collection forced');
    }
  }

  /**
   * 获取性能报告
   */
  getPerformanceReport(): {
    metrics: { [name: string]: { avg: number; count: number; max: number } };
    memory: { current: MemoryUsage; trend: MemoryUsage[]; leak: boolean };
  } {
    // 统计各项指标
    const metricStats: { [name: string]: { avg: number; count: number; max: number } } = {};
    
    this.metrics
      .filter(m => m.duration > 0)
      .forEach(metric => {
        if (!metricStats[metric.name]) {
          metricStats[metric.name] = { avg: 0, count: 0, max: 0 };
        }
        
        const stat = metricStats[metric.name];
        stat.count++;
        stat.avg += metric.duration;
        stat.max = Math.max(stat.max, metric.duration);
      });
    
    // 计算平均值
    Object.values(metricStats).forEach(stat => {
      stat.avg = stat.avg / stat.count;
    });

    const currentMemory = this.memoryHistory[this.memoryHistory.length - 1];
    
    return {
      metrics: metricStats,
      memory: {
        current: currentMemory,
        trend: this.getMemoryTrend(),
        leak: this.checkMemoryLeak()
      }
    };
  }

  /**
   * 清除历史数据
   */
  clearHistory(): void {
    this.metrics = [];
    this.memoryHistory = [];
    console.log('[Performance] History cleared');
  }

  /**
   * 导出性能数据
   */
  exportData(): string {
    const report = this.getPerformanceReport();
    return JSON.stringify(report, null, 2);
  }
}
