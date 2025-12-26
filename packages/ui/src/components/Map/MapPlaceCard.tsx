import React, { type SyntheticEvent } from 'react';
import { Badge, type BadgeProps } from '@openai/apps-sdk-ui/components/Badge';
import { ErrorStateDisplay } from './ErrorStateDisplay';
import { Features } from '../Feature';
import { cn } from '../../utils/cn';
import { Skeleton, ImageSkeleton } from '../Skeleton';
import type { Feature } from './types';
import styles from './MapPlaceCard.module.css';

export type MapPlaceCardVariant = 'carousel' | 'list';

export interface MapPlaceCardProps {
  /**
   * Thumbnail image URL.
   */
  image?: string;

  /**
   * Location name/title.
   */
  title?: string;

  /**
   * Optional subtitle/description.
   */
  subtitle?: string;

  /**
   * Configurable feature list (e.g., rating, price).
   */
  features?: Feature[];

  /**
   * Whether this card is currently selected.
   * @default false
   */
  selected?: boolean;

  /**
   * Click handler.
   */
  onClick?: () => void;

  /**
   * Additional class name.
   */
  className?: string;

  /**
   * Inline styles.
   */
  style?: React.CSSProperties;

  /**
   * Visual variant for different contexts.
   * - 'carousel': Subtle selection (border + light background)
   * - 'list': Prominent selection (highlighted background)
   * @default 'carousel'
   */
  variant?: MapPlaceCardVariant;

  // State Management
  /**
   * Loading state - shows skeleton UI
   * @default false
   */
  loading?: boolean;

  /**
   * Error state - shows error message
   * @default false
   */
  error?: boolean;

  /**
   * Custom error title
   * @default 'Failed to load'
   */
  errorTitle?: string;

  /**
   * Custom error message
   */
  errorMessage?: string;

  /**
   * Retry callback for error state
   */
  onErrorRetry?: () => void;

  /**
   * Empty state title
   * @default 'No location'
   */
  emptyTitle?: string;

  /**
   * Empty state message
   */
  emptyMessage?: string;

  // Image Controls
  /**
   * Native browser loading behavior for the thumbnail image.
   * - 'lazy': Defers loading until image is near viewport (default, best for below-the-fold)
   * - 'eager': Loads immediately (use for above-the-fold images)
   * @default 'lazy'
   */
  imageLoading?: 'lazy' | 'eager';

  /**
   * Callback fired when the thumbnail image successfully loads.
   * Useful for tracking image load performance or triggering animations.
   */
  onImageLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Callback fired when the thumbnail image fails to load.
   * Useful for fallback handling or error tracking.
   */
  onImageError?: (event: SyntheticEvent<HTMLImageElement>) => void;

  // Badge Support
  /**
   * Badge content (text or number)
   */
  badge?: string | number;

  /**
   * Badge position
   * @default 'top-right'
   */
  badgePosition?: 'top-left' | 'top-right';

  /**
   * Badge variant style
   * @default 'soft'
   */
  badgeVariant?: BadgeProps['variant'];

  /**
   * Badge size
   * @default 'sm'
   */
  badgeSize?: BadgeProps['size'];

  /**
   * Badge pill shape (fully rounded)
   * @default true
   */
  badgePill?: boolean;

  /**
   * Badge color
   * @default 'secondary'
   */
  badgeColor?: BadgeProps['color'];

  // Text Display
  /**
   * Number of lines for title (1-3)
   * @default 1
   */
  titleLines?: 1 | 2 | 3;

  /**
   * Number of lines for subtitle (1-3)
   * @default 1
   */
  subtitleLines?: 1 | 2 | 3;

  /**
   * Optional test ID for testing purposes
   */
  'data-testid'?: string;
}

/**
 * MapPlaceCard component - Display location with thumbnail, title, and features.
 *
 * Features:
 * - Shows location thumbnail image
 * - Displays location name and optional subtitle
 * - Shows configurable features (rating, price, etc.)
 * - Clickable for selection with keyboard support
 * - Loading, error, and empty states
 * - Native lazy loading with callbacks
 * - Badge support for indicators
 * - Multi-line text support
 *
 * @example
 * ```tsx
 * import { StarFilled } from '@openai/apps-sdk-ui/components/Icon';
 *
 * <MapPlaceCard
 *   image="https://example.com/location.jpg"
 *   title="Central Park"
 *   subtitle="New York, NY"
 *   features={[
 *     { icon: <StarFilled />, label: '4.8' },
 *     { label: 'Free' }
 *   ]}
 *   onClick={() => console.log('Selected')}
 *   loading={isLoading}
 *   badge="Popular"
 *   badgeVariant="soft"
 * />
 * ```
 */
