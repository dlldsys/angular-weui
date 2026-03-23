import { NgModule } from '@angular/core';
import { WeUIGalleryComponent } from './src/gallery.component';
import { WeUICloseComponent } from './src/gallery-close.component';

export { WeUIGalleryComponent, WeUICloseComponent };

@NgModule({
  imports: [WeUIGalleryComponent, WeUICloseComponent],
  exports: [WeUIGalleryComponent, WeUICloseComponent]
})
export class WeUIGalleryModule {}
