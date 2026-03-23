import { NgModule } from '@angular/core';
import { WeUIInputComponent } from './src/input.component';

export { WeUIInputComponent };
export type { WeUIInputType, WeUIInputSize, WeUIInputStatus } from './src/input.component';

@NgModule({
  imports: [WeUIInputComponent],
  exports: [WeUIInputComponent]
})
export class WeUIFormModule {}
