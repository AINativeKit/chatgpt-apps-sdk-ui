/**
 * Token Helper Utilities
 * Type-safe helpers for using design tokens in inline styles
 *
 * These helpers provide convenient access to design tokens.
 * For the full token system, apps-sdk-ui CSS variables are available:
 * - Colors: var(--color-text), var(--color-background-*-solid), etc.
 * - Spacing: calc(var(--spacing) * N) where --spacing is 4px
 * - Radius: var(--radius-md), var(--radius-xl), etc.
 * - Shadows: var(--shadow-100), var(--shadow-200), etc.
 *
 * Legacy --ai-* tokens are mapped to apps-sdk-ui tokens for compatibility.
 *
 * @example
 * ```typescript
 * import { cssVar, spacing, colors } from '@ainativekit/ui/tokens';
 *
 * // Direct value access (returns actual values like '32px', '#FFFFFF')
 * <div style={{ gap: spacing[16], color: colors.light.text.primary }} />
 *
 * // CSS variable access (returns 'var(--ai-spacing-16)', useful for theme-aware styles)
 * <div style={{ gap: cssVar.spacing(16), color: cssVar.color('text-primary') }} />
 * ```
 */

import { spacing as spacingSource, type SpacingScale } from './spacing';
import { colors as colorsSource } from './colors';
import { radius as radiusSource } from './radius';
import { typography as typographySource } from './typography';
import {
  elevation as elevationSource,
  defaultElevation as defaultElevationSource,
  type ElevationLevel,
} from './elevation';
import { opacity as opacitySource } from './opacity';

export type { ElevationLevel, SpacingScale };

/**
 * Color paths for accessing nested color tokens via CSS variables
 * These map to actual --ai-color-* CSS custom properties
 *
 * Brand colors are customizable via ThemeProvider and provide semantic meaning
 * for different UI states (primary actions, success, warnings, errors)
 *
 * @example 'text-primary', 'bg-secondary', 'brand-primary', 'brand-success'
 */
export type ColorPath =
  | 'text-primary'
  | 'text-secondary'
  | 'text-tertiary'
  | 'text-inverted'
  | 'bg-primary'
  | 'bg-secondary'
  | 'bg-tertiary'
  | 'icon-primary'
  | 'icon-secondary'
  | 'icon-tertiary'
  | 'icon-inverted'
  | 'accent-blue'
  | 'accent-red'
  | 'accent-orange'
  | 'accent-green'
  | 'brand-primary'
  | 'brand-primary-hover'
  | 'brand-primary-active'
  | 'brand-on-primary'
  | 'brand-success'
  | 'brand-success-hover'
  | 'brand-success-active'
  | 'brand-on-success'
  | 'brand-warning'
  | 'brand-warning-hover'
  | 'brand-warning-active'
  | 'brand-on-warning'
  | 'brand-error'
  | 'brand-error-hover'
  | 'brand-error-active'
  | 'brand-on-error'
  | 'outline'
  | 'border-light'
  | 'border-default'
  | 'border-heavy';

/**
 * Radius scale values (none, sm, md, base, lg, xl, full)
 */
export type RadiusScale = 'none' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | 'full';

/**
 * Typography style names
 */
export type TypographyStyle =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'body'
  | 'bodyEmph'
  | 'bodySmall'
  | 'bodySmallEmph'
  | 'caption'
  | 'captionEmph'
  | 'button'
  | 'badge';

/**
 * Opacity presets
 */
export type OpacityPreset = 'full' | 'subtle' | 'muted' | 'disabled';

// ============================================================================
// Direct Token Access (returns actual values)
// ============================================================================

/**
 * Spacing tokens - returns actual pixel values
 * @example spacing[16] // '32px'
 */
export const spacing = spacingSource;

/**
 * Color tokens organized by theme
 * @example colors.light.text.primary // '#0D0D0D'
 */
export const colors = colorsSource;

