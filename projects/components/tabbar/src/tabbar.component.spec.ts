import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WeUITabbarComponent, WeUITabbarItem } from './tabbar.component';

describe('WeUITabbarComponent', () => {
  let component: WeUITabbarComponent;
  let fixture: ComponentFixture<WeUITabbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeUITabbarComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(WeUITabbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.items).toEqual([]);
    expect(component.activeIndex).toBe(0);
    expect(component.fixed).toBe(true);
    expect(component.zIndex).toBe(99);
    expect(component.border).toBe(true);
  });

  it('should render tabbar with items', () => {
    component.items = [
      { id: '1', text: 'Tab 1', icon: '🔍' },
      { id: '2', text: 'Tab 2', icon: '📱' }
    ] as WeUITabbarItem[];
    fixture.detectChanges();
    
    const tabbar = fixture.debugElement.query(By.css('.weui-tabbar'));
    expect(tabbar).toBeTruthy();
    
    const tabbarItems = fixture.debugElement.queryAll(By.css('.weui-tabbar__item'));
    expect(tabbarItems.length).toBe(2);
  });

  it('should emit change event when tab is clicked', () => {
    const changeSpy = jest.fn();
    component.change.subscribe(changeSpy);
    
    component.items = [
      { id: '1', text: 'Tab 1', icon: '🔍' },
      { id: '2', text: 'Tab 2', icon: '📱' }
    ] as WeUITabbarItem[];
    component.activeIndex = 0;
    fixture.detectChanges();
    
    const tabbarItems = fixture.debugElement.queryAll(By.css('.weui-tabbar__item'));
    tabbarItems[1].nativeElement.click();
    
    expect(changeSpy).toHaveBeenCalled();
    const result = changeSpy.mock.calls[0][0];
    expect(result.index).toBe(1);
    expect(result.item.id).toBe('2');
  });

  it('should emit activeIndexChange event when tab is clicked', () => {
    const activeIndexChangeSpy = jest.fn();
    component.activeIndexChange.subscribe(activeIndexChangeSpy);
    
    component.items = [
      { id: '1', text: 'Tab 1', icon: '🔍' },
      { id: '2', text: 'Tab 2', icon: '📱' }
    ] as WeUITabbarItem[];
    fixture.detectChanges();
    
    const tabbarItems = fixture.debugElement.queryAll(By.css('.weui-tabbar__item'));
    tabbarItems[1].nativeElement.click();
    
    expect(activeIndexChangeSpy).toHaveBeenCalledWith(1);
  });

  it('should not emit change event for disabled tabs', () => {
    const changeSpy = jest.fn();
    component.change.subscribe(changeSpy);
    
    component.items = [
      { id: '1', text: 'Tab 1', icon: '🔍' },
      { id: '2', text: 'Tab 2', icon: '📱', disabled: true }
    ] as WeUITabbarItem[];
    fixture.detectChanges();
    
    const tabbarItems = fixture.debugElement.queryAll(By.css('.weui-tabbar__item'));
    tabbarItems[1].nativeElement.click();
    
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('should display badge when provided', () => {
    component.items = [
      { id: '1', text: 'Tab 1', icon: '🔍', badge: '3' },
      { id: '2', text: 'Tab 2', icon: '📱' }
    ] as WeUITabbarItem[];
    fixture.detectChanges();
    
    const badge = fixture.debugElement.query(By.css('.weui-tabbar__badge'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent).toBe('3');
  });

  it('should apply fixed class when fixed is true', () => {
    component.fixed = true;
    fixture.detectChanges();
    
    const tabbar = fixture.debugElement.query(By.css('.weui-tabbar'));
    expect(tabbar.nativeElement.classList.contains('weui-tabbar--fixed')).toBe(true);
  });

  it('should apply no-border class when border is false', () => {
    component.border = false;
    fixture.detectChanges();
    
    const tabbar = fixture.debugElement.query(By.css('.weui-tabbar'));
    expect(tabbar.nativeElement.classList.contains('weui-tabbar--no-border')).toBe(true);
  });

  it('should set active tab correctly', () => {
    component.items = [
      { id: '1', text: 'Tab 1', icon: '🔍' },
      { id: '2', text: 'Tab 2', icon: '📱' }
    ] as WeUITabbarItem[];
    component.activeIndex = 1;
    fixture.detectChanges();
    
    const tabbarItems = fixture.debugElement.queryAll(By.css('.weui-tabbar__item'));
    expect(tabbarItems[1].nativeElement.classList.contains('weui-bar__item_on')).toBe(true);
  });

  it('should have correct host class', () => {
    fixture.detectChanges();
    
    const hostElement = fixture.debugElement.query(By.css('.weui-tabbar-wrapper'));
    expect(hostElement).toBeTruthy();
  });

  it('should format badge correctly', () => {
    expect(component.formatBadge(5)).toBe('5');
    expect(component.formatBadge(100)).toBe('99+');
    expect(component.formatBadge('new')).toBe('new');
  });

  it('should set active index programmatically', () => {
    component.items = [
      { id: '1', text: 'Tab 1', icon: '🔍' },
      { id: '2', text: 'Tab 2', icon: '📱' }
    ] as WeUITabbarItem[];
    fixture.detectChanges();
    
    component.setActiveIndex(1);
    
    expect(component.activeIndex).toBe(1);
  });

  it('should not set active index out of bounds', () => {
    component.items = [
      { id: '1', text: 'Tab 1', icon: '🔍' },
      { id: '2', text: 'Tab 2', icon: '📱' }
    ] as WeUITabbarItem[];
    fixture.detectChanges();
    
    const initialIndex = component.activeIndex;
    component.setActiveIndex(5);
    
    expect(component.activeIndex).toBe(initialIndex);
  });
});
