import { NgModule } from '@angular/core';
import { WeUIStepsComponent, WeUIStepComponent } from './src/steps.component';

export { WeUIStepsComponent, WeUIStepComponent };

@NgModule({
  imports: [WeUIStepsComponent, WeUIStepComponent],
  exports: [WeUIStepsComponent, WeUIStepComponent]
})
export class WeUIStepsModule {}
