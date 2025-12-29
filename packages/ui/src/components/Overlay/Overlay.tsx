import React from 'react';
import clsx from 'clsx';
import styles from './Overlay.module.css';

export interface OverlayProps {
  /**
   * Background style for the overlay
   * - "dark": Semi-transparent dark background (rgba(0, 0, 0, 0.6))
   * - "light": Semi-transparent light background (rgba(255, 255, 255, 0.8))
   * - "transparent": No background
   * - Custom string: Any valid CSS color value
   * @default "dark"
   */
  background?: 'dark' | 'light' | 'transparent' | string;

  /**
   * Height of the overlay
   * @default 56
   */
  height?: number | string;

  /**
   * Position of the overlay within the parent container
   * @default "bottom"
   */
  position?: 'top' | 'bottom';

  /**
   * Horizontal alignment of content
   * @default "center"
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Padding inside the overlay
   * @default 8
   */
  padding?: number;

  /**
   * Content to render inside the overlay
   */
  children: React.ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Generic overlay component for positioning content on top of images/media.
 * Used by SummaryCard, PhotoCarousel, and other components.
 *
 * @example
 * ```tsx
 * <Overlay background="dark" height={40} align="center">
 *   <img src="logo.png" alt="Logo" style={{ height: 24 }} />
 * </Overlay>
 * ```
 *
 * @example
 * ```tsx
 * // Custom brand color
 * <Overlay background="#0066CC" height={48} align="center">
 *   <span style={{ color: 'white', fontWeight: 600 }}>Brand Name</span>
 * </Overlay>
 * ```
 */
export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
  (
    {
      background = 'dark',
      height = 56,
      position = 'bottom',
      align = 'center',
      padding = 8,
      children,
      className,
    },
    ref
  ) => {
    // Map background presets to CSS values
    const backgroundMap: Record<string, string> = {
      dark: 'rgba(0, 0, 0, 0.6)',
      light: 'rgba(255, 255, 255, 0.8)',
      transparent: 'transparent',
    };

    const backgroundValue = backgroundMap[background] || background;

    // Map align to justify-content values
    const justifyContentMap: Record<string, string> = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    };

    const justifyContent = justifyContentMap[align] || 'center';

    // Position styles
    const positionStyles: React.CSSProperties = {
      position: 'absolute',
      left: 0,
      right: 0,
      ...(position === 'top' ? { top: 0 } : { bottom: 0 }),
    };

    return (
      <div
        ref={ref}
        className={clsx(styles.overlay, className)}
        style={{
          ...positionStyles,
          background: backgroundValue,
          height: typeof height === 'number' ? `${height}px` : height,
          justifyContent,
          padding: `${padding}px`,
        }}
      >
        {children}
      </div>
    );
  }
);

Overlay.displayName = 'Overlay';
