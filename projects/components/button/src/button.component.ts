import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  HostBinding
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type WeUIButtonType = 'primary' | 'default' | 'warn';
export type WeUIButtonSize = 'small' | 'normal' | 'large';

@Component({
  selector: 'weui-button, [weui-button]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [class]="buttonClasses"
      (click)="onClick($event)"
    >
      <span class="weui-btn__inner" *ngIf="!loading">
        <ng-content></ng-content>
      </span>
      <span class="weui-btn__loading" *ngIf="loading">
        <i class="weui-loading"></i>
      </span>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUIButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() buttonType: WeUIButtonType = 'default';
  @Input() size: WeUIButtonSize = 'normal';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() block = false;
  @Input() plain = false;
  @Input() round = false;
  @Input() circle = false;

  @Output() click = new EventEmitter<MouseEvent>();

  @HostBinding('class.weui-btn__wrapper') hostClass = true;

  get buttonClasses(): string {
    const classes = ['weui-btn'];

    // 按钮类型 (官方: weui-btn_primary)
    classes.push(`weui-btn_${this.buttonType}`);

    // 按钮大小 (官方: weui-btn_mini, weui-btn_xmini)
    if (this.size === 'small') {
      classes.push('weui-btn_mini');
    } else if (this.size === 'large') {
      classes.push('weui-btn_medium');
    }

    // 状态 (官方: weui-btn_disabled, weui-btn_loading)
    if (this.disabled) {
      classes.push('weui-btn_disabled');
    }

    if (this.loading) {
      classes.push('weui-btn_loading');
    }

    // 样式修饰 (官方: weui-btn_block, weui-btn_inline)
    if (this.block) {
      classes.push('weui-btn_block');
    } else {
      classes.push('weui-btn_inline');
    }

    return classes.join(' ');
  }

  onClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.stopPropagation();
      return;
    }

    // 防止事件冒泡，避免重复触发
    event.stopPropagation();
    this.click.emit(event);
  }
}
