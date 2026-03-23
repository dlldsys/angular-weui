import { Component } from '@angular/core';
import { DemoComponent } from './demo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DemoComponent],
  template: '<app-demo></app-demo>',
  styles: []
})
export class AppComponent {
  title = 'angular-weui';
}
