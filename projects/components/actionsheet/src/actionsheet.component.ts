import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ViewEncapsulation,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface WeUIActionSheetItem {
  name: string;
  value?: any;
  type?: 'default' | 'warn' | 'disabled';
  loading?: boolean;
  icon?: string;
}

@Component({
  selector: 'weui-actionsheet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="visible"
      class="weui-actionsheet"
      [style.z-index]="zIndex"
    >
      <div 
        class="weui-mask"
        [class.weui-mask--hidden]="!mask"
        (click)="handleMaskClick($event)"
      ></div>
      
      <div class="weui-actionsheet__container" [class.weui-actionsheet__container--show]="visible">
        <div class="weui-actionsheet__menu" *ngIf="actions.length > 0">
          <div 
            class="weui-actionsheet__cell"
            [class]="getItemClasses(item)"
            *ngFor="let item of actions; let i = index"
            (click)="handleActionClick(item, i, $event)"
          >
            <i *ngIf="item.icon" class="weui-actionsheet__icon" [class]="item.icon"></i>
            <span class="weui-actionsheet__text">{{ item.name }}</span>
            <i *ngIf="item.loading" class="weui-loading weui-actionsheet__loading"></i>
          </div>
        </div>
        
        <div class="weui-actionsheet__action" *ngIf="showCancel">
          <div 
            class="weui-actionsheet__cell weui-actionsheet__cell--cancel"
            (click)="handleCancel()"
          >
            {{ cancelText }}
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./actionsheet.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeUIActionSheetComponent {
  @Input() visible = false;
  @Input() actions: WeUIActionSheetItem[] = [];
  @Input() title = '';
  @Input() showCancel = true;
  @Input() cancelText = '取消';
  @Input() mask = true;
  @Input() maskClosable = true;
  @Input() zIndex = 1000;
  @Input() lockScroll = true;

  @Output() select = new EventEmitter<{ item: WeUIActionSheetItem; index: number }>();
  @Output() cancel = new EventEmitter<void>();
  @Output() visibleChange = new EventEmitter<boolean>();

  @HostBinding('class.weui-actionsheet-wrapper') hostClass = true;

  constructor(private cdr: ChangeDetectorRef) {}

  getItemClasses(item: WeUIActionSheetItem): string {
    const classes = ['weui-actionsheet__cell'];
    
    if (item.type === 'warn') {
      classes.push('weui-actionsheet__cell--warn');
    }
    
    if (item.type === 'disabled') {
      classes.push('weui-actionsheet__cell--disabled');
    }
    
    if (item.loading) {
      classes.push('weui-actionsheet__cell--loading');
    }
    
    return classes.join(' ');
  }

  handleMaskClick(event: MouseEvent): void {
    if (event.target === event.currentTarget && this.maskClosable) {
      this.handleCancel();
    }
  }

  handleActionClick(item: WeUIActionSheetItem, index: number, event: MouseEvent): void {
    if (item.type === 'disabled' || item.loading) {
      event.preventDefault();
      return;
    }
    
    this.select.emit({ item, index });
    this.hide();
  }

  handleCancel(): void {
    this.cancel.emit();
    this.hide();
  }

  show(): void {
    this.visible = true;
    this.visibleChange.emit(true);
    
    if (this.lockScroll) {
      document.body.style.overflow = 'hidden';
    }
    
    this.cdr.detectChanges();
  }

  hide(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    
    if (this.lockScroll) {
      document.body.style.overflow = '';
    }
    
    this.cdr.detectChanges();
  }
}
