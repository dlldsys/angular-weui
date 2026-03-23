import { Injectable, signal } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class WeUIConfigService {
  private config = signal<WeUIConfig>(this.getDefaultConfig());

  readonly config$ = this.config.asReadonly();

  private getDefaultConfig(): WeUIConfig {
    return {
      animationDuration: 300,
      zIndex: {
        toast: 1000,
        dialog: 1001,
        actionsheet: 1002
      },
      breakpoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992
      }
    };
  }

  setConfig(config: Partial<WeUIConfig>): void {
    this.config.update(current => ({ ...current, ...config }));
  }

  getConfig(): WeUIConfig {
    return this.config();
  }
}
