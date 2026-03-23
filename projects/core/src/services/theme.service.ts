import { Injectable, signal } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class WeUIThemeService {
  private currentTheme = signal<WeUITheme>(this.getDefaultTheme());

  readonly theme = this.currentTheme.asReadonly();

  private getDefaultTheme(): WeUITheme {
    return {
      name: 'default',
      primaryColor: '#07C160',
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
      borderColor: '#E5E5E5',
      linkColor: '#576B95',
      successColor: '#07C160',
      warningColor: '#FFB800',
      errorColor: '#FA5151',
      infoColor: '#10AEFF'
    };
  }

  private getDarkTheme(): WeUITheme {
    return {
      name: 'dark',
      primaryColor: '#07C160',
      backgroundColor: '#1F1F1F',
      textColor: '#FFFFFF',
      borderColor: '#373737',
      linkColor: '#7AAFE8',
      successColor: '#07C160',
      warningColor: '#FFB800',
      errorColor: '#FA5151',
      infoColor: '#10AEFF'
    };
  }

  setTheme(theme: 'default' | 'dark' | WeUITheme): void {
    if (theme === 'default') {
      this.currentTheme.set(this.getDefaultTheme());
    } else if (theme === 'dark') {
      this.currentTheme.set(this.getDarkTheme());
    } else {
      this.currentTheme.set(theme);
    }
    
    this.updateCSSVariables();
  }

  private updateCSSVariables(): void {
    const root = document.documentElement;
    const theme = this.currentTheme();
    
    root.style.setProperty('--weui-primary-color', theme.primaryColor);
    root.style.setProperty('--weui-bg-color', theme.backgroundColor);
    root.style.setProperty('--weui-text-color', theme.textColor);
    root.style.setProperty('--weui-border-color', theme.borderColor);
    root.style.setProperty('--weui-link-color', theme.linkColor);
    root.style.setProperty('--weui-success-color', theme.successColor);
    root.style.setProperty('--weui-warning-color', theme.warningColor);
    root.style.setProperty('--weui-error-color', theme.errorColor);
    root.style.setProperty('--weui-info-color', theme.infoColor);
  }
}
