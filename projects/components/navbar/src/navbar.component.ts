import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ViewEncapsulation,
  HostBinding,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type WeUINavbarMode = 'default' | 'light' | 'dark';

@Component({
  selector: 'weui-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="weui-navbar" [class]="navbarClasses" [style.z-index]="zIndex">
      <div class="weui-navbar__left">
        <ng-container *ngIf="leftTemplate; else defaultLeft">
          <ng-container [ngTemplateOutlet]="leftTemplate"></ng-container>
        </ng-container>
        <ng-template #defaultLeft>
          <button 
            *ngIf="showBack"
            class="weui-navbar__back"
            (click)="handleBack()"
            aria-label="返回"
          >
            <i class="weui-navbar__back-icon"></i>
            <span *ngIf="backText" class="weui-navbar__back-text">{{ backText }}</span>
          </button>
        </ng-template>
      </div>
      
      <div class="weui-navbar__title">
        <ng-container *ngIf="titleTemplate; else defaultTitle">
          <ng-container [ngTemplateOutlet]="titleTemplate"></ng-container>
        </ng-container>
        <ng-template #defaultTitle>
          <span class="weui-navbar__title-text">{{ title }}</span>
        </ng-template>
      </div>
      
      <div class="weui-navbar__right">
        <ng-container *ngIf="rightTemplate; else defaultRight">
          <ng-container [ngTemplateOutlet]="rightTemplate"></ng-container>
        </ng-container>
        <ng-template #defaultRight>
          <ng-content select="[weui-navbar-right]"></ng-content>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeUINavbarComponent {
  @Input() title = '';
  @Input() mode: WeUINavbarMode = 'default';
  @Input() showBack = false;
  @Input() backText = '返回';
  @Input() fixed = false;
  @Input() zIndex = 100;
  @Input() border = true;

  @Output() back = new EventEmitter<void>();

  @ContentChild('left') leftTemplate!: TemplateRef<any>;
  @ContentChild('title') titleTemplate!: TemplateRef<any>;
  @ContentChild('right') rightTemplate!: TemplateRef<any>;

  @HostBinding('class.weui-navbar-wrapper') hostClass = true;

  get navbarClasses(): string {
    const classes = ['weui-navbar'];
    
    if (this.mode !== 'default') {
      classes.push(`weui-navbar--${this.mode}`);
    }
    
    if (this.fixed) {
      classes.push('weui-navbar--fixed');
    }
    
    if (!this.border) {
      classes.push('weui-navbar--no-border');
    }
    
    return classes.join(' ');
  }

  handleBack(): void {
    this.back.emit();
  }
}
