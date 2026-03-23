import { NgModule } from '@angular/core';
import { WeUIToastComponent } from './src/toast.component';
import { WeUIToastService } from './src/toast.service';

export { WeUIToastComponent, WeUIToastService };
export type { WeUIToastType, WeUIToastPosition } from './src/toast.component';

@NgModule({
  imports: [WeUIToastComponent],
  exports: [WeUIToastComponent],
  providers: [WeUIToastService]
})
export class WeUIToastModule {}
