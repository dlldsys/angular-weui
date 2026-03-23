import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeUIGalleryComponent } from './gallery.component';

@Component({
  selector: 'weui-close',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="weui-close" (click)="onClick($event)">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    .weui-close {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
  `]
})
export class WeUICloseComponent {
  @Input() weuiClose?: () => void;

  onClick(event: Event): void {
    if (this.weuiClose) {
      this.weuiClose();
    }
  }
}
