import { useOpenAiGlobal } from './useOpenAiGlobal';
import type { Theme } from './types';

export interface UseThemeResult {
  /**
   * Current theme ('light' or 'dark'), or null if no theme is available
   */
  theme: Theme | null;

  /**
   * Whether the theme is controlled by ChatGPT (read-only mode).
   */
  isControlledByChatGPT: boolean;
}

/**
 * Get the current theme from ChatGPT environment
 *
 * This hook reads the theme from ChatGPT's global object (`window.openai.theme`).
 * For theme control in non-ChatGPT environments, use AppsSDKUIProvider from apps-sdk-ui.
 *
 * @returns Object with theme and control info
 *
 * @example
 * ```tsx
 * import { useTheme } from '@ainativekit/ui';
 *
 * function MyComponent() {
 *   const { theme, isControlledByChatGPT } = useTheme();
 *
 *   return (
 *     <div className={theme === 'dark' ? 'dark-mode' : 'light-mode'}>
 *       Current theme: {theme ?? 'unknown'}
 *       {isControlledByChatGPT && <p>Theme controlled by ChatGPT</p>}
 *     </div>
 *   );
 * }
 * ```
 */
export const useTheme = (): UseThemeResult => {
  const chatGPTTheme = useOpenAiGlobal('theme');

  return {
    theme: chatGPTTheme,
    isControlledByChatGPT: !!chatGPTTheme,
  };
};
