import { NgModule } from '@angular/core';
import { WeUINavbarComponent } from './src/navbar.component';

export { WeUINavbarComponent };
export type { WeUINavbarMode } from './src/navbar.component';

@NgModule({
  imports: [WeUINavbarComponent],
  exports: [WeUINavbarComponent]
})
export class WeUINavbarModule {}
