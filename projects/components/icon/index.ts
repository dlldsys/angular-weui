import { NgModule } from '@angular/core';
import { WeUIIconComponent } from './src/icon.component';

export { WeUIIconComponent };
export type { WeUIIconType } from './src/icon.component';

@NgModule({
  imports: [WeUIIconComponent],
  exports: [WeUIIconComponent],
})
export class WeUIIconModule {}
