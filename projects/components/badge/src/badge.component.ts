import { Component, Input, ViewEncapsulation, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type WeUIBadgeShape = 'dot' | 'round' | 'rect' | 'square';
export type WeUIBadgeStatus = 'default' | 'primary' | 'success' | 'warning' | 'error';

@Component({
  selector: 'weui-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="badgeClasses">
      <ng-content></ng-content>
    </span>
  `,
  styleUrls: ['./badge.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUIBadgeComponent {
  @Input() value: string | number = '';
  @Input() shape: WeUIBadgeShape = 'round';
  @Input() status: WeUIBadgeStatus = 'default';
  @Input() size: 'small' | 'normal' = 'normal';
  @Input() max: number = 99;

  @HostBinding('class.weui-badge-wrapper') hostClass = true;

  get badgeClasses(): string {
    const classes = ['weui-badge'];

    // 形状
    if (this.shape === 'dot') {
      classes.push('weui-badge_dot');
    } else if (this.shape === 'rect') {
      classes.push('weui-badge_rect');
    } else if (this.shape === 'square') {
      classes.push('weui-badge_square');
    }

    // 状态颜色
    if (this.status !== 'default') {
      classes.push(`weui-badge_${this.status}`);
    }

    // 大小
    if (this.size === 'small') {
      classes.push('weui-badge_small');
    }

    return classes.join(' ');
  }

  get displayValue(): string {
    if (this.shape === 'dot') {
      return '';
    }

    if (typeof this.value === 'number' && this.value > this.max) {
      return `${this.max}+`;
    }

    return String(this.value);
  }
}
