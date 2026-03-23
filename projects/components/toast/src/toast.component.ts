import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ViewEncapsulation,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type WeUIToastType = 'success' | 'warning' | 'error' | 'info' | 'loading' | 'text';
export type WeUIToastPosition = 'top' | 'center' | 'bottom';

@Component({
  selector: 'weui-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="visible"
      class="weui-toast__wrp"
    >
      <div 
        class="weui-toast"
        [class]="toastClasses"
        [style.z-index]="zIndex"
      >
        <!-- 图标区域 -->
        <div class="weui-toast__icon" *ngIf="showIcon && type !== 'text'">
          <ng-container [ngSwitch]="type">
            <i *ngSwitchCase="'success'" class="weui-icon-success-no-circle weui-icon_toast"></i>
            <i *ngSwitchCase="'warning'" class="weui-icon-warn weui-icon_toast"></i>
            <i *ngSwitchCase="'error'" class="weui-icon-error weui-icon_toast"></i>
            <i *ngSwitchCase="'info'" class="weui-icon-info weui-icon_toast"></i>
            <i *ngSwitchCase="'loading'" class="weui-loading weui-icon_toast"></i>
          </ng-container>
        </div>
        
        <!-- 文字内容 -->
        <p class="weui-toast__content" *ngIf="message">
          {{ message }}
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./toast.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeUIToastComponent implements OnDestroy {
  @Input() visible = false;
  @Input() message = '';
  @Input() type: WeUIToastType = 'success';
  @Input() position: WeUIToastPosition = 'center';
  @Input() duration = 1500; // 默认1500毫秒
  @Input() showIcon = true;
  @Input() zIndex = 5500;
  @Input() autoClose = true; // 是否自动关闭，默认开启

  @Output() close = new EventEmitter<void>();
  @Output() visibleChange = new EventEmitter<boolean>();

  @HostBinding('class.weui-toast-wrapper') hostClass = true;

  private timer: any = null;
  private static activeToasts: Set<WeUIToastComponent> = new Set(); // 跟踪所有活跃的toast组件
  private isHiding = false; // 防止重复隐藏

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.clearTimer();
    // 从活跃集合中移除
    WeUIToastComponent.activeToasts.delete(this);
  }

  get toastClasses(): string {
    const classes = ['weui-toast'];
    
    // 纯文字类型
    if (this.type === 'text') {
      classes.push('weui-toast--text');
    } else if (this.message && this.message.length > 15) {
      // 超过15个字符显示为多行文本
      classes.push('weui-toast--text-more');
    }
    
    // 位置
    if (this.position !== 'center') {
      classes.push(`weui-toast--${this.position}`);
    }
    
    // 类型
    if (this.type !== 'success' && this.type !== 'text') {
      classes.push(`weui-toast--${this.type}`);
    }
    
    // Loading 类型
    if (this.type === 'loading') {
      classes.push('weui-toast--loading');
    }
    
    return classes.join(' ');
  }

  showToast(): void {
    // 销毁所有其他toast（除了自己）
    WeUIToastComponent.destroyAll(this);
    
    // 添加到活跃集合
    WeUIToastComponent.activeToasts.add(this);
    
    if (this.timer) {
      this.clearTimer();
    }
    
    this.visible = true;
    this.visibleChange.emit(true);
    
    // 根据配置决定是否自动关闭
    if (this.autoClose && this.duration > 0 && this.type !== 'loading') {
      this.timer = setTimeout(() => {
        this.hideToast();
      }, this.duration);
    }
  }

  // 静态方法：销毁所有活跃的toast组件
  static destroyAll(excludeToast?: WeUIToastComponent): void {
    // 创建副本避免在遍历过程中修改集合
    const toastsToDestroy = Array.from(WeUIToastComponent.activeToasts).filter(toast => 
      toast !== excludeToast && toast.visible
    );
    
    toastsToDestroy.forEach(toast => {
      try {
        toast.hideToast();
      } catch (error) {
        console.warn('Error hiding toast:', error);
      }
    });
  }

  hideToast(): void {
    if (this.isHiding || !this.visible) {
      return;
    }
    
    this.isHiding = true;
    
    this.visible = false;
    this.visibleChange.emit(false);
    this.close.emit();
    this.clearTimer();
    
    // 从活跃集合中移除
    WeUIToastComponent.activeToasts.delete(this);
    
    // 重置隐藏标志
    setTimeout(() => {
      this.isHiding = false;
    }, 100);
  }

  private clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
