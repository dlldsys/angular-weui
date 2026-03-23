import { NgModule } from '@angular/core';
import { WeUIPreviewComponent, WeUIPreviewItemComponent } from './src/preview.component';

export { WeUIPreviewComponent, WeUIPreviewItemComponent };

@NgModule({
  imports: [WeUIPreviewComponent, WeUIPreviewItemComponent],
  exports: [WeUIPreviewComponent, WeUIPreviewItemComponent]
})
export class WeUIPreviewModule {}
