import type { CSSProperties } from 'react';
import { ImageWide } from '@openai/apps-sdk-ui/components/Icon';
import styles from './ImageSkeleton.module.css';
import { cn } from '../../utils/cn';

export interface ImageSkeletonProps {
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
  /** Custom icon to display (defaults to ImageWide) */
  icon?: React.ReactNode;
  /** Icon size in pixels */
  iconSize?: number;
}

/**
 * ImageSkeleton component for image loading placeholders.
 *
 * Combines a shimmer animation with a centered image placeholder icon
 * for better UX during image loading states.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ImageSkeleton width="100%" height={200} />
 *
 * // With custom border radius
 * <ImageSkeleton width={300} height={200} borderRadius={16} />
 *
 * // With custom icon
 * import { Images } from '@openai/apps-sdk-ui/components/Icon';
 * <ImageSkeleton icon={<Images />} iconSize={48} />
 * ```
 */
export const ImageSkeleton = ({
  width,
  height,
  style,
  className,
  borderRadius,
  icon,
  iconSize = 32,
}: ImageSkeletonProps) => (
  <div
    className={cn(styles.imageSkeleton, className)}
    style={{
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      ...style,
    }}
    aria-hidden="true"
  >
    <div className={styles.iconContainer} style={{ '--icon-size': `${iconSize}px` } as CSSProperties}>
      {icon ?? <ImageWide />}
    </div>
  </div>
);

ImageSkeleton.displayName = 'ImageSkeleton';
