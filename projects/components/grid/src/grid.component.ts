import { Component, Input, ViewEncapsulation, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weui-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="weui-grids">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUIGridComponent {
  // WeUI官方grid是固定的九宫格布局，不需要自定义列数和间距
  constructor() {}
}
