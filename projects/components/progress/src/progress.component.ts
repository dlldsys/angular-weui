import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weui-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeUIProgressComponent implements OnChanges, OnInit {
  @Input() value: number = 0;
  @Input() max: number = 100;
  @Input() size: 'small' | 'normal' | 'large' = 'normal';
  @Input() color?: string;
  @Input() showText: boolean = true;
  @Input() status: 'normal' | 'success' | 'warning' | 'error' = 'normal';
  @Input() indeterminate: boolean = false;

  percentage: number = 0;
  progressClass: string[] = [];

  ngOnInit(): void {
    this.updateProgress();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateProgress();
  }

  private updateProgress(): void {
    this.percentage = Math.min(Math.max((this.value / this.max) * 100, 0), 100);

    this.progressClass = ['weui-progress'];
    
    if (this.size !== 'normal') {
      this.progressClass.push(`weui-progress--${this.size}`);
    }
    
    if (this.status !== 'normal') {
      this.progressClass.push(`weui-progress--${this.status}`);
    }
    
    if (this.indeterminate) {
      this.progressClass.push('weui-progress--indeterminate');
    }
  }

  get displayText(): string {
    if (this.indeterminate) {
      return '';
    }
    
    if (this.status === 'success') {
      return '✓';
    }
    
    if (this.status === 'error') {
      return '✕';
    }
    
    return `${Math.round(this.percentage)}%`;
  }
}
