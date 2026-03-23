import { Component, Input, ViewEncapsulation, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type WeUIFlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type WeUIFlexAlign = 'top' | 'bottom' | 'center' | 'baseline' | 'stretch';
export type WeUIFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type WeUIFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

@Component({
  selector: 'weui-flex, [weui-flex]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="flexClasses">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./flex.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUIFlexComponent {
  @Input() justify: WeUIFlexJustify = 'start';
  @Input() align: WeUIFlexAlign = 'center';
  @Input() direction: WeUIFlexDirection = 'row';
  @Input() wrap: WeUIFlexWrap = 'nowrap';
  @Input() gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' = 'none';

  @HostBinding('class.weui-flex-wrapper') hostClass = true;

  get flexClasses(): string {
    const classes = ['weui-flex'];

    // 主轴对齐
    const justifyMap: Record<WeUIFlexJustify, string> = {
      'start': 'weui-flex__justify_start',
      'end': 'weui-flex__justify_end',
      'center': 'weui-flex__justify_center',
      'between': 'weui-flex__justify_between',
      'around': 'weui-flex__justify_around',
      'evenly': 'weui-flex__justify_evenly'
    };
    classes.push(justifyMap[this.justify]);

    // 交叉轴对齐
    const alignMap: Record<WeUIFlexAlign, string> = {
      'top': 'weui-flex__align_top',
      'bottom': 'weui-flex__align_bottom',
      'center': 'weui-flex__align_center',
      'baseline': 'weui-flex__align_baseline',
      'stretch': 'weui-flex__align_stretch'
    };
    classes.push(alignMap[this.align]);

    // 方向
    if (this.direction !== 'row') {
      classes.push(`weui-flex__dir_${this.direction}`);
    }

    // 换行
    if (this.wrap !== 'nowrap') {
      classes.push(`weui-flex__wrap_${this.wrap}`);
    }

    // 间距
    if (this.gap !== 'none') {
      classes.push(`weui-flex__gap_${this.gap}`);
    }

    return classes.join(' ');
  }
}
