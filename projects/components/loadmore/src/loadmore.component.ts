import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type WeUILoadmoreType = 'loading' | 'nodata' | 'loadingline';

@Component({
  selector: 'weui-loadmore',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="weui-loadmore" [class]="'weui-loadmore--' + type">
      <!-- 加载中状态 -->
      <ng-container *ngIf="type === 'loading'">
        <span class="weui-loadmore__loading">
          <span class="weui-loadmore__loading-icon"></span>
          <span class="weui-loadmore__loading-icon"></span>
          <span class="weui-loadmore__loading-icon"></span>
          <span class="weui-loadmore__loading-icon"></span>
        </span>
        <span class="weui-loadmore__tips">{{ loadingText }}</span>
      </ng-container>

      <!-- 线加载中状态 -->
      <ng-container *ngIf="type === 'loadingline'">
        <span class="weui-loadmore__line"></span>
        <span class="weui-loadmore__tips" *ngIf="tips">{{ tips }}</span>
        <span class="weui-loadmore__loading" *ngIf="!tips">
          <span class="weui-loadmore__loading-icon"></span>
        </span>
        <span class="weui-loadmore__line"></span>
      </ng-container>

      <!-- 无数据状态 -->
      <ng-container *ngIf="type === 'nodata'">
        <span class="weui-loadmore__tips">{{ nodataText }}</span>
      </ng-container>
    </div>
  `,
  styleUrls: ['./loadmore.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUILoadmoreComponent {
  @Input() type: WeUILoadmoreType = 'loading';
  @Input() loadingText = '正在加载...';
  @Input() nodataText = '暂无数据';
  @Input() tips = '';
}
