import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WeUIIconComponent, IconType } from './icon.component';

describe('WeUIIconComponent', () => {
  let component: WeUIIconComponent;
  let fixture: ComponentFixture<WeUIIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeUIIconComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(WeUIIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default icon', () => {
    const iconElement = fixture.debugElement.query(By.css('.weui-icon'));
    expect(iconElement).toBeTruthy();
  });

  it('should apply size classes correctly', () => {
    const testCases = ['small', 'normal', 'large'] as const;
    
    testCases.forEach(size => {
      component.size = size;
      fixture.detectChanges();
      
      const iconElement = fixture.debugElement.query(By.css('.weui-icon'));
      if (size === 'normal') {
        expect(iconElement.nativeElement.classList.contains('weui-icon--normal')).toBe(false);
      } else {
        expect(iconElement.nativeElement.classList.contains(`weui-icon--${size}`)).toBe(true);
      }
    });
  });

  it('should render SVG for built-in icon types', () => {
    component.type = 'success';
    fixture.detectChanges();
    
    const svgElement = fixture.debugElement.query(By.css('svg'));
    expect(svgElement).toBeTruthy();
    expect(svgElement.nativeElement.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(svgElement.nativeElement.getAttribute('fill')).toBe('currentColor');
  });

  it('should apply spin modifier when spin is true', () => {
    component.spin = true;
    fixture.detectChanges();
    
    const iconElement = fixture.debugElement.query(By.css('.weui-icon'));
    expect(iconElement.nativeElement.classList.contains('weui-icon--spin')).toBe(true);
  });

  it('should not apply spin modifier when spin is false', () => {
    component.spin = false;
    fixture.detectChanges();
    
    const iconElement = fixture.debugElement.query(By.css('.weui-icon'));
    expect(iconElement.nativeElement.classList.contains('weui-icon--spin')).toBe(false);
  });

  it('should apply custom color when provided', () => {
    const customColor = '#ff0000';
    component.color = customColor;
    fixture.detectChanges();
    
    const iconElement = fixture.debugElement.query(By.css('.weui-icon'));
    expect(iconElement.nativeElement.style.color).toBe(customColor);
  });

  it('should render custom icon content when no built-in type is provided', () => {
    component.type = undefined;
    component.name = undefined;
    fixture.detectChanges();
    
    const iElement = fixture.debugElement.query(By.css('i.weui-icon'));
    expect(iElement).toBeTruthy();
    
    const svgElement = fixture.debugElement.query(By.css('svg'));
    expect(svgElement).toBeFalsy();
  });

  it('should apply type-specific classes for built-in icons', () => {
    const testCases: IconType[] = ['success', 'warning', 'error', 'info', 'loading'];
    
    testCases.forEach(iconType => {
      component.type = iconType;
      fixture.detectChanges();
      
      const iconElement = fixture.debugElement.query(By.css('.weui-icon'));
      expect(iconElement.nativeElement.classList.contains(`weui-icon--${iconType}`)).toBe(true);
    });
  });

  it('should render correct SVG path for success icon', () => {
    component.type = 'success';
    fixture.detectChanges();
    
    const pathElement = fixture.debugElement.query(By.css('svg path'));
    const expectedPath = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z';
    expect(pathElement.nativeElement.getAttribute('d')).toBe(expectedPath);
  });

  it('should render correct SVG path for loading icon', () => {
    component.type = 'loading';
    fixture.detectChanges();
    
    const pathElement = fixture.debugElement.query(By.css('svg path'));
    const expectedPath = 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z';
    expect(pathElement.nativeElement.getAttribute('d')).toBe(expectedPath);
  });

  it('should handle name property as fallback', () => {
    component.name = 'home';
    component.type = undefined;
    fixture.detectChanges();
    
    expect(component.svgPath).toBeDefined();
    const iconElement = fixture.debugElement.query(By.css('.weui-icon'));
    expect(iconElement.nativeElement.classList.contains('weui-icon--home')).toBe(true);
  });

  it('should update icon when type changes', () => {
    component.type = 'success';
    fixture.detectChanges();
    
    let pathElement = fixture.debugElement.query(By.css('svg path'));
    expect(pathElement.nativeElement.getAttribute('d')).toContain('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10');
    
    component.type = 'error';
    fixture.detectChanges();
    
    pathElement = fixture.debugElement.query(By.css('svg path'));
    expect(pathElement.nativeElement.getAttribute('d')).toContain('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10');
  });

  it('should render custom content when provided', () => {
    component.type = undefined;
    fixture.detectChanges();
    
    const iElement = fixture.debugElement.query(By.css('i.weui-icon'));
    expect(iElement).toBeTruthy();
    expect(iElement.nativeElement.classList.contains('weui-icon')).toBe(true);
  });

  it('should have correct SVG attributes', () => {
    component.type = 'success';
    fixture.detectChanges();
    
    const svgElement = fixture.debugElement.query(By.css('svg'));
    expect(svgElement.nativeElement.classList.contains('weui-icon')).toBe(true);
    expect(svgElement.nativeElement.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svgElement.nativeElement.style.fill).toBe('currentColor');
  });

  it('should handle invalid icon type gracefully', () => {
    component.type = 'invalid-type' as IconType;
    fixture.detectChanges();
    
    const svgElement = fixture.debugElement.query(By.css('svg'));
    expect(svgElement).toBeFalsy();
    
    const iElement = fixture.debugElement.query(By.css('i.weui-icon'));
    expect(iElement).toBeTruthy();
  });

  it('should apply multiple modifiers correctly', () => {
    component.type = 'success';
    component.size = 'large';
    component.spin = true;
    component.color = '#ff0000';
    fixture.detectChanges();
    
    const iconElement = fixture.debugElement.query(By.css('.weui-icon'));
    expect(iconElement.nativeElement.classList.contains('weui-icon--success')).toBe(true);
    expect(iconElement.nativeElement.classList.contains('weui-icon--large')).toBe(true);
    expect(iconElement.nativeElement.classList.contains('weui-icon--spin')).toBe(true);
    expect(iconElement.nativeElement.style.color).toBe('#ff0000');
  });
});
