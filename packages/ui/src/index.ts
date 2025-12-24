/**
 * @ainativekit/ui
 * Extension components for ChatGPT Apps SDK
 * Built on @openai/apps-sdk-ui
 *
 * Note: Primitives (Button, Badge, Alert, Icon, etc.) are re-exported from
 * @openai/apps-sdk-ui. Use AppsSDKUIProvider from apps-sdk-ui for theming.
 */

// Import CSS tokens (will be updated to use apps-sdk-ui tokens in PR 4)
import './tokens/tokens.css';

export const version = '1.0.0-alpha.1';

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
