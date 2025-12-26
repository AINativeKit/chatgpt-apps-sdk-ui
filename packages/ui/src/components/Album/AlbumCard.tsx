import React from 'react';
import type { ComponentPropsWithoutRef, SyntheticEvent } from 'react';
import { cn } from '../../utils/cn';
import { Alert } from '@openai/apps-sdk-ui/components/Alert';
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage';
import { Badge, type BadgeProps } from '@openai/apps-sdk-ui/components/Badge';
import { Skeleton, ImageSkeleton } from '../Skeleton';
import type { Album } from './types';
import styles from './AlbumCard.module.css';

export interface AlbumCardProps extends Omit<ComponentPropsWithoutRef<'button'>, 'onSelect'> {
  /**
   * Album data object containing id, title, cover image URL, and photos array.
   * The photo count is derived from photos.length.
   */
  album: Album;

  /**
   * Callback fired when the album card is clicked.
   * Receives the album object as an argument.
   */
  onSelect?: (album: Album) => void;

  /**
   * Card width. Accepts any valid CSS width value.
   * @default '272px'
   */
  width?: string;

  // State Management
  /**
   * When true, displays a skeleton loading state with animated placeholders.
   * @default false
   */
  loading?: boolean;

  /**
   * When true, displays an error alert instead of the album content.
   * @default false
   */
  error?: boolean;

  /**
   * Title text shown in the error alert.
   * @default 'Album unavailable'
   */
  errorTitle?: string;

  /**
   * Description text shown in the error alert.
   * @default 'This album could not be loaded'
   */
  errorMessage?: string;

  /**
   * Title text shown when the album has no content (empty cover, title, and photos).
   * @default 'No album'
   */
  emptyTitle?: string;

  /**
   * Description text shown in the empty state.
   */
  emptyMessage?: string;

  // Image Controls
  /**
   * Native browser loading behavior for the cover image.
   * - 'lazy': Defers loading until image is near viewport (default, best for below-the-fold)
   * - 'eager': Loads immediately (use for above-the-fold images)
   * @default 'lazy'
   */
  imageLoading?: 'lazy' | 'eager';

  /**
   * Callback fired when the cover image successfully loads.
   * Useful for tracking image load performance or triggering animations.
   */
  onImageLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Callback fired when the cover image fails to load.
   * Useful for fallback handling or error tracking.
   */
  onImageError?: (event: SyntheticEvent<HTMLImageElement>) => void;

  // Badge Support
  /**
   * Badge content displayed on the card. Accepts text or numbers.
   * Common uses: "New", "Featured", count indicators.
   */
  badge?: string | number;

  /**
   * Position of the badge on the card.
   * @default 'top-right'
   */
  badgePosition?: 'top-left' | 'top-right';

  /**
   * Visual style variant for the badge.
   * - 'solid': Filled background with high contrast
   * - 'soft': Subtle tinted background
   * - 'outline': Border only with transparent background
   * @default 'soft'
   */
  badgeVariant?: BadgeProps['variant'];

  /**
   * Size of the badge. Heights: sm=18px, md=22px, lg=24px.
   * @default 'sm'
   */
  badgeSize?: BadgeProps['size'];

  /**
   * When true, renders the badge with fully rounded (pill) corners.
   * Recommended for numeric badges.
   * @default true
   */
  badgePill?: boolean;

  /**
   * Semantic color for the badge.
   * - 'secondary': Neutral gray
   * - 'success': Green for positive states
   * - 'danger': Red for errors/warnings
   * - 'warning': Orange for caution
   * - 'info': Blue for informational
   * - 'discovery': Purple for new/featured
   * @default 'secondary'
   */
  badgeColor?: BadgeProps['color'];

  // Text Display
  /**
   * Maximum number of lines for the title before truncation with ellipsis.
   * @default 1
   */
  titleLines?: 1 | 2 | 3;

  /**
   * Maximum number of lines for the subtitle (photo count) before truncation.
   * @default 1
   */
  subtitleLines?: 1 | 2 | 3;

  /**
   * Test ID for automated testing.
   */
  'data-testid'?: string;
}

/**
 * AlbumCard component - Display album cover with title and photo count below.
 *
 * Features:
 * - Shows album cover image with rounded corners and shadow
 * - Displays album title below the image
 * - Shows number of photos below the title
 * - Clickable to open album viewer
 * - Loading, error, and empty states
 * - Native lazy loading with callbacks
 * - Badge support for indicators
 * - Multi-line text support
 * - Matches OpenAI Albums design
 *
 * @example
 * ```tsx
 * // Basic usage with badge
 * <AlbumCard
 *   album={{
 *     id: '1',
 *     title: 'Summer Vacation',
 *     cover: 'https://example.com/cover.jpg',
 *     photos: [...]
 *   }}
 *   onSelect={(album) => console.log('Selected:', album)}
 *   badge="New"
 *   badgeVariant="solid"
 *   badgeColor="info"
 * />
 *
 * // With pill badge
 * <AlbumCard
 *   album={{...}}
 *   badge={15}
 *   badgePill
 *   badgeColor="secondary"
 * />
 * ```
 */
