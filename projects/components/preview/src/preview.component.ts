import { Component, Input, ViewEncapsulation, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface WeUIPreviewField {
  label: string;
  value: string | number;
  bold?: boolean;
  href?: string;
}

@Component({
  selector: 'weui-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="previewClasses">
      <!-- 头部 -->
      <div class="weui-preview__hd" *ngIf="title || subTitle">
        <div class="weui-preview__info">
          <span class="weui-preview__title" *ngIf="title">{{ title }}</span>
          <span class="weui-preview__subtitle" *ngIf="subTitle">{{ subTitle }}</span>
        </div>
        <span class="weui-preview__value" *ngIf="value" [class.weui-preview__value_bold]="valueBold">
          {{ value }}
        </span>
      </div>

      <!-- 内容 -->
      <div class="weui-preview__bd">
        <ng-content></ng-content>
      </div>

      <!-- 按钮 -->
      <div class="weui-preview__ft" *ngIf="showDefaultFooter !== false">
        <ng-content select="[ft]"></ng-content>
        <ng-container *ngIf="!hasFtContent">
          <a 
            class="weui-preview__btn" 
            *ngIf="primaryBtn" 
            [href]="primaryBtnHref || 'javascript:;'"
            (click)="onPrimaryClick($event)"
          >
            {{ primaryBtn }}
          </a>
          <a 
            class="weui-preview__btn weui-preview__btn_default" 
            *ngIf="secondaryBtn" 
            [href]="secondaryBtnHref || 'javascript:;'"
            (click)="onSecondaryClick($event)"
          >
            {{ secondaryBtn }}
          </a>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUIPreviewComponent {
  @Input() title?: string;
  @Input() subTitle?: string;
  @Input() value?: string | number;
  @Input() valueBold = false;
  @Input() primaryBtn?: string;
  @Input() primaryBtnHref = 'javascript:;';
  @Input() secondaryBtn?: string;
  @Input() secondaryBtnHref = 'javascript:;';
  @Input() showDefaultFooter?: boolean;

  @HostBinding('class.weui-preview-wrapper') hostClass = true;

  get hasFtContent(): boolean {
    return false;
  }

  get previewClasses(): string {
    return 'weui-preview';
  }

  onPrimaryClick(event: Event): void {
    if (!this.primaryBtnHref || this.primaryBtnHref === 'javascript:;') {
      event.preventDefault();
    }
  }

  onSecondaryClick(event: Event): void {
    if (!this.secondaryBtnHref || this.secondaryBtnHref === 'javascript:;') {
      event.preventDefault();
    }
  }
}

@Component({
  selector: 'weui-preview-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="itemClasses">
      <span class="weui-preview__label">{{ label }}</span>
      <span 
        class="weui-preview__value" 
        [class.weui-preview__value_bold]="bold"
      >
        <ng-container *ngIf="!href; else linkTemplate">
          {{ value }}
        </ng-container>
        <ng-template #linkTemplate>
          <a [href]="href" target="_blank">{{ value }}</a>
        </ng-template>
      </span>
    </div>
  `,
  styleUrls: ['./preview-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUIPreviewItemComponent {
  @Input() label: string = '';
  @Input() value: string | number = '';
  @Input() bold = false;
  @Input() href?: string;

  get itemClasses(): string {
    return 'weui-preview__item';
  }
}
