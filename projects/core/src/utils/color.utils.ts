/**
 * 颜色工具类
 */
export class ColorUtils {
  /**
   * 将十六进制颜色转换为RGB
   */
  static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  /**
   * 将RGB转换为十六进制颜色
   */
  static rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /**
   * 获取颜色的亮度
   */
  static getLuminance(hex: string): number {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return 0;

    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  /**
   * 判断颜色是否为深色
   */
  static isDarkColor(hex: string): boolean {
    return this.getLuminance(hex) < 0.5;
  }

  /**
   * 获取对比色（黑或白）
   */
  static getContrastColor(hex: string): string {
    return this.isDarkColor(hex) ? '#FFFFFF' : '#000000';
  }

  /**
   * 调整颜色亮度
   */
  static adjustBrightness(hex: string, percent: number): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const { r, g, b } = rgb;
    const factor = percent / 100;

    const newR = Math.min(255, Math.max(0, r + (255 - r) * factor));
    const newG = Math.min(255, Math.max(0, g + (255 - g) * factor));
    const newB = Math.min(255, Math.max(0, b + (255 - b) * factor));

    return this.rgbToHex(Math.round(newR), Math.round(newG), Math.round(newB));
  }
}
