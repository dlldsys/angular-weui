import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WeUIActionsheetComponent, WeUIActionsheetItem } from './actionsheet.component';

describe('WeUIActionsheetComponent', () => {
  let component: WeUIActionsheetComponent;
  let fixture: ComponentFixture<WeUIActionsheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeUIActionsheetComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(WeUIActionsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.visible).toBe(false);
    expect(component.actions).toEqual([]);
    expect(component.title).toBe('');
    expect(component.showCancel).toBe(true);
    expect(component.cancelText).toBe('取消');
    expect(component.mask).toBe(true);
    expect(component.maskClosable).toBe(true);
    expect(component.zIndex).toBe(1000);
    expect(component.lockScroll).toBe(true);
  });

  it('should show actionsheet when visible is true', () => {
    component.visible = true;
    fixture.detectChanges();
    
    const actionsheet = fixture.debugElement.query(By.css('.weui-actionsheet'));
    expect(actionsheet).toBeTruthy();
  });

  it('should hide actionsheet when visible is false', () => {
    component.visible = false;
    fixture.detectChanges();
    
    const actionsheet = fixture.debugElement.query(By.css('.weui-actionsheet'));
    expect(actionsheet).toBeFalsy();
  });

  it('should display actions correctly', () => {
    component.visible = true;
    component.actions = [
      { name: 'Action 1', type: 'default' },
      { name: 'Action 2', type: 'warn' }
    ] as WeUIActionsheetItem[];
    fixture.detectChanges();
    
    const actionCells = fixture.debugElement.queryAll(By.css('.weui-actionsheet__cell'));
    expect(actionCells.length).toBe(2);
    expect(actionCells[0].nativeElement.textContent).toContain('Action 1');
    expect(actionCells[1].nativeElement.textContent).toContain('Action 2');
  });

  it('should display title when provided', () => {
    component.visible = true;
    component.title = 'Test Title';
    fixture.detectChanges();
    
    const title = fixture.debugElement.query(By.css('.weui-actionsheet__title'));
    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent).toContain('Test Title');
  });

  it('should display cancel button when showCancel is true', () => {
    component.visible = true;
    component.showCancel = true;
    fixture.detectChanges();
    
    const cancelButton = fixture.debugElement.query(By.css('.weui-actionsheet__cell--cancel'));
    expect(cancelButton).toBeTruthy();
  });

  it('should hide cancel button when showCancel is false', () => {
    component.visible = true;
    component.showCancel = false;
    fixture.detectChanges();
    
    const cancelButton = fixture.debugElement.query(By.css('.weui-actionsheet__cell--cancel'));
    expect(cancelButton).toBeFalsy();
  });

  it('should emit select event when action is clicked', () => {
    const selectSpy = jest.fn();
    component.select.subscribe(selectSpy);
    
    component.visible = true;
    component.actions = [
      { name: 'Test Action', type: 'default' }
    ] as WeUIActionsheetItem[];
    fixture.detectChanges();
    
    const actionCell = fixture.debugElement.query(By.css('.weui-actionsheet__cell'));
    actionCell.nativeElement.click();
    
    expect(selectSpy).toHaveBeenCalled();
    const result = selectSpy.mock.calls[0][0];
    expect(result.item.name).toBe('Test Action');
  });

  it('should emit cancel event when cancel is clicked', () => {
    const cancelSpy = jest.fn();
    component.cancel.subscribe(cancelSpy);
    
    component.visible = true;
    component.showCancel = true;
    fixture.detectChanges();
    
    const cancelButton = fixture.debugElement.query(By.css('.weui-actionsheet__cell--cancel'));
    cancelButton.nativeElement.click();
    
    expect(cancelSpy).toHaveBeenCalled();
  });

  it('should not emit select for disabled actions', () => {
    const selectSpy = jest.fn();
    component.select.subscribe(selectSpy);
    
    component.visible = true;
    component.actions = [
      { name: 'Disabled Action', type: 'disabled' }
    ] as WeUIActionsheetItem[];
    fixture.detectChanges();
    
    const actionCell = fixture.debugElement.query(By.css('.weui-actionsheet__cell--disabled'));
    actionCell.nativeElement.click();
    
    expect(selectSpy).not.toHaveBeenCalled();
  });

  it('should apply warn class for warn type actions', () => {
    component.visible = true;
    component.actions = [
      { name: 'Warn Action', type: 'warn' }
    ] as WeUIActionsheetItem[];
    fixture.detectChanges();
    
    const actionCell = fixture.debugElement.query(By.css('.weui-actionsheet__cell--warn'));
    expect(actionCell).toBeTruthy();
  });

  it('should show and hide methods work correctly', () => {
    component.show();
    fixture.detectChanges();
    
    expect(component.visible).toBe(true);
    
    component.hide();
    fixture.detectChanges();
    
    expect(component.visible).toBe(false);
  });

  it('should have correct host class', () => {
    fixture.detectChanges();
    
    const hostElement = fixture.debugElement.query(By.css('.weui-actionsheet-wrapper'));
    expect(hostElement).toBeTruthy();
  });

  it('should handle mask click when maskClosable is true', () => {
    const cancelSpy = jest.fn();
    component.cancel.subscribe(cancelSpy);
    
    component.visible = true;
    component.maskClosable = true;
    fixture.detectChanges();
    
    const mask = fixture.debugElement.query(By.css('.weui-mask'));
    mask.nativeElement.click();
    
    expect(cancelSpy).toHaveBeenCalled();
  });
});
