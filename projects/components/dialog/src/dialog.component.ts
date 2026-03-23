import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ViewEncapsulation,
  HostBinding,
  ChangeDetectionStrategy,
  TemplateRef,
  ContentChild,
  AfterContentInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

export type WeUIDialogType = 'alert' | 'confirm' | 'prompt' | 'default';
export type WeUIDialogSize = 'small' | 'normal' | 'large';

@Component({
  selector: 'weui-dialog',
  standalone: true,
  imports: [CommonModule, PortalModule, OverlayModule],
  template: `
    <div 
      *ngIf="visible"
      class="weui-dialog__mask"
      [class.weui-dialog__mask--hidden]="!mask"
      (click)="handleMaskClick($event)"
    >
      <div 
        class="weui-dialog"
        [class]="dialogClasses"
        [style.z-index]="zIndex"
      >
        <div class="weui-dialog__hd" *ngIf="title || titleTemplate">
          <ng-container *ngIf="titleTemplate; else titleContent">
            <ng-container [ngTemplateOutlet]="titleTemplate"></ng-container>
          </ng-container>
          <ng-template #titleContent>
            <strong class="weui-dialog__title">{{ title }}</strong>
          </ng-template>
        </div>
        
        <div class="weui-dialog__bd">
          <ng-container *ngIf="contentTemplate; else textContent">
            <ng-container [ngTemplateOutlet]="contentTemplate"></ng-container>
          </ng-container>
          <ng-template #textContent>
            <div [innerHTML]="content"></div>
          </ng-template>
        </div>
        
        <div class="weui-dialog__ft" *ngIf="showButtons">
          <button 
            *ngIf="showCancelButton"
            class="weui-dialog__btn"
            [ngClass]="'weui-dialog__btn_' + cancelButtonType"
            (click)="handleCancel()"
          >
            {{ cancelText }}
          </button>
          
          <button 
            *ngIf="showConfirmButton"
            class="weui-dialog__btn"
            [ngClass]="'weui-dialog__btn_' + confirmButtonType"
            (click)="handleConfirm()"
          >
            {{ confirmText }}
          </button>
        </div>
        
        <button 
          class="weui-dialog__close"
          *ngIf="closable"
          (click)="handleClose()"
          aria-label="关闭"
        >
          ×
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeUIDialogComponent implements AfterContentInit {
  @Input() visible = false;
  @Input() title = '';
  @Input() content = '';
  @Input() type: WeUIDialogType = 'default';
  @Input() size: WeUIDialogSize = 'normal';
  @Input() mask = true;
  @Input() closable = false;
  @Input() maskClosable = false;
  @Input() showButtons = true;
  @Input() showCancelButton = true;
  @Input() showConfirmButton = true;
  @Input() cancelText = '取消';
  @Input() confirmText = '确定';
  @Input() cancelButtonType: 'default' | 'warn' = 'default';
  @Input() confirmButtonType: 'primary' | 'warn' = 'primary';
  @Input() zIndex = 1000;
  @Input() lockScroll = true;

  @Output() open = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @Output() visibleChange = new EventEmitter<boolean>();

  @ContentChild('title') titleTemplate!: TemplateRef<any>;
  @ContentChild('content') contentTemplate!: TemplateRef<any>;

  @HostBinding('class.weui-dialog-wrapper') hostClass = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.cdr.detectChanges();
  }

  get dialogClasses(): string {
    const classes = ['weui-dialog'];
    
    if (this.type !== 'default') {
      classes.push(`weui-dialog--${this.type}`);
    }
    
    if (this.size !== 'normal') {
      classes.push(`weui-dialog--${this.size}`);
    }
    
    return classes.join(' ');
  }

  handleMaskClick(event: MouseEvent): void {
    if (event.target === event.currentTarget && this.maskClosable) {
      this.handleClose();
    }
  }

  handleClose(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.close.emit();
  }

  handleCancel(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.cancel.emit();
  }

  handleConfirm(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.confirm.emit();
  }

  openDialog(): void {
    this.visible = true;
    this.visibleChange.emit(true);
    this.open.emit();
    
    if (this.lockScroll) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeDialog(): void {
    this.handleClose();
    
    if (this.lockScroll) {
      document.body.style.overflow = '';
    }
  }
}
