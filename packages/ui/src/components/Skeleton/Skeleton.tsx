import type { CSSProperties } from 'react';
import styles from './Skeleton.module.css';
import { cn } from '../../utils/cn';

export interface SkeletonProps {
  /** Width of the skeleton (number for px, string for any CSS value) */
  width?: string | number;
  /** Height of the skeleton (number for px, string for any CSS value) */
  height?: string | number;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Additional CSS class name */
  className?: string;
  /** Border radius override */
  borderRadius?: string | number;
}

/**
 * Skeleton component for loading placeholders.
 *
 * Provides a shimmer animation effect to indicate loading state.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Skeleton width={200} height={20} />
 *
 * // Full width with custom height
 * <Skeleton width="100%" height={100} />
 *
 * // Circular skeleton
 * <Skeleton width={40} height={40} borderRadius="50%" />
 * ```
 */
export const Skeleton = ({
  width,
  height,
  style,
  className,
  borderRadius,
}: SkeletonProps) => (
  <div
    className={cn(styles.skeleton, className)}
    style={{
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : (height ?? '1em'),
      borderRadius:
        typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      ...style,
    }}
    aria-hidden="true"
  />
);

Skeleton.displayName = 'Skeleton';
