import { Component, Input, ViewEncapsulation, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weui-grid-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a [href]="href" [target]="external ? '_blank' : '_self'" class="weui-grid" role="button">
      <div class="weui-grid__icon" *ngIf="icon || src">
        <img *ngIf="src" [src]="src" [alt]="iconAlt" />
        <span *ngIf="!src && icon" class="weui-grid__icon-text">{{ icon }}</span>
      </div>
      <p class="weui-grid__label" *ngIf="label">{{ label }}</p>
      <ng-content></ng-content>
    </a>
  `,
  styleUrls: ['./grid-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUIGridItemComponent {
  @Input() href = 'javascript:;';
  @Input() icon?: string;
  @Input() src?: string;
  @Input() label?: string;
  @Input() iconAlt?: string;
  @Input() external = false;

  constructor() {}
}
