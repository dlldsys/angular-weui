import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ViewEncapsulation,
  HostBinding,
  ChangeDetectionStrategy,
  forwardRef,
  AfterViewInit,
  ElementRef,
  Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type WeUIInputType = 'text' | 'password' | 'number' | 'tel' | 'email' | 'url' | 'search';
export type WeUIInputSize = 'small' | 'normal' | 'large';
export type WeUIInputStatus = 'default' | 'success' | 'warning' | 'error';

@Component({
  selector: 'weui-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="weui-input-wrapper" [class]="wrapperClasses">
      <label *ngIf="label" class="weui-input__label" [for]="inputId">{{ label }}</label>
      
      <div class="weui-input__container">
        <input
          #input
          [id]="inputId"
          [type]="type"
          [class]="inputClasses"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readonly]="readonly"
          [value]="value"
          [attr.maxlength]="maxlength"
          [attr.minlength]="minlength"
          [min]="min"
          [max]="max"
          [step]="step"
          [pattern]="pattern"
          [autocomplete]="autocomplete"
          [autofocus]="autofocus"
          (input)="handleInput($event)"
          (blur)="handleBlur()"
          (focus)="handleFocus()"
          (change)="handleChange($event)"
        />
        
        <div class="weui-input__suffix" *ngIf="showSuffix">
          <i *ngIf="clearable && value && !disabled && !readonly" 
             class="weui-input__clear" 
             (click)="handleClear($event)"></i>
          <i *ngIf="loading" class="weui-loading weui-input__loading"></i>
          <ng-content select="[weui-input-suffix]"></ng-content>
        </div>
      </div>
      
      <div *ngIf="helpText || errorMessage" class="weui-input__help">
        <span *ngIf="status === 'error' && errorMessage" class="weui-input__error">{{ errorMessage }}</span>
        <span *ngIf="helpText && status !== 'error'" class="weui-input__help-text">{{ helpText }}</span>
      </div>
    </div>
  `,
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WeUIInputComponent),
      multi: true
    }
  ]
})
export class WeUIInputComponent implements ControlValueAccessor, AfterViewInit {
  @Input() type: WeUIInputType = 'text';
  @Input() size: WeUIInputSize = 'normal';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() clearable = false;
  @Input() loading = false;
  @Input() maxlength: number | null = null;
  @Input() minlength: number | null = null;
  @Input() min: number | string | null = null;
  @Input() max: number | string | null = null;
  @Input() step: number | string | null = null;
  @Input() pattern: string | null = null;
  @Input() autocomplete: string | null = null;
  @Input() autofocus = false;
  @Input() helpText = '';
  @Input() errorMessage = '';
  @Input() status: WeUIInputStatus = 'default';

  @Output() input = new EventEmitter<Event>();
  @Output() inputBlur = new EventEmitter<FocusEvent>();
  @Output() inputFocus = new EventEmitter<FocusEvent>();
  @Output() change = new EventEmitter<Event>();
  @Output() clear = new EventEmitter<void>();

  @HostBinding('class.weui-input-component') hostClass = true;

  value: string = '';
  inputId = `weui-input-${Math.random().toString(36).substr(2, 9)}`;
  focused = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    if (this.autofocus) {
      this.renderer.selectRootElement(this.elementRef.nativeElement).querySelector('input')?.focus();
    }
  }

  get wrapperClasses(): string {
    const classes = ['weui-input-wrapper'];
    
    if (this.size !== 'normal') {
      classes.push(`weui-input-wrapper--${this.size}`);
    }
    
    if (this.disabled) {
      classes.push('weui-input-wrapper--disabled');
    }
    
    if (this.focused) {
      classes.push('weui-input-wrapper--focused');
    }
    
    if (this.status !== 'default') {
      classes.push(`weui-input-wrapper--${this.status}`);
    }
    
    return classes.join(' ');
  }

  get inputClasses(): string {
    const classes = ['weui-input'];
    
    if (this.size !== 'normal') {
      classes.push(`weui-input--${this.size}`);
    }
    
    if (this.clearable) {
      classes.push('weui-input--clearable');
    }
    
    return classes.join(' ');
  }

  get showSuffix(): boolean {
    return this.clearable || this.loading || true; // true for ng-content
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.input.emit(event);
  }

  handleBlur(): void {
    this.focused = false;
    this.onTouched();
    this.inputBlur.emit();
  }

  handleFocus(): void {
    this.focused = true;
    this.inputFocus.emit();
  }

  handleChange(event: Event): void {
    this.change.emit(event);
  }

  handleClear(event: MouseEvent): void {
    event.preventDefault();
    this.value = '';
    this.onChange('');
    this.clear.emit();
    
    // 重新聚焦输入框
    const inputElement = this.elementRef.nativeElement.querySelector('input');
    if (inputElement) {
      inputElement.focus();
    }
  }

  // ControlValueAccessor 接口实现
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  focus(): void {
    const inputElement = this.elementRef.nativeElement.querySelector('input');
    if (inputElement) {
      inputElement.focus();
    }
  }

  blur(): void {
    const inputElement = this.elementRef.nativeElement.querySelector('input');
    if (inputElement) {
      inputElement.blur();
    }
  }
}
