/**
 * @ainativekit/ui
 * Extension components for ChatGPT Apps SDK
 * Built on @openai/apps-sdk-ui
 *
 * ## Setup
 *
 * 1. Import apps-sdk-ui styles in your CSS entry point:
 *    ```css
 *    @import "tailwindcss";
 *    @import "@openai/apps-sdk-ui/css";
 *    @import "@ainativekit/ui/styles";
 *    ```
 *
 * 2. Wrap your app with AppsSDKUIProvider:
 *    ```tsx
 *    import { AppsSDKUIProvider } from '@ainativekit/ui';
 *    <AppsSDKUIProvider><App /></AppsSDKUIProvider>
 *    ```
 *
 * Note: Primitives (Button, Badge, Alert, Icon, etc.) are re-exported from
 * @openai/apps-sdk-ui. This package provides extension components like
 * Map, Album, Carousel, Card variants, etc.
 */

// Import component-specific CSS tokens
import './tokens/tokens.css';

export const version = '1.0.0';

// Export shared types (following apps-sdk-ui conventions)
export * from './types';

// Export all design tokens
export * from './tokens';

// Export all components (includes re-exports from apps-sdk-ui)
export * from './components';

// Export hooks
export * from './hooks/openai';

// Export utilities (including JSON-to-component rendering)
export * from './utils';

// Re-export AppsSDKUIProvider from apps-sdk-ui for convenience
export { AppsSDKUIProvider } from '@openai/apps-sdk-ui/components/AppsSDKUIProvider';
