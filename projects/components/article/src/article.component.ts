import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weui-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class WeUIArticleComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() author?: string;
  @Input() time?: string;
  
  @ContentChild('header') headerTemplate!: TemplateRef<any>;
  @ContentChild('content') contentTemplate!: TemplateRef<any>;
  @ContentChild('footer') footerTemplate!: TemplateRef<any>;
}
