import { NgModule } from '@angular/core';
import { WeUIPickerComponent } from './src/picker.component';

export { WeUIPickerComponent } from './src/picker.component';
export type { WeUIPickerColumn, WeUIPickerResult } from './src/picker.component';

@NgModule({
  imports: [WeUIPickerComponent],
  exports: [WeUIPickerComponent]
})
export class WeUIPickerModule {}
