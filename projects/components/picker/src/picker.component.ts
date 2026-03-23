import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ViewEncapsulation,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  ElementRef,
  QueryList,
  ViewChildren,
  OnChanges,
  SimpleChanges,
  Renderer2,
  AfterViewInit,
  forwardRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export interface WeUIPickerColumn {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface WeUIPickerResult {
  items: WeUIPickerColumn[];
  values: any[];
  labels: string[];
  indexes: number[];
}

@Component({
  selector: 'weui-picker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="weui-picker"
      [class.weui-picker--visible]="visible"
      [style.z-index]="zIndex"
    >
      <div 
        class="weui-mask" 
        [class.weui-mask--hidden]="!visible"
        (click)="handleMaskClick()"
      ></div>
      
      <div class="weui-half-screen-dialog" [class.weui-half-screen-dialog--show]="visible" role="dialog" aria-modal="true" tabindex="-1">
        <div class="weui-half-screen-dialog__hd">
          <div class="weui-half-screen-dialog__hd__main">
            <strong class="weui-half-screen-dialog__title">{{ title }}</strong>
          </div>
        </div>

        <div class="weui-half-screen-dialog__bd">
          <div class="weui-picker__bd">
            <div 
              class="weui-picker__group"
              *ngFor="let col of columns; let colIndex = index; trackBy: trackByColumn"
            >
              <div class="weui-picker__mask"></div>
              <div class="weui-picker__content" 
                   [style.transform]="'translateY(' + getScrollOffset(colIndex) + 'px)'"
                   #pickerContent>
                <div 
                  class="weui-picker__item"
                  [class.weui-picker__item--disabled]="item.disabled"
                  [class.weui-picker__item--selected]="itemIndex === selectedIndexes[colIndex]"
                  *ngFor="let item of col; let itemIndex = index; trackBy: trackByItem"
                  (click)="selectItem(colIndex, itemIndex)"
                >
                  {{ item.label }}
                </div>
              </div>
              <div class="weui-picker__indicator"></div>
            </div>
          </div>
        </div>

        <div class="weui-half-screen-dialog__ft">
          <a href="javascript:;" class="weui-btn weui-btn_default" (click)="handleCancel()">取消</a>
          <a href="javascript:;" class="weui-btn weui-btn_primary weui-picker__btn" (click)="handleConfirm()">确定</a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WeUIPickerComponent),
      multi: true
    }
  ]
})
export class WeUIPickerComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, ControlValueAccessor {
  @Input() visible = false;
  @Input() columns: WeUIPickerColumn[][] = [];
  @Input() title = '请选择';
  @Input() maskClosable = true;
  @Input() zIndex = 1000;
  @Input() lockScroll = true;
  @Input() defaultIndexes: number[] = [];
  
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<WeUIPickerResult>();
  @Output() cancel = new EventEmitter<void>();
  @Output() change = new EventEmitter<WeUIPickerResult>();

  @HostBinding('class.weui-picker-wrapper') hostClass = true;

  @ViewChildren('pickerContent') pickerContents!: QueryList<ElementRef>;

  selectedIndexes: number[] = [];

  // 每个选项的高度，与 CSS 中 .weui-picker__item 的 height 一致
  private readonly ITEM_HEIGHT = 34;
  // 内容区域顶部 padding，与 CSS 中 .weui-picker__content 的 padding-top 一致
  private readonly PADDING_TOP = 102;

  // 滑动相关状态
  private touchStartY = 0;
  private touchStartTranslateY = 0;
  private currentTranslateY: number[] = [];
  private isDragging = false;
  
  // trackBy 函数优化 ngFor 性能
  trackByColumn(index: number, col: WeUIPickerColumn[]): any {
    return col; // 返回列数组作为跟踪标识
  }
  
  trackByItem(index: number, item: WeUIPickerColumn): any {
    return item.value || index; // 使用 value 或 index 作为跟踪标识
  }
  
  // 防止穿透滚动的事件监听器
  private preventScrollHandler: ((e: Event) => void) | null = null;
  private preventTouchHandler: ((e: TouchEvent) => void) | null = null;

  // ControlValueAccessor 实现
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private innerValue: any = null;

