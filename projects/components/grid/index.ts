import { NgModule } from '@angular/core';
import { WeUIGridComponent } from './src/grid.component';
import { WeUIGridItemComponent } from './src/grid-item.component';

export { WeUIGridComponent, WeUIGridItemComponent };

@NgModule({
  imports: [WeUIGridComponent, WeUIGridItemComponent],
  exports: [WeUIGridComponent, WeUIGridItemComponent]
})
export class WeUIGridModule {}
