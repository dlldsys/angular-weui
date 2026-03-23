import { Component, Input, ViewEncapsulation, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weui-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="weui-list" [class.weui-list_access]="access">
      <div class="weui-list__group" *ngIf="title">
        <div class="weui-list__group-title" *ngIf="title">{{ title }}</div>
        <ng-content></ng-content>
      </div>
      <ng-content *ngIf="!title"></ng-content>
    </div>
  `,
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUIListComponent {
  @Input() title?: string;
  @Input() access = false;

  @HostBinding('class.weui-list-wrapper') hostClass = true;
}

@Component({
  selector: 'weui-list-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a class="weui-list__item" [href]="href">
      <div class="weui-list__item__hd" *ngIf="thumb || icon">
        <img *ngIf="thumb" [src]="thumb" class="weui-list__item__thumb" alt="" />
        <i *ngIf="icon" [class]="'weui-list__item__icon ' + icon"></i>
      </div>
      <div class="weui-list__item__bd">
        <span class="weui-list__item__label">{{ label }}</span>
        <span class="weui-list__item__desc" *ngIf="desc">{{ desc }}</span>
      </div>
      <div class="weui-list__item__ft">
        <span class="weui-list__item__value" [class.weui-list__item__value-bold]="bold">{{ value }}</span>
        <span *ngIf="arrow" class="weui-list__item__arrow"></span>
      </div>
    </a>
  `,
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUIListItemComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() desc = '';
  @Input() icon?: string;
  @Input() thumb?: string;
  @Input() href = 'javascript:;';
  @Input() arrow = false;
  @Input() bold = false;
}