/**
 * Border radius tokens
 * @example radius.xl // '24px'
 */
export const radius = radiusSource;

/**
 * Typography tokens with full style definitions
 * @example typography.heading1 // { fontSize: '36px', lineHeight: '40px', fontWeight: 600, ... }
 */
export const typography = typographySource;

/**
 * Elevation/shadow tokens
 * @example elevation[2] // { shadow: '0px 6px 24px rgba(0,0,0,0.08)', ... }
 */
export const elevation = elevationSource;

/**
 * Opacity tokens
 * @example opacity.subtle // 0.7
 */
export const opacity = opacitySource;

/**
 * Default elevation level
 * Use this with the elevation helper: elevation[defaultElevation]
 * @example elevation[defaultElevation] // elevation[1]
 */
export const defaultElevation = defaultElevationSource;

/**
 * Default border radius value
 * @example defaultRadius // '24px'
 */
export const defaultRadius = radiusSource.xl;

// ============================================================================
// CSS Variable Access (returns var(--ai-*) strings)
// ============================================================================

/**
 * CSS variable helpers for theme-aware styling
 * Returns CSS variable references that respond to theme changes
 */
export const cssVar = {
  /**
   * Get spacing CSS variable
   * @example cssVar.spacing(16) // 'var(--ai-spacing-16)'
   */
  spacing: (scale: SpacingScale): string => {
    return `var(--ai-spacing-${scale})`;
  },

  /**
   * Get color CSS variable
   * @example cssVar.color('text-primary') // 'var(--ai-color-text-primary)'
   */
  color: (path: ColorPath): string => {
    return `var(--ai-color-${path})`;
  },

  /**
   * Get radius CSS variable
   * @example cssVar.radius('xl') // 'var(--ai-radius-xl)'
   */
  radius: (scale: RadiusScale): string => {
    return `var(--ai-radius-${scale})`;
  },

  /**
   * Get typography CSS variables as a style object
   * @example cssVar.typography('heading1') // { fontSize: 'var(--ai-font-size-h1)', ... }
   */
  typography: (
    style: TypographyStyle
  ): {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    letterSpacing: string;
  } => {
    const styleMap: Record<TypographyStyle, string> = {
      heading1: 'h1',
      heading2: 'h2',
      heading3: 'h3',
      body: 'body',
      bodyEmph: 'body-emph',
      bodySmall: 'body-small',
      bodySmallEmph: 'body-small-emph',
      caption: 'caption',
      captionEmph: 'caption-emph',
      button: 'button',
      badge: 'badge',
    };

    const varName = styleMap[style];
    return {
      fontSize: `var(--ai-font-size-${varName})`,
      lineHeight: `var(--ai-line-height-${varName})`,
      fontWeight: `var(--ai-font-weight-${varName})`,
      letterSpacing: `var(--ai-letter-spacing-${varName})`,
    };
  },

  /**
   * Get elevation CSS variable (shadow)
   * @example cssVar.elevation(2) // 'var(--ai-elevation-2)'
   */
  elevation: (level: ElevationLevel): string => {
    return `var(--ai-elevation-${level})`;
  },

  /**
   * Get opacity CSS variable
   * @example cssVar.opacity('subtle') // 'var(--ai-opacity-subtle)'
   */
  opacity: (preset: OpacityPreset): string => {
    return `var(--ai-opacity-${preset})`;
  },
} as const;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Create a custom CSS variable reference
 * @example customVar('my-custom-color') // 'var(--my-custom-color)'
 */
export function customVar(name: string): string {
  return `var(--${name})`;
}

/**
 * Create a CSS variable reference with a fallback value
 * @example varWithFallback('ai-spacing-16', '32px') // 'var(--ai-spacing-16, 32px)'
 */
export function varWithFallback(name: string, fallback: string): string {
  return `var(--${name}, ${fallback})`;
}

