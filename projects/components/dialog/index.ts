import { NgModule } from '@angular/core';
import { WeUIDialogComponent } from './src/dialog.component';

export { WeUIDialogComponent };
export type { WeUIDialogType, WeUIDialogSize } from './src/dialog.component';

@NgModule({
  imports: [WeUIDialogComponent],
  exports: [WeUIDialogComponent]
})
export class WeUIDialogModule {}
