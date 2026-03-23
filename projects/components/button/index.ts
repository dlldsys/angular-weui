import { NgModule } from '@angular/core';
import { WeUIButtonComponent } from './src/button.component';

export { WeUIButtonComponent };

@NgModule({
  imports: [WeUIButtonComponent],
  exports: [WeUIButtonComponent]
})
export class WeUIButtonModule {}
