/**
 * Design Tokens - @ainativekit/ui
 * Extension components for apps-sdk-ui
 *
 * This package extends @openai/apps-sdk-ui with additional components.
 * Token CSS variables from apps-sdk-ui are available globally when using AppsSDKUIProvider.
 *
 * Token Mapping:
 * - Legacy --ai-* tokens are mapped to apps-sdk-ui tokens for compatibility
 * - Use apps-sdk-ui tokens directly for new code: --color-*, --radius-*, --shadow-*, etc.
 *
 * Icons: Use @openai/apps-sdk-ui (755 icons) via Icon component.
 *
 * @packageDocumentation
 */

// Export utility classes
export * from './utility-classes';

// Export types
export type { ColorTheme, ThemeMode, BrandColorConfig, BrandColorValue } from './colors';
export type { ElevationLevel, ElevationDefinition } from './elevation';
export type { SpacingScale } from './spacing';
export type { ColorPath, RadiusScale, TypographyStyle, OpacityPreset } from './token-helpers';

// Export fontStack from typography
export { fontStack } from './typography';

// Export type-safe token helpers (primary API)
export {
  spacing,
  colors,
  radius,
  typography,
  elevation,
  opacity,
  defaultRadius,
  defaultElevation,
  cssVar,
  customVar,
  varWithFallback,
  applyTypography,
  applyElevation,
} from './token-helpers';

import { colors } from './colors';
import { typography, fontStack } from './typography';
import { spacing } from './spacing';
import { radius, defaultRadius } from './radius';
import { elevation, defaultElevation } from './elevation';
import { opacity } from './opacity';

/**
 * All design tokens combined into a single object
 *
 * @example
 * ```typescript
 * import { tokens } from '@ainativekit/ui';
 *
 * const bgColor = tokens.colors.light.background.primary;
 * const h1Size = tokens.typography.heading1.fontSize;
 * const gap = tokens.spacing[16]; // Numeric keys
 * const shadow = tokens.elevation[1].shadow; // Numeric keys
 * ```
 */
export const tokens = {
  colors,
  typography,
  fontStack,
  spacing,
  radius,
  defaultRadius,
  elevation,
  defaultElevation,
  opacity,
} as const;
