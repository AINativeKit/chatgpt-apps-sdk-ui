import type { CSSProperties } from 'react';

/**
 * Unified code block styles for Storybook stories
 * Ensures consistent appearance across all documentation
 */
export const codeBlockStyles = {
  /**
   * Primary code block - for main code examples
   * Larger padding and rounded corners for prominence
   */
  primary: {
    background: 'var(--color-surface-secondary)',
    padding: '16px',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '13px',
    overflow: 'auto',
    marginTop: '8px',
  } as CSSProperties,

  /**
   * Inline code block - for small code snippets
   * Smaller padding for less prominent examples
   */
  inline: {
    background: 'var(--color-surface-secondary)',
    padding: '12px',
    borderRadius: '6px',
    fontFamily: 'monospace',
    fontSize: '13px',
    marginTop: '4px',
  } as CSSProperties,

  /**
   * Terminal/command style - for CLI commands
   * Consistent with inline but with scroll handling
   */
  terminal: {
    background: 'var(--color-surface-secondary)',
    padding: '12px',
    borderRadius: '6px',
    fontFamily: 'monospace',
    fontSize: '13px',
    marginTop: '8px',
    overflow: 'auto',
  } as CSSProperties,
} as const;