export const AlbumCard = React.forwardRef<HTMLButtonElement, AlbumCardProps>((props, ref) => {
  const {
    album,
    onSelect,
    onClick,
    className,
    width = '272px',
    style,
    loading = false,
    error = false,
    errorTitle = 'Album unavailable',
    errorMessage = 'This album could not be loaded',
    emptyTitle = 'No album',
    emptyMessage,
    imageLoading = 'lazy',
    onImageLoad,
    onImageError,
    badge,
    badgePosition = 'top-right',
    badgeVariant = 'soft',
    badgeSize = 'sm',
    badgePill = true,
    badgeColor = 'secondary',
    titleLines = 1,
    subtitleLines = 1,
    'data-testid': testId,
    ...buttonProps
  } = props;

  const [imageError, setImageError] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    // Only call onSelect if event wasn't prevented
    if (!event.defaultPrevented) {
      onSelect?.(album);
    }
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    onImageError?.(event);
  };

  const photoCount = album.photos.length;
  const isEmpty = !album.cover && !album.title && photoCount === 0;

  // State Priority: Loading > Error > Empty > Content
  const showLoading = loading;
  const showError = !loading && error;
  const showEmpty = !loading && !error && isEmpty;

  // Loading State
  if (showLoading) {
    return (
      <div
        className={cn(styles.albumCard, styles.loadingCard, className)}
        style={{ width, ...style }}
        role="status"
        aria-live="polite"
        data-testid={testId}
      >
        <span className={styles.visuallyHidden}>Loading album</span>
        <div className={styles.imageContainer}>
          <ImageSkeleton width="100%" height="100%" className={styles.skeletonImage} iconSize={40} />
        </div>
        <div className={styles.content}>
          <Skeleton width="80%" height={16} className={styles.skeletonTitle} />
          <Skeleton width="40%" height={14} className={styles.skeletonSubtitle} />
        </div>
      </div>
    );
  }

  // Error State
  if (showError) {
    return (
      <div
        className={cn(styles.albumCard, styles.errorCard, className)}
        style={{ width, ...style }}
        data-testid={testId}
      >
        <div className={styles.errorContainer}>
          <Alert
            color="danger"
            variant="soft"
            title={errorTitle}
            description={errorMessage}
          />
        </div>
      </div>
    );
  }

  // Empty State
  if (showEmpty) {
    return (
      <div
        className={cn(styles.albumCard, styles.emptyCard, className)}
        style={{ width, ...style }}
        data-testid={testId}
      >
        <div className={styles.emptyContainer}>
          <EmptyMessage fill="none">
            <EmptyMessage.Title>{emptyTitle}</EmptyMessage.Title>
            {emptyMessage && <EmptyMessage.Description>{emptyMessage}</EmptyMessage.Description>}
          </EmptyMessage>
        </div>
      </div>
    );
  }

  // Normal Content
  return (
    <button
      ref={ref}
      type="button"
      className={cn(styles.albumCard, className)}
      onClick={handleClick}
      style={{ width, ...style }}
      data-testid={testId}
      {...buttonProps}
    >
      {/* Album Cover Image */}
      <div className={styles.imageContainer}>
        {imageError ? (
          <div className={styles.imageFallback}>
            <ImageSkeleton width="100%" height="100%" iconSize={40} />
          </div>
        ) : (
          <img
            src={album.cover}
            alt={album.title}
            className={styles.image}
            loading={imageLoading}
            onLoad={onImageLoad}
            onError={handleImageError}
          />
        )}
        {/* Badge */}
        {badge && (
          <div
            className={cn(
              styles.badge,
              badgePosition === 'top-left' ? styles.badgeTopLeft : styles.badgeTopRight
            )}
          >
            <Badge variant={badgeVariant} size={badgeSize} pill={badgePill} color={badgeColor}>
              {badge}
            </Badge>
          </div>
        )}
      </div>

      {/* Album Info */}
      <div className={styles.content}>
        <div
          className={cn(
            styles.title,
            titleLines === 2 && styles.titleLines2,
            titleLines === 3 && styles.titleLines3
          )}
        >
          {album.title}
        </div>
        <div
          className={cn(
            styles.subtitle,
            subtitleLines === 2 && styles.subtitleLines2,
            subtitleLines === 3 && styles.subtitleLines3
          )}
        >
          {photoCount} photo{photoCount !== 1 ? 's' : ''}
        </div>
      </div>
    </button>
  );
});

AlbumCard.displayName = 'AlbumCard';