/**
 * Apply typography style as inline style object
 * @example applyTypography('heading1') // { fontSize: '36px', lineHeight: '40px', fontWeight: 600, letterSpacing: '-0.1px' }
 */
export function applyTypography(style: TypographyStyle) {
  const typographyStyle = typographySource[style];
  return {
    fontSize: typographyStyle.fontSize,
    lineHeight: typographyStyle.lineHeight,
    fontWeight: typographyStyle.fontWeight,
    letterSpacing: typographyStyle.letterSpacing,
  };
}

/**
 * Apply elevation as inline style object (for light theme)
 * @example applyElevation(2) // { boxShadow: '0px 6px 24px rgba(0,0,0,0.08)' }
 */
export function applyElevation(level: ElevationLevel) {
  const elevationStyle = elevationSource[level];
  return {
    boxShadow: elevationStyle.shadow,
  };
}

// ============================================================================
// Color Utility Functions
// ============================================================================

/**
 * @fileoverview Color utilities for brand customization and WCAG validation
 *
 * ## Token Structure Mapping
 *
 * The color token system uses different structures in TypeScript vs CSS:
 *
 * ### TypeScript Structure (Nested Objects)
 * Defined in `colors.ts`:
 * ```typescript
 * colors.light.brand.primary.base    // '#0285FF'
 * colors.light.brand.primary.hover   // '#016FDB'
 * colors.light.brand.primary.active  // '#0159B8'
 * colors.light.brand.primary.onColor // '#FFFFFF'
 * ```
 *
 * ### CSS Variables (Flat Naming)
 * Defined in `tokens.css`:
 * ```css
 * --ai-color-brand-primary        (maps to .base)
 * --ai-color-brand-primary-hover  (maps to .hover)
 * --ai-color-brand-primary-active (maps to .active)
 * --ai-color-brand-on-primary     (maps to .onColor)
 * ```
 *
 * ### Usage in Components
 * ```typescript
 * // Direct value access (TypeScript)
 * import { colors } from '@ainativekit/ui/tokens';
 * const buttonBg = colors.light.brand.primary.base; // '#0285FF'
 *
 * // CSS variable access (theme-aware)
 * import { cssVar } from '@ainativekit/ui/tokens';
 * <div style={{ color: cssVar.color('brand-primary') }} />
 * ```
 *
 * ### ThemeProvider Runtime Customization
 * The `brandColors` prop in ThemeProvider generates CSS variables dynamically:
 * ```typescript
 * <ThemeProvider brandColors={{ primary: '#6B46C1' }}>
 *   // This overrides --ai-color-brand-primary at runtime
 * </ThemeProvider>
 * ```
 */

/**
 * Validate if a string is a valid hex color format
 * Supports 3-digit (#RGB), 6-digit (#RRGGBB), and 8-digit (#RRGGBBAA) hex formats
 * @param color - Color string to validate
 * @returns true if valid hex color format
 * @example
 * isValidHexColor('#FFF') // true (3-digit)
 * isValidHexColor('#FF5733') // true (6-digit)
 * isValidHexColor('FF5733') // true (without #)
 * isValidHexColor('#FF5733AA') // true (8-digit with alpha)
 * isValidHexColor('not-a-color') // false
 * isValidHexColor('#GG5733') // false (invalid characters)
 */
export function isValidHexColor(color: string): boolean {
  // Match 3-digit, 6-digit, or 8-digit hex colors with optional # prefix
  const hexPattern = /^#?([a-f\d]{3}|[a-f\d]{6}|[a-f\d]{8})$/i;
  return hexPattern.test(color);
}

/**
 * Normalize hex color to standard format with # prefix
 * Preserves alpha channel if present
 * @param hex - Hex color string (3, 6, or 8 digits, with or without #)
 * @returns Normalized hex with # prefix, or null if invalid
 * @example
 * normalizeHexColor('#FFF') // '#FFFFFF' (expand 3-digit)
 * normalizeHexColor('FF5733') // '#FF5733' (add #)
 * normalizeHexColor('#FF5733AA') // '#FF5733AA' (preserve alpha)
 * normalizeHexColor('FF5733AA') // '#FF5733AA' (add # and preserve alpha)
 */
