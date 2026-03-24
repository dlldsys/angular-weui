import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WeUIDialogComponent, WeUIDialogType, WeUIDialogSize } from './dialog.component';

describe('WeUIDialogComponent', () => {
  let component: WeUIDialogComponent;
  let fixture: ComponentFixture<WeUIDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeUIDialogComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(WeUIDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.visible).toBe(false);
    expect(component.title).toBe('');
    expect(component.content).toBe('');
    expect(component.type).toBe('default');
    expect(component.size).toBe('normal');
    expect(component.mask).toBe(true);
    expect(component.closable).toBe(false);
    expect(component.showButtons).toBe(true);
    expect(component.showCancelButton).toBe(true);
    expect(component.showConfirmButton).toBe(true);
    expect(component.cancelText).toBe('取消');
    expect(component.confirmText).toBe('确定');
  });

  it('should apply dialog type classes correctly', () => {
    const types: WeUIDialogType[] = ['alert', 'confirm', 'prompt', 'default'];
    
    types.forEach(type => {
      component.type = type;
      fixture.detectChanges();
      
      const dialogElement = fixture.debugElement.query(By.css('.weui-dialog'));
      expect(dialogElement).toBeTruthy();
      expect(dialogElement.nativeElement.classList.contains(`weui-dialog--${type}`)).toBe(true);
    });
  });

  it('should apply dialog size classes correctly', () => {
    const sizes: WeUIDialogSize[] = ['small', 'normal', 'large'];
    
    sizes.forEach(size => {
      component.size = size;
      fixture.detectChanges();
      
      const dialogElement = fixture.debugElement.query(By.css('.weui-dialog'));
      expect(dialogElement).toBeTruthy();
      expect(dialogElement.nativeElement.classList.contains(`weui-dialog--${size}`)).toBe(true);
    });
  });

  it('should emit close event when close button clicked', () => {
    component.closable = true;
    component.visible = true;
    fixture.detectChanges();
    
    const closeButton = fixture.debugElement.query(By.css('.weui-dialog__close'));
    expect(closeButton).toBeTruthy();
    
    const closeSpy = jest.fn();
    component.close.subscribe(closeSpy);
    
    closeButton.nativeElement.click();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should emit cancel event when cancel button clicked', () => {
    component.visible = true;
    component.showCancelButton = true;
    fixture.detectChanges();
    
    const cancelButton = fixture.debugElement.query(By.css('.weui-dialog__btn_default'));
    expect(cancelButton).toBeTruthy();
    
    const cancelSpy = jest.fn();
    component.cancel.subscribe(cancelSpy);
    
    cancelButton.nativeElement.click();
    expect(cancelSpy).toHaveBeenCalled();
  });

  it('should emit confirm event when confirm button clicked', () => {
    component.visible = true;
    component.showConfirmButton = true;
    fixture.detectChanges();
    
    const confirmButton = fixture.debugElement.query(By.css('.weui-dialog__btn_primary'));
    expect(confirmButton).toBeTruthy();
    
    const confirmSpy = jest.fn();
    component.confirm.subscribe(confirmSpy);
    
    confirmButton.nativeElement.click();
    expect(confirmSpy).toHaveBeenCalled();
  });

  it('should handle mask click when maskClosable is true', () => {
    component.visible = true;
    component.maskClosable = true;
    component.mask = true;
    fixture.detectChanges();
    
    const mask = fixture.debugElement.query(By.css('.weui-dialog__mask'));
    expect(mask).toBeTruthy();
    
    const closeSpy = jest.fn();
    component.close.subscribe(closeSpy);
    
    mask.nativeElement.click();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should not emit close on mask click when maskClosable is false', () => {
    component.visible = true;
    component.maskClosable = false;
    component.mask = true;
    fixture.detectChanges();
    
    const mask = fixture.debugElement.query(By.css('.weui-dialog__mask'));
    
    const closeSpy = jest.fn();
    component.close.subscribe(closeSpy);
    
    mask.nativeElement.click();
    expect(closeSpy).not.toHaveBeenCalled();
  });

  it('should open dialog correctly', () => {
    const openSpy = jest.fn();
    component.open.subscribe(openSpy);
    
    component.openDialog();
    fixture.detectChanges();
    
    expect(component.visible).toBe(true);
    expect(openSpy).toHaveBeenCalled();
  });

  it('should close dialog correctly', () => {
    component.visible = true;
    fixture.detectChanges();
    
    component.closeDialog();
    fixture.detectChanges();
    
    expect(component.visible).toBe(false);
  });

  it('should hide buttons when showButtons is false', () => {
    component.visible = true;
    component.showButtons = false;
    fixture.detectChanges();
    
    const buttons = fixture.debugElement.queryAll(By.css('.weui-dialog__btn'));
    expect(buttons.length).toBe(0);
  });

  it('should hide cancel button when showCancelButton is false', () => {
    component.visible = true;
    component.showCancelButton = false;
    fixture.detectChanges();
    
    const cancelButton = fixture.debugElement.query(By.css('.weui-dialog__btn_default'));
    expect(cancelButton).toBeNull();
  });

  it('should hide confirm button when showConfirmButton is false', () => {
    component.visible = true;
    component.showConfirmButton = false;
    fixture.detectChanges();
    
    const confirmButton = fixture.debugElement.query(By.css('.weui-dialog__btn_primary'));
    expect(confirmButton).toBeNull();
  });

  it('should display title and content', () => {
    component.visible = true;
    component.title = 'Test Title';
    component.content = 'Test Content';
    fixture.detectChanges();
    
    const titleElement = fixture.debugElement.query(By.css('.weui-dialog__title'));
    expect(titleElement.nativeElement.textContent).toBe('Test Title');
    
    const contentElement = fixture.debugElement.query(By.css('.weui-dialog__bd'));
    expect(contentElement.nativeElement.textContent).toContain('Test Content');
  });

  it('should apply correct button type classes', () => {
    component.visible = true;
    component.confirmButtonType = 'warn';
    fixture.detectChanges();
    
    const confirmButton = fixture.debugElement.query(By.css('.weui-dialog__btn_primary'));
    expect(confirmButton.nativeElement.classList.contains('weui-dialog__btn_warn')).toBe(true);
  });
});
