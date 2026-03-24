/**
 * Angular WeUI Components - Public API
 * Production-ready Angular WeUI component library
 * Supports tree-shaking and on-demand imports
 * @version 0.1.0-alpha.2
 */

// ============================================================================
// Core Services - Required for all components
// ============================================================================
export { WeUIThemeService, WeUIConfigService } from './projects/core/index';

// ============================================================================
// Theme & Utilities
// ============================================================================
export { WeUITheme, WeUIConfig } from './projects/core/index';

// ============================================================================
// Form Components
// ============================================================================
export { WeUIButtonComponent, WeUIButtonModule, WeUIButtonType, WeUIButtonSize } from './projects/components/button';
export { WeUIPickerComponent, WeUIPickerModule } from './projects/components/picker';
export { WeUICellComponent, WeUICellModule } from './projects/components/cell';

// ============================================================================
// Navigation Components
// ============================================================================
export { WeUITabbarComponent, WeUITabbarModule } from './projects/components/tabbar';
export { WeUINavbarComponent, WeUINavbarModule } from './projects/components/navbar';

// ============================================================================
// Feedback Components
// ============================================================================
export { WeUIToastComponent, WeUIToastModule, WeUIToastService, WeUIToastType, WeUIToastPosition } from './projects/components/toast';
export { WeUIDialogComponent, WeUIDialogModule } from './projects/components/dialog';
export { WeUIProgressComponent, WeUIProgressModule } from './projects/components/progress';
export { WeUIActionsheetComponent, WeUIActionsheetModule, WeUIActionsheetService } from './projects/components/actionsheet';
export { WeUIGalleryComponent, WeUIGalleryModule } from './projects/components/gallery';

// ============================================================================
// Layout Components
// ============================================================================
export { WeUIListComponent, WeUIListModule } from './projects/components/list';
export { WeUIPanelComponent, WeUIPanelModule } from './projects/components/panel';
export { WeUIArticleComponent, WeUIArticleModule } from './projects/components/article';
export { WeUIFlexComponent, WeUIFlexModule } from './projects/components/flex';
export { WeUIGridComponent, WeUIGridModule } from './projects/components/grid';
export { WeUIFooterComponent, WeUIFooterModule } from './projects/components/footer';

// ============================================================================
// Display Components
// ============================================================================
export { WeUIPreviewComponent, WeUIPreviewModule } from './projects/components/preview';
export { WeUIIconComponent, WeUIIconModule, WeUIIconType } from './projects/components/icon';
export { WeUILoadmoreComponent, WeUILoadmoreModule } from './projects/components/loadmore';
export { WeUIStepsComponent, WeUIStepsModule } from './projects/components/steps';
export { WeUIBadgeComponent, WeUIBadgeModule } from './projects/components/badge';

// ============================================================================
// Utility Functions
// ============================================================================
export { hexToRgb, rgbToHex } from './projects/core/src/utils/color.utils';
export { addClass, removeClass, hasClass } from './projects/core/src/utils/dom.utils';

// ============================================================================
// Type Definitions
// ============================================================================

// Toast options interface
export interface WeUIToastOptions {
  message?: string;
  type?: WeUIToastType;
  position?: WeUIToastPosition;
  duration?: number;
  showIcon?: boolean;
  zIndex?: number;
  autoClose?: boolean;
}

// Dialog options interface
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

// Picker options interface
export interface WeUIPickerOptions {
  title?: string;
  items: WeUIPickerItem[];
  selectedIndex?: number[];
  onChange?: (result: WeUIPickerResult) => void;
  onConfirm?: (result: WeUIPickerResult) => void;
  onCancel?: () => void;
}

export interface WeUIPickerItem {
  label: string;
  value?: any;
  children?: WeUIPickerItem[];
}

export interface WeUIPickerResult {
  items: WeUIPickerItem[];
  selectedIndex: number[];
  selectedValue: any[];
}

// Actionsheet options interface
export interface WeUIActionsheetOptions {
  title?: string;
  menus?: WeUIActionsheetMenu[];
  actions?: WeUIActionsheetAction[];
  cancelText?: string;
}

export interface WeUIActionsheetMenu {
  label: string;
  type?: 'default' | 'primary' | 'warn';
  icon?: string;
  onClick?: () => void;
}

export interface WeUIActionsheetAction {
  label: string;
  type?: 'default' | 'primary' | 'warn';
  onClick?: () => void;
}

// Tabbar options interface
export interface WeUITabbarOptions {
  tabs: WeUITabbarTab[];
  activeIndex?: number;
  onChange?: (index: number) => void;
}

export interface WeUITabbarTab {
  label: string;
  icon?: string;
  activeIcon?: string;
  badge?: string | number;
  dot?: boolean;
}

// Navbar options interface
export interface WeUINavbarOptions {
  titles: string[];
  activeIndex?: number;
  onChange?: (index: number) => void;
}

// Progress options interface
export interface WeUIProgressOptions {
  percent?: number;
  showInfo?: boolean;
  status?: 'normal' | 'active' | 'wrong' | 'success';
  transition?: string;
}

// Cell options interface
export interface WeUICellOptions {
  label?: string;
  value?: string;
  isLink?: boolean;
  isArrow?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

// Theme interface
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

// Config interface
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
