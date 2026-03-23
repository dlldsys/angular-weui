import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ViewEncapsulation,
  HostBinding,
  ChangeDetectionStrategy,
  AfterContentInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface WeUITabbarItem {
  id: string;
  text: string;
  icon?: string;
  activeIcon?: string;
  badge?: string | number;
  disabled?: boolean;
}

@Component({
  selector: 'weui-tabbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="weui-tabbar" [class]="tabbarClasses" [style.z-index]="zIndex">
      @for (item of items; track item.id; let i = $index) {
        <button 
          class="weui-tabbar__item"
          [class.weui-bar__item_on]="activeIndex === i && !item.disabled"
          [class.weui-tabbar__item--disabled]="item.disabled"
          [disabled]="item.disabled"
          (click)="handleItemClick(item, i)"
          type="button"
        >
          <span class="weui-tabbar__icon">
            @if (item.icon && item.activeIcon) {
              <img [src]="activeIndex === i ? item.activeIcon : item.icon" [alt]="item.text" />
            } @else if (item.icon) {
              @if (isEmoji(item.icon)) {
                <span class="weui-tabbar__icon-emoji">{{ item.icon }}</span>
              } @else if (isImageUrl(item.icon)) {
                <img [src]="item.icon" [alt]="item.text" />
              } @else {
                <i [class]="item.icon"></i>
              }
            }
          </span>
          <span class="weui-tabbar__label">{{ item.text }}</span>
          @if (item.badge) {
            <span class="weui-tabbar__badge">{{ formatBadge(item.badge) }}</span>
          }
        </button>
      }
    </div>
  `,
  styleUrls: ['./tabbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeUITabbarComponent implements AfterContentInit {
  @Input() items: WeUITabbarItem[] = [];
  @Input() activeIndex = 0;
  @Input() fixed = true;
  @Input() zIndex = 99;
  @Input() border = true;

  @Output() change = new EventEmitter<{ item: WeUITabbarItem; index: number }>();
  @Output() activeIndexChange = new EventEmitter<number>();

  @HostBinding('class.weui-tabbar-wrapper') hostClass = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.cdr.detectChanges();
  }

  // trackBy 函数优化 ngFor 性能
  trackByItem(index: number, item: WeUITabbarItem): any {
    return item.id || index; // 使用 id 或 index 作为跟踪标识
  }

  get tabbarClasses(): string {
    const classes = ['weui-tabbar'];
    
    if (this.fixed) {
      classes.push('weui-tabbar--fixed');
    }
    
    if (!this.border) {
      classes.push('weui-tabbar--no-border');
    }
    
    return classes.join(' ');
  }

  isEmoji(value: string): boolean {
    return /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(value);
  }

  isImageUrl(value: string): boolean {
    return /^https?:\/\/.+\.(png|jpg|jpeg|gif|svg|webp)/i.test(value);
  }

  formatBadge(badge: string | number): string {
    if (typeof badge === 'number') {
      return badge > 99 ? '99+' : badge.toString();
    }
    return badge;
  }

  handleItemClick(item: WeUITabbarItem, index: number): void {
    if (item.disabled || this.activeIndex === index) {
      return;
    }
    
    this.activeIndex = index;
    this.activeIndexChange.emit(index);
    this.change.emit({ item, index });
    this.cdr.detectChanges();
  }

  setActiveIndex(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.activeIndex = index;
      this.cdr.detectChanges();
    }
  }
}