export const MapPlaceCard: React.FC<MapPlaceCardProps> = ({
  image,
  title,
  subtitle,
  features,
  selected = false,
  onClick,
  className,
  style,
  variant = 'carousel',
  loading = false,
  error = false,
  errorTitle = 'Failed to load',
  errorMessage,
  onErrorRetry,
  emptyTitle = 'No location',
  emptyMessage,
  imageLoading = 'lazy',
  onImageLoad,
  onImageError,
  badge,
  badgePosition: _badgePosition = 'top-right',
  badgeVariant = 'soft',
  badgeSize = 'sm',
  badgePill = true,
  badgeColor = 'secondary',
  titleLines = 1,
  subtitleLines = 1,
  'data-testid': testId,
}) => {
  const isEmpty = !image && !title;

  // State Priority: Loading > Error > Empty > Content
  const showLoading = loading;
  const showError = !loading && error;
  const showEmpty = !loading && !error && isEmpty;

  // Loading State
  if (showLoading) {
    return (
      <div
        className={cn(styles.mapPlaceCard, styles.loadingCard, className)}
        style={style}
        role="status"
        aria-live="polite"
        data-testid={testId}
      >
        <span className={styles.visuallyHidden}>Loading location</span>
        <ImageSkeleton className={styles.skeletonThumbnail} iconSize={24} />
        <div className={styles.content}>
          <Skeleton width="80%" height={14} className={styles.skeletonTitle} />
          <Skeleton width="60%" height={12} className={styles.skeletonSubtitle} />
        </div>
      </div>
    );
  }

  // Error State
  if (showError) {
    return (
      <div className={cn(styles.mapPlaceCard, styles.errorCard, className)} style={style} data-testid={testId}>
        <div className={styles.errorContainer}>
          <ErrorStateDisplay
            state="error"
            title={errorTitle || 'Failed to load'}
            message={errorMessage}
            onAction={onErrorRetry}
          />
        </div>
      </div>
    );
  }

  // Empty State
  if (showEmpty) {
    return (
      <div className={cn(styles.mapPlaceCard, styles.emptyCard, className)} style={style} data-testid={testId}>
        <div className={styles.emptyContainer}>
          <div className={styles.emptyTitle}>{emptyTitle}</div>
          {emptyMessage && <div className={styles.emptyMessage}>{emptyMessage}</div>}
        </div>
      </div>
    );
  }

  // Normal Content
  const cardClassName = cn(
    styles.mapPlaceCard,
    variant === 'list' && styles.variantList,
    selected && styles.selected,
    className
  );

  return (
    <div
      className={cardClassName}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-pressed={onClick ? selected : undefined}
      tabIndex={onClick ? 0 : undefined}
      data-testid={testId}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {/* Badge - positioned at top-right of card */}
      {badge && (
        <div className={styles.badge}>
          <Badge variant={badgeVariant} size={badgeSize} pill={badgePill} color={badgeColor}>
            {badge}
          </Badge>
        </div>
      )}

      <div className={styles.thumbnailContainer}>
        <img
          src={image}
          alt={title}
          className={styles.thumbnail}
          loading={imageLoading}
          onLoad={onImageLoad}
          onError={onImageError}
        />
      </div>
      <div className={styles.content}>
        <div
          className={cn(
            styles.title,
            titleLines === 2 && styles.titleLines2,
            titleLines === 3 && styles.titleLines3
          )}
        >
          {title}
        </div>
        {subtitle && (
          <div
            className={cn(
              styles.subtitle,
              subtitleLines === 2 && styles.subtitleLines2,
              subtitleLines === 3 && styles.subtitleLines3
            )}
          >
            {subtitle}
          </div>
        )}
        {features && features.length > 0 && (
          <Features items={features} iconSize={12} className={styles.features} />
        )}
      </div>
    </div>
  );
};

MapPlaceCard.displayName = 'MapPlaceCard';
