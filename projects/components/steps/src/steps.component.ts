import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type WeUIStepsDirection = 'horizontal' | 'vertical';
export type WeUIStepsStatus = 'wait' | 'process' | 'finish' | 'error';

@Component({
  selector: 'weui-steps',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="weui-steps" [class.weui-steps--vertical]="direction === 'vertical'">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./steps.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUIStepsComponent {
  @Input() direction: WeUIStepsDirection = 'horizontal';
}

@Component({
  selector: 'weui-step',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="weui-step" [class]="'weui-step--' + status" [class.weui-step--last]="last">
      <div class="weui-step__icon">
        <ng-container *ngIf="!custom">
          <span *ngIf="status === 'wait'" class="weui-step__icon-dot"></span>
          <span *ngIf="status === 'process'" class="weui-step__icon-inner">{{ index + 1 }}</span>
          <span *ngIf="status === 'finish'" class="weui-step__icon-check">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </span>
          <span *ngIf="status === 'error'" class="weui-step__icon-inner">!</span>
        </ng-container>
        <ng-content select="[icon]" *ngIf="custom"></ng-content>
      </div>
      <div class="weui-step__content">
        <div class="weui-step__title">{{ title }}</div>
        <div class="weui-step__desc" *ngIf="description">{{ description }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./steps.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUIStepComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() status: WeUIStepsStatus = 'wait';
  @Input() custom = false;
  @Input() last = false;
  @Input() index = 0;
}
