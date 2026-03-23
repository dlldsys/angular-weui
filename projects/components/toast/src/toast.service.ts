import { Injectable, ComponentRef, ApplicationRef, Injector, EnvironmentInjector, createComponent } from '@angular/core';
import { WeUIToastComponent, WeUIToastType, WeUIToastPosition } from './toast.component';

export interface WeUIToastOptions {
  message?: string;
  type?: WeUIToastType;
  position?: WeUIToastPosition;
  duration?: number;
  showIcon?: boolean;
  zIndex?: number;
  autoClose?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WeUIToastService {
  private toastRef: ComponentRef<WeUIToastComponent> | null = null;
  private static activeToasts: Set<WeUIToastComponent> = new Set(); // 跟踪所有活跃的toast
  private isHiding = false; // 防止重复隐藏

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private environmentInjector: EnvironmentInjector
  ) {}

  show(options: WeUIToastOptions = {}): void {
    this.destroyAll(); // 销毁所有现有的toast

    // 创建toast组件
    this.toastRef = createComponent(WeUIToastComponent, {
      environmentInjector: this.environmentInjector,
      elementInjector: this.injector
    });

    // 设置属性
    const toastInstance = this.toastRef.instance;
    toastInstance.visible = true; // 重要：设置visible为true
    toastInstance.message = options.message || '';
    toastInstance.type = options.type || 'info';
    toastInstance.position = options.position || 'center';
    toastInstance.duration = options.duration ?? 1500; // 默认1500毫秒
    toastInstance.showIcon = options.showIcon ?? true;
    toastInstance.zIndex = options.zIndex ?? 1001;
    toastInstance.autoClose = options.autoClose ?? true; // 默认开启自动关闭

    // 添加到活跃toast集合
    WeUIToastService.activeToasts.add(toastInstance);

    // 不再监听close事件，避免循环调用
    // toastInstance.close.subscribe(() => {
    //   this.hide();
    // });

    // 添加到DOM
    document.body.appendChild(this.toastRef.location.nativeElement);
    this.appRef.attachView(this.toastRef.hostView);

    // 显示toast
    toastInstance.showToast();
  }

  // 销毁所有toast（包括组件级别和service级别）
  destroyAll(): void {
    // 销毁service创建的toast
    this.hide();
    
    // 销毁所有活跃的toast组件
    WeUIToastComponent.destroyAll();
    
    // 强制清理DOM中可能残留的toast元素
    this.forceCleanupDOM();
  }

  // 强制清理DOM中的残留toast元素
  private forceCleanupDOM(): void {
    const toastElements = document.querySelectorAll('.weui-toast__wrp');
    toastElements.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
  }

  success(message: string, options: Omit<WeUIToastOptions, 'message' | 'type'> = {}): void {
    this.show({ ...options, message, type: 'success' });
  }

  warning(message: string, options: Omit<WeUIToastOptions, 'message' | 'type'> = {}): void {
    this.show({ ...options, message, type: 'warning' });
  }

  error(message: string, options: Omit<WeUIToastOptions, 'message' | 'type'> = {}): void {
    this.show({ ...options, message, type: 'error' });
  }

  info(message: string, options: Omit<WeUIToastOptions, 'message' | 'type'> = {}): void {
    this.show({ ...options, message, type: 'info' });
  }

  loading(message: string = '加载中...', options: Omit<WeUIToastOptions, 'message' | 'type' | 'duration'> = {}): void {
    this.show({ ...options, message, type: 'loading', duration: 0 });
  }

  hide(): void {
    if (this.isHiding || !this.toastRef) {
      return;
    }
    
    this.isHiding = true;
    
    const toastInstance = this.toastRef.instance;
    
    // 调用组件的hideToast方法进行完整清理
    toastInstance.hideToast();
    
    // 从活跃集合中移除
    WeUIToastService.activeToasts.delete(toastInstance);
    
    // 延迟移除DOM元素，让动画完成
    setTimeout(() => {
      if (this.toastRef) {
        this.appRef.detachView(this.toastRef.hostView);
        this.toastRef.destroy();
        this.toastRef = null;
      }
      this.isHiding = false;
    }, 300);
  }
}
