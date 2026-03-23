import { NgModule } from '@angular/core';
import { WeUICellComponent } from './src/cell.component';

export { WeUICellComponent };

@NgModule({
  imports: [WeUICellComponent],
  exports: [WeUICellComponent]
})
export class WeUICellModule {}
