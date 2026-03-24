/**
 * Angular WeUI Components - Module Export
 * Provides unified module import for all components
 * Usage: import { WeUIModule } from 'angular-weui-components';
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ============================================================================
// Import all standalone components
// ============================================================================
import { WeUIButtonComponent } from './button';
import { WeUICellComponent } from './cell';
import { WeUIToastComponent, WeUIToastService } from './toast';
import { WeUIDialogComponent } from './dialog';
import { WeUIProgressComponent } from './progress';
import { WeUIActionsheetComponent, WeUIActionsheetService } from './actionsheet';
import { WeUIPickerComponent } from './picker';
import { WeUITabbarComponent } from './tabbar';
import { WeUINavbarComponent } from './navbar';
import { WeUIListComponent, WeUIListItemComponent } from './list';
import { WeUIPanelComponent } from './panel';
import { WeUIPreviewComponent, WeUIPreviewItemComponent } from './preview';
import { WeUIIconComponent } from './icon';
import { WeUILoadmoreComponent } from './loadmore';
import { WeUIStepsComponent, WeUIStepComponent } from './steps';
import { WeUIArticleComponent } from './article';
import { WeUIGalleryComponent, WeUICloseComponent } from './gallery';
import { WeUIBadgeComponent } from './badge';
import { WeUIFlexComponent, WeUIFlexItemComponent } from './flex';
import { WeUIGridComponent, WeUIGridItemComponent } from './grid';
import { WeUIFooterComponent } from './footer';

// ============================================================================
// Import all modules
// ============================================================================
import { WeUIButtonModule } from './button';
import { WeUICellModule } from './cell';
import { WeUIToastModule } from './toast';
import { WeUIDialogModule } from './dialog';
import { WeUIProgressModule } from './progress';
import { WeUIActionsheetModule } from './actionsheet';
import { WeUIPickerModule } from './picker';
import { WeUITabbarModule } from './tabbar';
import { WeUINavbarModule } from './navbar';
import { WeUIListModule } from './list';
import { WeUIPanelModule } from './panel';
import { WeUIPreviewModule } from './preview';
import { WeUIIconModule } from './icon';
import { WeUILoadmoreModule } from './loadmore';
import { WeUIStepsModule } from './steps';
import { WeUIArticleModule } from './article';
import { WeUIGalleryModule } from './gallery';
import { WeUIBadgeModule } from './badge';
import { WeUIFlexModule } from './flex';
import { WeUIGridModule } from './grid';
import { WeUIFooterModule } from './footer';

// ============================================================================
// Component names for template usage
// ============================================================================
export const COMPONENT_NAMES = {
  // Form Components
  BUTTON: 'weui-button',
  CELL: 'weui-cell',
  PICKER: 'weui-picker',

  // Navigation Components
  TABBAR: 'weui-tabbar',
  NAVBAR: 'weui-navbar',

  // Feedback Components
  TOAST: 'weui-toast',
  DIALOG: 'weui-dialog',
  PROGRESS: 'weui-progress',
  ACTIONSHEET: 'weui-actionsheet',
  GALLERY: 'weui-gallery',

  // Layout Components
  LIST: 'weui-list',
  PANEL: 'weui-panel',
  ARTICLE: 'weui-article',
  FLEX: 'weui-flex',
  FLEX_ITEM: 'weui-flex-item',
  GRID: 'weui-grid',
  GRID_ITEM: 'weui-grid-item',
  FOOTER: 'weui-footer',

  // Display Components
  PREVIEW: 'weui-preview',
  ICON: 'weui-icon',
  LOADMORE: 'weui-loadmore',
  STEPS: 'weui-steps',
  STEP: 'weui-step',
  BADGE: 'weui-badge'
} as const;

// ============================================================================
// WeUI Module for NgModule usage
// ============================================================================
@NgModule({
  imports: [
    CommonModule,
    // Standalone components that need CommonModule
  ],
  declarations: [],
  exports: [
    // Standalone components
    WeUIButtonComponent,
    WeUICellComponent,
    WeUIToastComponent,
    WeUIDialogComponent,
    WeUIProgressComponent,
    WeUIActionsheetComponent,
    WeUIPickerComponent,
    WeUITabbarComponent,
    WeUINavbarComponent,
    WeUIListComponent,
    WeUIListItemComponent,
    WeUIPanelComponent,
    WeUIPreviewComponent,
    WeUIPreviewItemComponent,
    WeUIIconComponent,
    WeUILoadmoreComponent,
    WeUIStepsComponent,
    WeUIStepComponent,
    WeUIArticleComponent,
    WeUIGalleryComponent,
    WeUICloseComponent,
    WeUIBadgeComponent,
    WeUIFlexComponent,
    WeUIFlexItemComponent,
    WeUIGridComponent,
    WeUIGridItemComponent,
    WeUIFooterComponent
  ],
  providers: [
    WeUIToastService,
    WeUIActionsheetService
  ]
})
export class WeUIModule {
  /**
   * Use this method to configure the module with forRoot pattern
   * For future configuration options
   */
  static forRoot() {
    return {
      ngModule: WeUIModule,
      providers: [
        WeUIToastService,
        WeUIActionsheetService
      ]
    };
  }
}

// ============================================================================
// Re-export all components and modules
// ============================================================================
export {
  // Button
  WeUIButtonComponent,
  WeUIButtonModule,

  // Cell
  WeUICellComponent,
  WeUICellModule,

  // Toast
  WeUIToastComponent,
  WeUIToastModule,
  WeUIToastService,

  // Dialog
  WeUIDialogComponent,
  WeUIDialogModule,

  // Progress
  WeUIProgressComponent,
  WeUIProgressModule,

  // Actionsheet
  WeUIActionsheetComponent,
  WeUIActionsheetModule,
  WeUIActionsheetService,

  // Picker
  WeUIPickerComponent,
  WeUIPickerModule,

  // Tabbar
  WeUITabbarComponent,
  WeUITabbarModule,

  // Navbar
  WeUINavbarComponent,
  WeUINavbarModule,

  // List
  WeUIListComponent,
  WeUIListItemComponent,
  WeUIListModule,

  // Panel
  WeUIPanelComponent,
  WeUIPanelModule,

  // Preview
  WeUIPreviewComponent,
  WeUIPreviewItemComponent,
  WeUIPreviewModule,

  // Icon
  WeUIIconComponent,
  WeUIIconModule,

  // Loadmore
  WeUILoadmoreComponent,
  WeUILoadmoreModule,

  // Steps
  WeUIStepsComponent,
  WeUIStepComponent,
  WeUIStepsModule,

  // Article
  WeUIArticleComponent,
  WeUIArticleModule,

  // Gallery
  WeUIGalleryComponent,
  WeUICloseComponent,
  WeUIGalleryModule,

  // Badge
  WeUIBadgeComponent,
  WeUIBadgeModule,

  // Flex
  WeUIFlexComponent,
  WeUIFlexItemComponent,
  WeUIFlexModule,

  // Grid
  WeUIGridComponent,
  WeUIGridItemComponent,
  WeUIGridModule,

  // Footer
  WeUIFooterComponent,
  WeUIFooterModule
} from './index';
