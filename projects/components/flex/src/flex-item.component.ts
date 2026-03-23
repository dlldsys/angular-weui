import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weui-flex-item, [weui-flex-item]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="weui-flex__item" [style.flex]="flexValue">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./flex-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUIFlexItemComponent {
  @Input() flex: number | string = 1;

  get flexValue(): string {
    if (typeof this.flex === 'number') {
      return String(this.flex);
    }
    return this.flex;
  }
}
