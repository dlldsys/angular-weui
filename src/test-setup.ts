import { beforeEach } from 'vitest';
import '@angular/compiler';

// Global test setup for Angular WeUI
beforeEach(() => {
  // Clear DOM before each test
  document.body.innerHTML = '';
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;