  constructor(private cdr: ChangeDetectorRef, private el: ElementRef, private renderer: Renderer2) {
    // 初始化防止滚动穿透的事件处理器
    this.preventScrollHandler = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    this.preventTouchHandler = (e: TouchEvent) => {
      // 检查触摸是否在picker区域内
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      
      // 如果触摸在picker内容区域内，允许正常交互
      if (target && this.el.nativeElement.contains(target)) {
        return; // 允许picker内的触摸事件
      }
      
      // 如果触摸不在picker区域内，阻止默认行为
      e.preventDefault();
      e.stopPropagation();
    };
  }

  ngOnInit(): void {
    this.initSelectedIndexes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && changes['visible'].currentValue === true) {
      this.initSelectedIndexes();
      // 延迟初始化触摸事件，确保DOM已渲染
      setTimeout(() => {
        this.initTouchEvents();
        this.preventScrollThrough();
      }, 100);
    } else if (changes['visible'] && changes['visible'].currentValue === false) {
      this.allowScrollThrough();
    }
    if (changes['defaultIndexes'] && changes['defaultIndexes'].currentValue) {
      this.selectedIndexes = [...changes['defaultIndexes'].currentValue];
      this.cdr.markForCheck();
    }
  }

  ngAfterViewInit(): void {
    // 触摸事件在visible变化时初始化，避免重复初始化
  }

  ngOnDestroy(): void {
    this.allowScrollThrough();
    this.unlockScroll();
    
    // 确保100%清理事件监听器，防止内存泄漏
    // 事件监听器清理已在 allowScrollThrough 中处理
  }

  private initSelectedIndexes(): void {
    if (this.defaultIndexes && this.defaultIndexes.length > 0) {
      this.selectedIndexes = [...this.defaultIndexes];
    } else {
      this.selectedIndexes = this.columns.map(() => 0);
    }
  }

  /**
   * 计算当前列滚动到选中项居中的偏移量
   * 
   * picker 内容区域高度 238px，指示器居中在 y=119px
   * 指示器高度 34px，所以指示器顶部在 y=102px (119-17)
   * 
   * 内容区域 padding-top: 102px，为指示器上方留出空间显示更多项
   * 选项高度 34px
   * 
   * 定位计算：
   * - 内容区域有 padding-top: 102px，所以 item N 的顶部 = 102 + N * 34
   * - 我们希望选中项的顶部与指示器顶部对齐，即 102 + N * 34 + translateY = 102
   * - 因此 translateY = 102 - 102 - N * 34 = -N * 34
   */
  getScrollOffset(colIndex: number): number {
    const selectedIndex = this.selectedIndexes[colIndex] || 0;
    // 计算居中偏移：选中项应该在指示器位置居中
    // translateY = -selectedIndex * ITEM_HEIGHT
    const finalOffset = -selectedIndex * this.ITEM_HEIGHT;
    
    return finalOffset;
  }

  selectItem(colIndex: number, itemIndex: number): void {
    const column = this.columns[colIndex];
    if (!column || !column[itemIndex] || column[itemIndex].disabled) {
      return;
    }
    
    this.selectedIndexes[colIndex] = itemIndex;
    this.cdr.markForCheck();
    
    const result = this.getResult();
    this.change.emit(result);
    this.updateValue();
  }

  handleMaskClick(): void {
    if (this.maskClosable) {
      this.handleCancel();
    }
  }

  handleConfirm(): void {
    const result = this.getResult();
    this.confirm.emit(result);
    this.updateValue();
    this.hide();
  }

  handleCancel(): void {
    this.cancel.emit();
    this.hide();
  }

  private getResult(): WeUIPickerResult {
    const items: WeUIPickerColumn[] = [];
    const values: any[] = [];
    const labels: string[] = [];

    this.columns.forEach((col, colIndex) => {
      const item = col[this.selectedIndexes[colIndex]];
      if (item) {
        items.push(item);
        values.push(item.value);
        labels.push(item.label);
      }
    });

    return { items, values, labels, indexes: [...this.selectedIndexes] };
  }

  show(): void {
    this.visible = true;
    this.initSelectedIndexes();
    this.visibleChange.emit(true);
    this.lockScroll && this.lockScrollBody();
    this.preventScrollThrough();
    this.cdr.detectChanges();
  }

  hide(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.allowScrollThrough();
    this.unlockScroll();
    this.cdr.detectChanges();
  }

  private lockScrollBody(): void {
    if (this.lockScroll && typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  private unlockScroll(): void {
    if (this.lockScroll && typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  // 防止滚动穿透的方法
  private preventScrollThrough(): void {
    if (typeof document !== 'undefined') {
      // 只阻止背景页面的滚动，不阻止picker内的滚动
      this.preventScrollHandler = (e: Event) => {
        // 检查事件目标是否在picker内
        const target = e.target as Element;
        if (target && this.el.nativeElement.contains(target)) {
          return; // 允许picker内的滚动事件
        }
        
        // 阻止背景页面的滚动
        e.preventDefault();
        e.stopPropagation();
      };
      
      // 只阻止背景页面的wheel事件，不阻止touchmove（让picker自己处理）
      document.addEventListener('wheel', this.preventScrollHandler, { passive: false });
      
      // 防止背景页面点击，但允许picker内的点击
      this.preventTouchHandler = (e: TouchEvent) => {
        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        
        // 如果触摸在picker内容区域内，允许正常交互
        if (target && this.el.nativeElement.contains(target)) {
          return; // 允许picker内的触摸事件
        }
        
        // 如果触摸不在picker区域内，阻止默认行为
        e.preventDefault();
        e.stopPropagation();
      };
      
      document.addEventListener('touchstart', this.preventTouchHandler, { passive: false });
    }
  }

  private allowScrollThrough(): void {
    if (typeof document !== 'undefined') {
      // 移除事件监听器，恢复正常滚动
      if (this.preventScrollHandler) {
        document.removeEventListener('wheel', this.preventScrollHandler);
      }
      if (this.preventTouchHandler) {
        document.removeEventListener('touchstart', this.preventTouchHandler);
      }
    }
  }

  private initTouchEvents(): void {
    // 延迟初始化，确保DOM已渲染
    setTimeout(() => {
      this.pickerContents.forEach((content, index) => {
        if (content && content.nativeElement) {
          this.initColumnTouchEvents(content.nativeElement, index);
        }
      });
    }, 100);
  }

  private initColumnTouchEvents(element: HTMLElement, colIndex: number): void {
    let startY = 0;
    let startTime = 0;
    let currentTranslate = this.getScrollOffset(colIndex);

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
      currentTranslate = this.getScrollOffset(colIndex);
      this.isDragging = true;
      this.renderer.setStyle(element, 'transition', 'none');
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!this.isDragging) return;
      
      // 阻止默认行为防止页面滚动，但不阻止冒泡
      e.preventDefault();
      
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      const newTranslate = currentTranslate + deltaY;
      
      this.renderer.setStyle(element, 'transform', `translateY(${newTranslate}px)`);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!this.isDragging) return;
      
      this.isDragging = false;
      
      const endY = e.changedTouches[0].clientY;
      const deltaY = endY - startY;
      const deltaTime = Date.now() - startTime;
      
      // 计算最终位置
      const finalTranslate = currentTranslate + deltaY;
      const selectedIndex = this.calculateSelectedIndex(finalTranslate, colIndex);
      
      // 设置选中项
      this.selectedIndexes[colIndex] = selectedIndex;
      
      // 添加过渡动画
      this.renderer.setStyle(element, 'transition', 'transform 0.3s ease');
      this.renderer.setStyle(element, 'transform', `translateY(${this.getScrollOffset(colIndex)}px)`);
      
      // 触发变化事件
      const result = this.getResult();
      this.change.emit(result);
      this.updateValue();
      
      // 强制触发变更检测确保UI更新
      this.cdr.detectChanges();
      this.cdr.markForCheck();
    };

    // 添加事件监听器
    this.renderer.listen(element, 'touchstart', handleTouchStart);
    this.renderer.listen(element, 'touchmove', handleTouchMove);
    this.renderer.listen(element, 'touchend', handleTouchEnd);
  }

  private calculateSelectedIndex(translateY: number, colIndex: number): number {
    const column = this.columns[colIndex];
    if (!column || column.length === 0) return 0;
    
    // 根据偏移量计算选中项索引
    // translateY = -selectedIndex * 34
    // selectedIndex = -translateY / 34
    let selectedIndex = Math.round(-translateY / this.ITEM_HEIGHT);
    
    // 确保索引在有效范围内
    selectedIndex = Math.max(0, Math.min(selectedIndex, column.length - 1));
    
    return selectedIndex;
  }

  // ControlValueAccessor 实现
  writeValue(value: any): void {
    this.innerValue = value;
    if (value && Array.isArray(value.indexes)) {
      this.selectedIndexes = [...value.indexes];
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // 可以在这里添加禁用逻辑
  }

  // 更新值
  private updateValue(): void {
    const result = this.getResult();
    this.innerValue = result;
    this.onChange(result);
  }
}
