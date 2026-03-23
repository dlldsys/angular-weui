import { NgModule } from '@angular/core';
import { WeUIFlexComponent } from './src/flex.component';
import { WeUIFlexItemComponent } from './src/flex-item.component';

export { WeUIFlexComponent, WeUIFlexItemComponent };

@NgModule({
  imports: [WeUIFlexComponent, WeUIFlexItemComponent],
  exports: [WeUIFlexComponent, WeUIFlexItemComponent]
})
export class WeUIFlexModule {}
