import { NgModule } from '@angular/core';
import { WeUIPanelComponent } from './src/panel.component';

export { WeUIPanelComponent };

@NgModule({
  imports: [WeUIPanelComponent],
  exports: [WeUIPanelComponent]
})
export class WeUIPanelModule {}
