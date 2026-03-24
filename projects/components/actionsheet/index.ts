import { NgModule } from '@angular/core';
import { WeUIActionsheetComponent } from './src/actionsheet.component';
import { WeUIActionsheetService } from './src/actionsheet.service';

export { WeUIActionsheetComponent, WeUIActionsheetService };
export type { WeUIActionsheetItem } from './src/actionsheet.component';

@NgModule({
  imports: [WeUIActionsheetComponent],
  exports: [WeUIActionsheetComponent],
  providers: [WeUIActionsheetService]
})
export class WeUIActionsheetModule {}

// Backward compatibility alias
export { WeUIActionsheetComponent as WeUIActionSheetComponent } from './src/actionsheet.component';
export { WeUIActionsheetService as WeUIActionSheetService } from './src/actionsheet.service';
export { WeUIActionsheetModule as WeUIActionSheetModule };
