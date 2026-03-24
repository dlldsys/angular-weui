import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WeUIBadgeComponent } from './badge.component';

describe('WeUIBadgeComponent', () => {
  let component: WeUIBadgeComponent;
  let fixture: ComponentFixture<WeUIBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeUIBadgeComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(WeUIBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.value).toBe('');
    expect(component.max).toBe(99);
    expect(component.shape).toBe('circle');
    expect(component.status).toBe('default');
    expect(component.dot).toBe(false);
  });

  it('should render badge with value', () => {
    component.value = '5';
    fixture.detectChanges();
    
    const badge = fixture.debugElement.query(By.css('.weui-badge'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent).toBe('5');
  });

  it('should apply max value when value exceeds max', () => {
    component.value = '100';
    component.max = 99;
    fixture.detectChanges();
    
    const badge = fixture.debugElement.query(By.css('.weui-badge'));
    expect(badge.nativeElement.textContent).toBe('99+');
  });

  it('should apply circle shape by default', () => {
    component.value = '5';
    fixture.detectChanges();
    
    const badge = fixture.debugElement.query(By.css('.weui-badge'));
    expect(badge.nativeElement.classList.contains('weui-badge--circle')).toBe(true);
  });

  it('should apply square shape when specified', () => {
    component.value = '5';
    component.shape = 'square';
    fixture.detectChanges();
    
    const badge = fixture.debugElement.query(By.css('.weui-badge'));
    expect(badge.nativeElement.classList.contains('weui-badge--square')).toBe(true);
  });

  it('should apply dot shape when dot is true', () => {
    component.dot = true;
    fixture.detectChanges();
    
    const badge = fixture.debugElement.query(By.css('.weui-badge'));
    expect(badge.nativeElement.classList.contains('weui-badge--dot')).toBe(true);
  });

  it('should apply status class correctly', () => {
    component.value = '5';
    component.status = 'warning';
    fixture.detectChanges();
    
    const badge = fixture.debugElement.query(By.css('.weui-badge'));
    expect(badge.nativeElement.classList.contains('weui-badge--warning')).toBe(true);
  });

  it('should apply primary status', () => {
    component.value = '5';
    component.status = 'primary';
    fixture.detectChanges();
    
    const badge = fixture.debugElement.query(By.css('.weui-badge'));
    expect(badge.nativeElement.classList.contains('weui-badge--primary')).toBe(true);
  });

  it('should apply success status', () => {
    component.value = '5';
    component.status = 'success';
    fixture.detectChanges();
    
    const badge = fixture.debugElement.query(By.css('.weui-badge'));
    expect(badge.nativeElement.classList.contains('weui-badge--success')).toBe(true);
  });

  it('should apply error status', () => {
    component.value = '5';
    component.status = 'error';
    fixture.detectChanges();
    
    const badge = fixture.debugElement.query(By.css('.weui-badge'));
    expect(badge.nativeElement.classList.contains('weui-badge--error')).toBe(true);
  });

  it('should render without value for dot shape', () => {
    component.dot = true;
    fixture.detectChanges();
    
    const badge = fixture.debugElement.query(By.css('.weui-badge'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent).toBe('');
  });
});
