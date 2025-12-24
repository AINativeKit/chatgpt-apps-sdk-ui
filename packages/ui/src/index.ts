/**
 * @ainativekit/ui
 * Extension components for ChatGPT Apps SDK
 * Built on @openai/apps-sdk-ui
 */

// Import CSS tokens
import './tokens/tokens.css';

export const version = '1.0.0-alpha.1';

// Export shared types (following apps-sdk-ui conventions)
export * from './types';

// Export all design tokens
export * from './tokens';

// Export all components (industry standard flat structure)
export * from './components';

// Export hooks
export * from './hooks/openai';

// Export providers
export * from './providers';

// Export utilities (including JSON-to-component rendering)
export * from './utils';
