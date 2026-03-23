import { Injectable, ComponentRef, ApplicationRef, Injector, EnvironmentInjector, createComponent } from '@angular/core';
import { WeUIActionSheetComponent, WeUIActionSheetItem } from './actionsheet.component';

export interface WeUIActionSheetOptions {
  title?: string;
  actions: WeUIActionSheetItem[];
  showCancel?: boolean;
  cancelText?: string;
  maskClosable?: boolean;
  zIndex?: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeUIActionSheetService {
  private actionSheetRef: ComponentRef<WeUIActionSheetComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private environmentInjector: EnvironmentInjector
  ) {}

  show(options: WeUIActionSheetOptions): Promise<{ item: WeUIActionSheetItem; index: number } | null> {
    return new Promise((resolve) => {
      this.hide(); // 先隐藏现有的actionsheet

      // 创建actionsheet组件
      this.actionSheetRef = createComponent(WeUIActionSheetComponent, {
        environmentInjector: this.environmentInjector,
        elementInjector: this.injector
      });

      // 设置属性
      const actionSheetInstance = this.actionSheetRef.instance;
      actionSheetInstance.title = options.title || '';
      actionSheetInstance.actions = options.actions;
      actionSheetInstance.showCancel = options.showCancel ?? true;
      actionSheetInstance.cancelText = options.cancelText || '取消';
      actionSheetInstance.maskClosable = options.maskClosable ?? true;
      actionSheetInstance.zIndex = options.zIndex ?? 1000;

      // 监听事件
      actionSheetInstance.select.subscribe((result) => {
        resolve(result);
        this.destroyActionSheet();
      });

      actionSheetInstance.cancel.subscribe(() => {
        resolve(null);
        this.destroyActionSheet();
      });

      // 添加到DOM
      document.body.appendChild(this.actionSheetRef.location.nativeElement);
      this.appRef.attachView(this.actionSheetRef.hostView);

      // 显示actionsheet
      actionSheetInstance.show();
    });
  }

  hide(): void {
    if (this.actionSheetRef) {
      const actionSheetInstance = this.actionSheetRef.instance;
      actionSheetInstance.hide();
      this.destroyActionSheet();
    }
  }

  private destroyActionSheet(): void {
    if (this.actionSheetRef) {
      // 延迟移除DOM元素，让动画完成
      setTimeout(() => {
        if (this.actionSheetRef) {
          this.appRef.detachView(this.actionSheetRef.hostView);
          this.actionSheetRef.destroy();
          this.actionSheetRef = null;
        }
      }, 300);
    }
  }
}
