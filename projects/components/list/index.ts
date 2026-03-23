import { NgModule } from '@angular/core';
import { WeUIListComponent, WeUIListItemComponent } from './src/list.component';

export { WeUIListComponent, WeUIListItemComponent };

@NgModule({
  imports: [WeUIListComponent, WeUIListItemComponent],
  exports: [WeUIListComponent, WeUIListItemComponent]
})
export class WeUIListModule {}
