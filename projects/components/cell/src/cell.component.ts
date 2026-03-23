import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  HostBinding,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weui-cell, [weui-cell]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="cellClasses"
      (click)="handleClick($event)"
      [attr.role]="clickable ? 'button' : null"
      [attr.tabindex]="clickable && !disabled ? '0' : null"
      [attr.aria-disabled]="disabled"
    >
      <!-- 左侧图标 -->
      <div class="weui-cell__hd" *ngIf="icon || iconTemplate">
        <ng-container *ngIf="icon; else iconTemplateRef">
          <i [class]="icon"></i>
        </ng-container>
        <ng-template #iconTemplateRef>
          <ng-container [ngTemplateOutlet]="iconTemplate"></ng-container>
        </ng-template>
      </div>

      <!-- 主要内容 -->
      <div class="weui-cell__bd">
        <div class="weui-cell__title" *ngIf="title">
          {{ title }}
        </div>
        <div class="weui-cell__desc" *ngIf="description">
          {{ description }}
        </div>
        <ng-content></ng-content>
      </div>

      <!-- 右侧内容 -->
      <div class="weui-cell__ft">
        <ng-content select="[slot='ft']"></ng-content>
        <span class="weui-cell__value" *ngIf="value">{{ value }}</span>
        <i class="weui-icon-arrow" *ngIf="clickable && !isLink"></i>
      </div>
    </div>
  `,
  styleUrls: ['./cell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeUICellComponent {
  @Input() title?: string;
  @Input() description?: string;
  @Input() value?: string;
  @Input() icon?: string;
  @Input() iconTemplate?: TemplateRef<any>;
  @Input() clickable = false;
  @Input() disabled = false;
  @Input() isLink = false;

  @Output() click = new EventEmitter<MouseEvent>();

  @HostBinding('class.weui-cell__wrapper') hostClass = true;

  get cellClasses(): string {
    const classes = ['weui-cell'];

    // 官方类名
    if (this.clickable || this.isLink) {
      classes.push('weui-cell_access');
    }

    if (this.disabled) {
      classes.push('weui-cell--disabled');
    }

    if (this.isLink) {
      classes.push('weui-cell--link');
    }

    return classes.join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.click.emit(event);
  }
}
