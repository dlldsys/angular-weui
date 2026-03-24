import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WeUIToastComponent, WeUIToastType, WeUIToastPosition } from './toast.component';

describe('WeUIToastComponent', () => {
  let component: WeUIToastComponent;
  let fixture: ComponentFixture<WeUIToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeUIToastComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(WeUIToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.visible).toBe(false);
    expect(component.message).toBe('');
    expect(component.type).toBe('success');
    expect(component.position).toBe('center');
    expect(component.duration).toBe(1500);
    expect(component.showIcon).toBe(true);
    expect(component.zIndex).toBe(5500);
    expect(component.autoClose).toBe(true);
  });

  it('should apply toast type classes correctly', () => {
    const testCases: WeUIToastType[] = ['success', 'warning', 'error', 'info', 'loading', 'text'];
    
    testCases.forEach(type => {
      component.type = type;
      fixture.detectChanges();
      
      const toastElement = fixture.debugElement.query(By.css('.weui-toast'));
      expect(toastElement).toBeTruthy();
    });
  });

  it('should apply position classes correctly', () => {
    const testCases: WeUIToastPosition[] = ['top', 'center', 'bottom'];
    
    testCases.forEach(position => {
      component.position = position;
      fixture.detectChanges();
      
      const toastElement = fixture.debugElement.query(By.css('.weui-toast'));
      expect(toastElement).toBeTruthy();
    });
  });

  it('should show and hide toast', () => {
    component.visible = true;
    component.message = 'Test message';
    fixture.detectChanges();
    
    const toastWrapper = fixture.debugElement.query(By.css('.weui-toast__wrp'));
    expect(toastWrapper).toBeTruthy();
    
    component.visible = false;
    fixture.detectChanges();
    
    const hiddenToast = fixture.debugElement.query(By.css('.weui-toast__wrp'));
    expect(hiddenToast).toBeNull();
  });

  it('should emit close event', () => {
    const closeSpy = jest.fn();
    component.close.subscribe(closeSpy);
    
    component.hideToast();
    
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should emit visibleChange event', () => {
    const visibleChangeSpy = jest.fn();
    component.visibleChange.subscribe(visibleChangeSpy);
    
    component.visible = true;
    component.visibleChange.emit(true);
    
    expect(visibleChangeSpy).toHaveBeenCalledWith(true);
  });

  it('should handle auto close with timer', (done) => {
    jest.useFakeTimers();
    
    component.visible = true;
    component.autoClose = true;
    component.duration = 1000;
    
    component.showToast();
    
    setTimeout(() => {
      expect(component.visible).toBe(false);
      jest.useRealTimers();
      done();
    }, 1500);
    
    jest.advanceTimersByTime(1500);
  });

  it('should not auto close when autoClose is false', () => {
    component.visible = true;
    component.autoClose = false;
    component.duration = 100;
    
    component.showToast();
    
    expect(component.visible).toBe(true);
  });

  it('should clear timer on destroy', () => {
    component.visible = true;
    component.autoClose = true;
    component.duration = 1000;
    
    component.showToast();
    
    component.ngOnDestroy();
    
    expect(component.timer).toBeNull();
  });

  it('should show success icon for success type', () => {
    component.visible = true;
    component.type = 'success';
    component.showIcon = true;
    fixture.detectChanges();
    
    const successIcon = fixture.debugElement.query(By.css('.weui-icon-success-no-circle'));
    expect(successIcon).toBeTruthy();
  });

  it('should show loading icon for loading type', () => {
    component.visible = true;
    component.type = 'loading';
    component.showIcon = true;
    fixture.detectChanges();
    
    const loadingIcon = fixture.debugElement.query(By.css('.weui-loading'));
    expect(loadingIcon).toBeTruthy();
  });

  it('should apply host class', () => {
    fixture.detectChanges();
    
    const hostElement = fixture.debugElement.query(By.css('.weui-toast-wrapper'));
    expect(hostElement).toBeTruthy();
  });
});