export function normalizeHexColor(hex: string): string | null {
  if (!isValidHexColor(hex)) return null;

  // Remove # if present
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  // Handle 3-digit: expand to 6-digit
  if (cleanHex.length === 3) {
    const expanded = cleanHex
      .split('')
      .map((c) => c + c)
      .join('');
    return `#${expanded.toUpperCase()}`;
  }

  // Handle 6-digit or 8-digit: just add # if needed and uppercase
  return `#${cleanHex.toUpperCase()}`;
}

/**
 * Convert hex color to RGB values
 * Supports 3-digit, 6-digit, and 8-digit hex formats
 * Alpha channel is stripped for contrast calculations
 * @param hex - Hex color string (with or without #)
 * @returns RGB object or null if invalid
 * @example
 * hexToRgb('#FF5733') // { r: 255, g: 87, b: 51 }
 * hexToRgb('#FFF') // { r: 255, g: 255, b: 255 }
 * hexToRgb('FF5733') // { r: 255, g: 87, b: 51 }
 * hexToRgb('#FF5733AA') // { r: 255, g: 87, b: 51 } (alpha stripped)
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Normalize to standard format (6 or 8 digits with #)
  const normalized = normalizeHexColor(hex);
  if (!normalized) return null;

  // Strip alpha channel if present (8-digit hex)
  // For contrast calculations, we only care about RGB, not alpha
  const rgbHex = normalized.length === 9 ? normalized.slice(0, 7) : normalized;

  // Parse the RGB portion (6-digit hex)
  const result = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(rgbHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance of a color (WCAG formula)
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Relative luminance (0-1)
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors (WCAG formula)
 * @param color1 - First color (hex)
 * @param color2 - Second color (hex)
 * @returns Contrast ratio (1-21) or null if invalid colors
 * @example getContrastRatio('#FFFFFF', '#000000') // 21
 */
export function getContrastRatio(color1: string, color2: string): number | null {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return null;

  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standards
 * @param ratio - Contrast ratio
 * @param level - WCAG level ('AA' or 'AAA')
 * @param size - Text size ('normal' or 'large')
 * @returns true if meets standard
 * @example meetsWCAG(4.5, 'AA', 'normal') // true
 */
export function meetsWCAG(
  ratio: number,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  }
  return size === 'large' ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Get appropriate text color (black or white) for a background color
 * @param backgroundColor - Background color (hex)
 * @returns '#ffffff' or '#000000'
 * @example getContrastColor('#0285FF') // '#ffffff'
 */
export function getContrastColor(backgroundColor: string): '#ffffff' | '#000000' {
  const rgb = hexToRgb(backgroundColor);
  if (!rgb) return '#ffffff';

  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);

  // Use white text for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Validate if a color pair has sufficient contrast for UI elements
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @returns Object with validation result and contrast ratio
 * @example validateContrast('#FFFFFF', '#0285FF')
 * // { valid: true, ratio: 5.2, level: 'AA' }
 */
export function validateContrast(
  foreground: string,
  background: string
): {
  valid: boolean;
  ratio: number | null;
  level: 'AAA' | 'AA' | 'fail';
} {
  const ratio = getContrastRatio(foreground, background);

  if (ratio === null) {
    return { valid: false, ratio: null, level: 'fail' };
  }

  if (meetsWCAG(ratio, 'AAA')) {
    return { valid: true, ratio, level: 'AAA' };
  }

  if (meetsWCAG(ratio, 'AA')) {
    return { valid: true, ratio, level: 'AA' };
  }

  return { valid: false, ratio, level: 'fail' };
}
