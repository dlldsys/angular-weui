import { Component, Input, ViewEncapsulation, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weui-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer [ngClass]="footerClasses">
      <div class="weui-footer__text" *ngIf="text">
        {{ text }}
      </div>
      <div class="weui-footer__links" *ngIf="links.length > 0">
        <a 
          *ngFor="let link of links; let last = last" 
          [href]="link.href"
          [target]="link.external ? '_blank' : '_self'"
          class="weui-footer__link"
          (click)="onLinkClick(link, $event)"
        >
          {{ link.text }}
          <span *ngIf="!last" class="weui-footer__split">|</span>
        </a>
      </div>
      <ng-content></ng-content>
    </footer>
  `,
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUIFooterComponent {
  @Input() text?: string;
  @Input() links: Array<{ text: string; href: string; external?: boolean }> = [];
  @Input() fixed = false;

  @HostBinding('class.weui-footer-wrapper') hostClass = true;

  get footerClasses(): string {
    const classes = ['weui-footer'];
    
    if (this.fixed) {
      classes.push('weui-footer_fixed');
    }
    
    return classes.join(' ');
  }

  onLinkClick(link: { text: string; href: string; external?: boolean }, event: Event): void {
    if (!link.href || link.href === '#') {
      event.preventDefault();
    }
  }
}
