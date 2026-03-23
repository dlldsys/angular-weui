import { NgModule } from '@angular/core';
import { WeUITabbarComponent } from './src/tabbar.component';

export { WeUITabbarComponent };
export type { WeUITabbarItem } from './src/tabbar.component';

@NgModule({
  imports: [WeUITabbarComponent],
  exports: [WeUITabbarComponent]
})
export class WeUITabbarModule {}
