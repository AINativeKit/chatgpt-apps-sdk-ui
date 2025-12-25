/**
 * Design Tokens - @ainativekit/ui
 * Extension components for apps-sdk-ui
 *
 * This package extends @openai/apps-sdk-ui with additional components.
 * Token CSS variables from apps-sdk-ui are available globally when using AppsSDKUIProvider.
 *
 * Use apps-sdk-ui tokens directly in your CSS:
 * - Colors: --color-*, --gray-*, --blue-*, etc.
 * - Typography: --font-*, --control-font-size-*
 * - Spacing: --spacing (4px base unit, use with calc)
 * - Radius: --radius-* (2xs through 4xl, full)
 * - Elevation: --shadow-* (100 through 400)
 *
 * Icons: Use @openai/apps-sdk-ui (755 icons) via Icon component.
 *
 * @packageDocumentation
 */

// Export ElevationLevel type (used by Card component)
export type { ElevationLevel } from '../components/Card/Card';
