/**
 * @ainativekit/ui
 * Extension components for ChatGPT Apps SDK
 * Built on @openai/apps-sdk-ui
 *
 * ## Setup
 *
 * 1. Import SDK and AINativeKit styles in your entry point:
 *    ```tsx
 *    // In your main.tsx (JS imports for proper bundling)
 *    import '@openai/apps-sdk-ui/css';
 *    import '@ainativekit/ui/styles';
 *    ```
 *
 * 2. Wrap your app with AppsSDKUIProvider:
 *    ```tsx
 *    import { AppsSDKUIProvider } from '@ainativekit/ui';
 *    <AppsSDKUIProvider><App /></AppsSDKUIProvider>
 *    ```
 *
 * ## Importing Components
 *
 * SDK primitives should be imported directly from @openai/apps-sdk-ui:
 * ```tsx
 * import { Button } from '@openai/apps-sdk-ui/components/Button';
 * import { Badge } from '@openai/apps-sdk-ui/components/Badge';
 * import { Alert } from '@openai/apps-sdk-ui/components/Alert';
 * ```
 *
 * AINativeKit pattern components are imported from this package:
 * ```tsx
 * import { Carousel, SummaryCard, Map, Album } from '@ainativekit/ui';
 * ```
 */

// Import component-specific CSS tokens
import './tokens/tokens.css';

export const version = '1.0.0-alpha.1';

// Export shared types (following apps-sdk-ui conventions)
export * from './types';

// Export all design tokens
export * from './tokens';

// Export all components
export * from './components';

// Export hooks
export * from './hooks/openai';

// Export utilities (including JSON-to-component rendering)
export * from './utils';

// Re-export AppsSDKUIProvider from apps-sdk-ui for convenience
export { AppsSDKUIProvider } from '@openai/apps-sdk-ui/components/AppsSDKUIProvider';
