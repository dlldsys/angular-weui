import { NgModule } from '@angular/core';
import { WeUIProgressComponent } from './src/progress.component';

export { WeUIProgressComponent };
export type { WeUIProgressStatus } from './src/progress.component';

@NgModule({
  imports: [WeUIProgressComponent],
  exports: [WeUIProgressComponent],
})
export class WeUIProgressModule {}
