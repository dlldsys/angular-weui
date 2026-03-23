import { NgModule } from '@angular/core';
import { WeUIBadgeComponent } from './src/badge.component';

export { WeUIBadgeComponent };

@NgModule({
  imports: [WeUIBadgeComponent],
  exports: [WeUIBadgeComponent]
})
export class WeUIBadgeModule {}
