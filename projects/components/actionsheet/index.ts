import { NgModule } from '@angular/core';
import { WeUIActionSheetComponent } from './src/actionsheet.component';
import { WeUIActionSheetService } from './src/actionsheet.service';

export { WeUIActionSheetComponent, WeUIActionSheetService };
export type { WeUIActionSheetItem } from './src/actionsheet.component';

@NgModule({
  imports: [WeUIActionSheetComponent],
  exports: [WeUIActionSheetComponent],
  providers: [WeUIActionSheetService]
})
export class WeUIActionSheetModule {}
