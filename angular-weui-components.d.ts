/**
 * Angular WeUI Components - Type Definitions
 * @version 0.1.0-alpha.2
 */

// Core Services
export { WeUIThemeService, WeUITheme } from './projects/core/src/services/theme.service';
export { WeUIConfigService, WeUIConfig } from './projects/core/src/services/config.service';

// Button Component
export { WeUIButtonComponent, WeUIButtonModule } from './projects/components/button';
export { WeUIButtonType, WeUIButtonSize } from './projects/components/button/src/button.component';

// Cell Component
export { WeUICellComponent, WeUICellModule } from './projects/components/cell';

// Toast Component
export { WeUIToastComponent, WeUIToastModule, WeUIToastService } from './projects/components/toast';
export { WeUIToastType, WeUIToastPosition } from './projects/components/toast/src/toast.component';

// Dialog Component
export { WeUIDialogComponent, WeUIDialogModule } from './projects/components/dialog';
export { WeUIDialogType, WeUIDialogSize } from './projects/components/dialog/src/dialog.component';

// Progress Component
export { WeUIProgressComponent, WeUIProgressModule } from './projects/components/progress';
export { WeUIProgressStatus } from './projects/components/progress/src/progress.component';

// Actionsheet Component
export { WeUIActionsheetComponent, WeUIActionsheetModule, WeUIActionsheetService } from './projects/components/actionsheet';
export { WeUIActionsheetItem } from './projects/components/actionsheet/src/actionsheet.component';

// Picker Component
export { WeUIPickerComponent, WeUIPickerModule } from './projects/components/picker';
export { WeUIPickerColumn, WeUIPickerResult } from './projects/components/picker/src/picker.component';

// Tabbar Component
export { WeUITabbarComponent, WeUITabbarModule } from './projects/components/tabbar';
export { WeUITabbarItem } from './projects/components/tabbar/src/tabbar.component';

// Navbar Component
export { WeUINavbarComponent, WeUINavbarModule } from './projects/components/navbar';

// List Component
export { WeUIListComponent, WeUIListItemComponent, WeUIListModule } from './projects/components/list';

// Panel Component
export { WeUIPanelComponent, WeUIPanelModule } from './projects/components/panel';

// Preview Component
export { WeUIPreviewComponent, WeUIPreviewItemComponent, WeUIPreviewModule } from './projects/components/preview';

// Icon Component
export { WeUIIconComponent, WeUIIconModule } from './projects/components/icon';
export { WeUIIconType } from './projects/components/icon/src/icon.component';

// Loadmore Component
export { WeUILoadmoreComponent, WeUILoadmoreModule } from './projects/components/loadmore';

// Steps Component
export { WeUIStepsComponent, WeUIStepComponent, WeUIStepsModule } from './projects/components/steps';

// Article Component
export { WeUIArticleComponent, WeUIArticleModule } from './projects/components/article';

// Gallery Component
export { WeUIGalleryComponent, WeUICloseComponent, WeUIGalleryModule } from './projects/components/gallery';

// Badge Component
export { WeUIBadgeComponent, WeUIBadgeModule } from './projects/components/badge';

// Flex Component
export { WeUIFlexComponent, WeUIFlexItemComponent, WeUIFlexModule } from './projects/components/flex';

// Grid Component
export { WeUIGridComponent, WeUIGridItemComponent, WeUIGridModule } from './projects/components/grid';

// Footer Component
export { WeUIFooterComponent, WeUIFooterModule } from './projects/components/footer';

// Type definitions for component inputs/outputs

// Button types
export type WeUIButtonType = 'primary' | 'default' | 'warn';
export type WeUIButtonSize = 'small' | 'normal' | 'large';

// Toast types
export type WeUIToastType = 'success' | 'warning' | 'error' | 'info' | 'loading' | 'text';
export type WeUIToastPosition = 'top' | 'center' | 'bottom';

export interface WeUIToastOptions {
  message?: string;
  type?: WeUIToastType;
  position?: WeUIToastPosition;
  duration?: number;
  showIcon?: boolean;
  zIndex?: number;
  autoClose?: boolean;
}

// Dialog types
export type WeUIDialogType = 'alert' | 'confirm' | 'prompt' | 'default';
export type WeUIDialogSize = 'small' | 'normal' | 'large';

export interface WeUIDialogOptions {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmType?: WeUIButtonType;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// Progress types
export type WeUIProgressStatus = 'normal' | 'active' | 'wrong' | 'success';

export interface WeUIProgressOptions {
  percent?: number;
  showInfo?: boolean;
  status?: WeUIProgressStatus;
  transition?: string;
}

// Actionsheet types
export interface WeUIActionsheetOptions {
  title?: string;
  actions: WeUIActionsheetItem[];
  showCancel?: boolean;
  cancelText?: string;
  maskClosable?: boolean;
  zIndex?: number;
}

// Picker types
export interface WeUIPickerOptions {
  title?: string;
  columns: WeUIPickerColumn[][];
  defaultIndexes?: number[];
  onChange?: (result: WeUIPickerResult) => void;
  onConfirm?: (result: WeUIPickerResult) => void;
  onCancel?: () => void;
}

export interface WeUIPickerColumn {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface WeUIPickerResult {
  items: WeUIPickerColumn[];
  values: any[];
  labels: string[];
  indexes: number[];
}

// Tabbar types
export interface WeUITabbarOptions {
  tabs: WeUITabbarItem[];
  activeIndex?: number;
  onChange?: (event: { item: WeUITabbarItem; index: number }) => void;
}

export interface WeUITabbarItem {
  id: string;
  text: string;
  icon?: string;
  activeIcon?: string;
  badge?: string | number;
  disabled?: boolean;
}

// Navbar types
export interface WeUINavbarOptions {
  titles: string[];
  activeIndex?: number;
  onChange?: (index: number) => void;
}

// Cell types
export interface WeUICellOptions {
  label?: string;
  value?: string;
  isLink?: boolean;
  isArrow?: boolean;
  disabled?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

// Icon types
export type WeUIIconType = 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info' 
  | 'loading'
  | 'search'
  | 'close'
  | 'check'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-down'
  | 'plus'
  | 'minus'
  | 'home'
  | 'user'
  | 'settings'
  | 'star'
  | 'heart'
  | 'share'
  | 'download'
  | 'upload'
  | 'edit'
  | 'delete'
  | 'eye'
  | 'eye-off'
  | 'lock'
  | 'unlock';

// Badge types
export type WeUIBadgeShape = 'circle' | 'square' | 'dot';
export type WeUIBadgeStatus = 'default' | 'primary' | 'success' | 'warning' | 'error';

// Gallery types
export interface WeUIGalleryImage {
  src: string;
  alt?: string;
  description?: string;
}

// Theme types
export interface WeUITheme {
  name: string;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  linkColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  infoColor: string;
}

// Config types
export interface WeUIConfig {
  animationDuration: number;
  zIndex: {
    toast: number;
    dialog: number;
    actionsheet: number;
  };
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
}

// Utility exports
export { hexToRgb, rgbToHex } from './projects/core/src/utils/color.utils';
export { addClass, removeClass, hasClass } from './projects/core/src/utils/dom.utils';
