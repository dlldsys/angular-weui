import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WeUIButtonComponent, WeUIButtonType, WeUIButtonSize } from './button.component';

describe('WeUIButtonComponent', () => {
  let component: WeUIButtonComponent;
  let fixture: ComponentFixture<WeUIButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeUIButtonComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(WeUIButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default button', () => {
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.nativeElement.classList.contains('weui-button')).toBe(true);
    expect(buttonElement.nativeElement.classList.contains('weui-button--default')).toBe(true);
  });

  it('should apply button type classes correctly', () => {
    const testCases: WeUIButtonType[] = ['primary', 'default', 'warn'];
    
    testCases.forEach(buttonType => {
      component.buttonType = buttonType;
      fixture.detectChanges();
      
      const buttonElement = fixture.debugElement.query(By.css('button'));
      expect(buttonElement.nativeElement.classList.contains(`weui-button--${buttonType}`)).toBe(true);
    });
  });

  it('should apply size classes correctly', () => {
    const testCases: WeUIButtonSize[] = ['small', 'normal', 'large'];
    
    testCases.forEach(size => {
      component.size = size;
      fixture.detectChanges();
      
      const buttonElement = fixture.debugElement.query(By.css('button'));
      if (size === 'normal') {
        expect(buttonElement.nativeElement.classList.contains('weui-button--normal')).toBe(false);
      } else {
        expect(buttonElement.nativeElement.classList.contains(`weui-button--${size}`)).toBe(true);
      }
    });
  });

  it('should handle disabled state', () => {
    component.disabled = true;
    fixture.detectChanges();
    
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBe(true);
    expect(buttonElement.nativeElement.classList.contains('weui-button--disabled')).toBe(true);
  });

  it('should handle loading state', () => {
    component.loading = true;
    fixture.detectChanges();
    
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList.contains('weui-button--loading')).toBe(true);
    
    const loadingIcon = fixture.debugElement.query(By.css('.weui-loading'));
    expect(loadingIcon).toBeTruthy();
  });

  it('should emit click event when clicked', () => {
    const clickSpy = jest.fn();
    component.click.subscribe(clickSpy);
    
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();
    
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should not emit click event when disabled', () => {
    const clickSpy = jest.fn();
    component.click.subscribe(clickSpy);
    component.disabled = true;
    fixture.detectChanges();
    
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();
    
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should not emit click event when loading', () => {
    const clickSpy = jest.fn();
    component.click.subscribe(clickSpy);
    component.loading = true;
    fixture.detectChanges();
    
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();
    
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should apply block modifier', () => {
    component.block = true;
    fixture.detectChanges();
    
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList.contains('weui-button--block')).toBe(true);
  });

  it('should apply plain modifier', () => {
    component.plain = true;
    fixture.detectChanges();
    
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList.contains('weui-button--plain')).toBe(true);
  });

  it('should apply round modifier', () => {
    component.round = true;
    fixture.detectChanges();
    
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList.contains('weui-button--round')).toBe(true);
  });

  it('should apply circle modifier', () => {
    component.circle = true;
    fixture.detectChanges();
    
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList.contains('weui-button--circle')).toBe(true);
  });

  it('should render content correctly', () => {
    fixture.detectChanges();
    
    const textElement = fixture.debugElement.query(By.css('.weui-button__text'));
    expect(textElement.nativeElement.textContent.trim()).toBe('');
  });

  it('should have correct host class', () => {
    const hostElement = fixture.debugElement.query(By.css('.weui-button-wrapper'));
    expect(hostElement).toBeTruthy();
  });
});
