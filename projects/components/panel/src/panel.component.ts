import { Component, Input, ViewEncapsulation, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weui-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="panelClasses">
      <!-- 面板头部 -->
      <div class="weui-panel__hd" *ngIf="title || hasHdContent">
        <ng-content select="[hd]"></ng-content>
        <ng-container *ngIf="!hasHdContent">
          <span *ngIf="title">{{ title }}</span>
          <a *ngIf="more" [href]="moreHref" class="weui-panel__ft__link" (click)="onMoreClick($event)">
            {{ more }}
            <i class="weui-icon-arrow"></i>
          </a>
        </ng-container>
      </div>

      <!-- 面板内容 -->
      <div class="weui-panel__bd">
        <ng-content></ng-content>
      </div>

      <!-- 面板底部 -->
      <div class="weui-panel__ft" *ngIf="hasFtContent">
        <ng-content select="[ft]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUIPanelComponent {
  @Input() title?: string;
  @Input() more?: string;
  @Input() moreHref = 'javascript:;';
  @Input() access = false;

  @HostBinding('class.weui-panel-wrapper') hostClass = true;

  get hasHdContent(): boolean {
    return false;
  }

  get hasFtContent(): boolean {
    return false;
  }

  get panelClasses(): string {
    const classes = ['weui-panel'];

    if (this.access) {
      classes.push('weui-panel_access');
    }

    return classes.join(' ');
  }

  onMoreClick(event: Event): void {
    if (!this.moreHref || this.moreHref === 'javascript:;') {
      event.preventDefault();
    }
  }
}
