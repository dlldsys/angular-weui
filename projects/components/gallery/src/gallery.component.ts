import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weui-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="weui-gallery" 
      *ngIf="visible"
      (click)="onOverlayClick($event)"
    >
      <span class="weui-gallery__op" weui-close (click)="close()">
        <span class="weui-gallery__del">
          <i class="weui-icon-delete weui-icon_gallery-del"></i>
        </span>
      </span>
      <div class="weui-gallery__info" *ngIf="showInfo">
        {{ currentIndex + 1 }} / {{ images.length }}
      </div>
      <div class="weui-gallery__img-wrapper" (click)="$event.stopPropagation()">
        <img 
          class="weui-gallery__img" 
          [src]="currentImage?.src" 
          [alt]="currentImage?.alt || ''"
          (click)="$event.stopPropagation()"
        />
        <div class="weui-gallery__desc" *ngIf="currentImage?.description">
          {{ currentImage?.description }}
        </div>
      </div>
      <div class="weui-gallery__control" (click)="$event.stopPropagation()">
        <div class="weui-gallery__arrow weui-gallery__arrow_l" *ngIf="images.length > 1 && currentIndex > 0" (click)="prev()">
          <span class="weui-gallery__arrow-inner"></span>
        </div>
        <div class="weui-gallery__arrow weui-gallery__arrow_r" *ngIf="images.length > 1 && currentIndex < images.length - 1" (click)="next()">
          <span class="weui-gallery__arrow-inner"></span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./gallery.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeUIGalleryComponent {
  @Input() images: Array<{ src: string; alt?: string; description?: string }> = [];
  @Input() visible = false;
  @Input() index = 0;
  @Input() showInfo = true;
  @Input() showDelete = true;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() indexChange = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  constructor(private cdr: ChangeDetectorRef) {}

  get currentIndex(): number {
    return this.index;
  }

  get currentImage(): { src: string; alt?: string; description?: string } | null {
    return this.images[this.index] || null;
  }

  prev(): void {
    if (this.index > 0) {
      this.index--;
      this.indexChange.emit(this.index);
      this.cdr.markForCheck();
    }
  }

  next(): void {
    if (this.index < this.images.length - 1) {
      this.index++;
      this.indexChange.emit(this.index);
      this.cdr.markForCheck();
    }
  }

  close(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  open(index: number = 0): void {
    this.index = Math.max(0, Math.min(index, this.images.length - 1));
    this.visible = true;
    this.visibleChange.emit(true);
    this.cdr.markForCheck();
  }
}
