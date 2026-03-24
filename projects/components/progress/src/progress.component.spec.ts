import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WeUIProgressComponent, WeUIProgressStatus } from './progress.component';

describe('WeUIProgressComponent', () => {
  let component: WeUIProgressComponent;
  let fixture: ComponentFixture<WeUIProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeUIProgressComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(WeUIProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.value).toBe(0);
    expect(component.max).toBe(100);
    expect(component.size).toBe('normal');
    expect(component.showText).toBe(true);
    expect(component.status).toBe('normal');
    expect(component.indeterminate).toBe(false);
  });

  it('should calculate percentage correctly', () => {
    component.value = 50;
    component.max = 100;
    component.ngOnInit();
    
    expect(component.percentage).toBe(50);
  });

  it('should clamp percentage between 0 and 100', () => {
    component.value = 150;
    component.max = 100;
    component.ngOnInit();
    
    expect(component.percentage).toBe(100);
    
    component.value = -10;
    component.ngOnInit();
    
    expect(component.percentage).toBe(0);
  });

  it('should apply status class correctly', () => {
    const statuses: WeUIProgressStatus[] = ['normal', 'active', 'wrong', 'success'];
    
    statuses.forEach(status => {
      component.status = status;
      component.ngOnChanges({});
      fixture.detectChanges();
      
      const progressElement = fixture.debugElement.query(By.css('.weui-progress'));
      expect(progressElement).toBeTruthy();
      expect(progressElement.nativeElement.classList.contains(`weui-progress--${status}`)).toBe(true);
    });
  });

  it('should apply size class correctly', () => {
    component.size = 'small';
    component.ngOnChanges({});
    fixture.detectChanges();
    
    const progressElement = fixture.debugElement.query(By.css('.weui-progress'));
    expect(progressElement.nativeElement.classList.contains('weui-progress--small')).toBe(true);
    
    component.size = 'large';
    component.ngOnChanges({});
    fixture.detectChanges();
    
    expect(progressElement.nativeElement.classList.contains('weui-progress--large')).toBe(true);
  });

  it('should handle indeterminate state', () => {
    component.indeterminate = true;
    component.ngOnChanges({});
    fixture.detectChanges();
    
    const progressElement = fixture.debugElement.query(By.css('.weui-progress'));
    expect(progressElement.nativeElement.classList.contains('weui-progress--indeterminate')).toBe(true);
  });

  it('should display text correctly', () => {
    component.value = 75;
    component.max = 100;
    component.ngOnInit();
    fixture.detectChanges();
    
    expect(component.displayText).toBe('75%');
  });

  it('should return empty string for indeterminate progress', () => {
    component.indeterminate = true;
    component.ngOnInit();
    
    expect(component.displayText).toBe('');
  });

  it('should return check mark for success status', () => {
    component.status = 'success';
    component.ngOnChanges({});
    
    expect(component.displayText).toBe('✓');
  });

  it('should return X mark for error/wrong status', () => {
    component.status = 'error';
    component.ngOnChanges({});
    
    expect(component.displayText).toBe('✕');
  });

  it('should respond to input changes', () => {
    component.value = 25;
    component.ngOnChanges({ value: { currentValue: 25, previousValue: 0, firstChange: false } as any });
    fixture.detectChanges();
    
    expect(component.percentage).toBe(25);
  });
});
