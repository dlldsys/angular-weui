import { Injectable, ComponentRef, ApplicationRef, Injector, EnvironmentInjector, createComponent } from '@angular/core';
import { WeUIActionsheetComponent, WeUIActionsheetItem } from './actionsheet.component';

export interface WeUIActionsheetOptions {
  title?: string;
  actions: WeUIActionsheetItem[];
  showCancel?: boolean;
  cancelText?: string;
  maskClosable?: boolean;
  zIndex?: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeUIActionsheetService {
  private actionsheetRef: ComponentRef<WeUIActionsheetComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private environmentInjector: EnvironmentInjector
  ) {}

  show(options: WeUIActionsheetOptions): Promise<{ item: WeUIActionsheetItem; index: number } | null> {
    return new Promise((resolve) => {
      this.hide(); // 先隐藏现有的actionsheet

      // 创建actionsheet组件
      this.actionsheetRef = createComponent(WeUIActionsheetComponent, {
        environmentInjector: this.environmentInjector,
        elementInjector: this.injector
      });

      // 设置属性
      const actionsheetInstance = this.actionsheetRef.instance;
      actionsheetInstance.title = options.title || '';
      actionsheetInstance.actions = options.actions;
      actionsheetInstance.showCancel = options.showCancel ?? true;
      actionsheetInstance.cancelText = options.cancelText || '取消';
      actionsheetInstance.maskClosable = options.maskClosable ?? true;
      actionsheetInstance.zIndex = options.zIndex ?? 1000;

      // 监听事件
      actionsheetInstance.select.subscribe((result) => {
        resolve(result);
        this.destroyActionsheet();
      });

      actionsheetInstance.cancel.subscribe(() => {
        resolve(null);
        this.destroyActionsheet();
      });

      // 添加到DOM
      document.body.appendChild(this.actionsheetRef.location.nativeElement);
      this.appRef.attachView(this.actionsheetRef.hostView);

      // 显示actionsheet
      actionsheetInstance.show();
    });
  }

  hide(): void {
    if (this.actionsheetRef) {
      const actionsheetInstance = this.actionsheetRef.instance;
      actionsheetInstance.hide();
      this.destroyActionsheet();
    }
  }

  private destroyActionsheet(): void {
    if (this.actionsheetRef) {
      // 延迟移除DOM元素，让动画完成
      setTimeout(() => {
        if (this.actionsheetRef) {
          this.appRef.detachView(this.actionsheetRef.hostView);
          this.actionsheetRef.destroy();
          this.actionsheetRef = null;
        }
      }, 300);
    }
  }
}
