import React from 'react';
import type { ComponentPropsWithoutRef, SyntheticEvent } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Alert } from '@openai/apps-sdk-ui/components/Alert';
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage';
import { Badge, type BadgeProps } from '@openai/apps-sdk-ui/components/Badge';
import { Skeleton, ImageSkeleton } from '../Skeleton';
import type { Album } from './types';
import styles from './AlbumCard.module.css';

export interface AlbumCardProps extends Omit<ComponentPropsWithoutRef<'button'>, 'onSelect'> {
  /**
   * Album data to display
   */
  album: Album;

  /**
   * Callback when album card is clicked
   */
  onSelect?: (album: Album) => void;

  /**
   * Width of the card
   * @default '272px'
   */
  width?: string;

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
   * @default 'No album'
   */
  emptyTitle?: string;

  /**
   * Empty state message
   */
  emptyMessage?: string;

  // Image Controls
  /**
   * Enable lazy loading for cover image
   * @default true
   */
  imageLazy?: boolean;

  /**
   * Callback when cover image loads
   */
  onImageLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Callback when cover image fails to load
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
    errorTitle = 'Failed to load',
    errorMessage,
    onErrorRetry,
    emptyTitle = 'No album',
    emptyMessage,
    imageLazy = true,
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    // Only call onSelect if event wasn't prevented
    if (!event.defaultPrevented) {
      onSelect?.(album);
    }
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
            actions={
              onErrorRetry ? (
                <Button color="primary" size="sm" variant="ghost" onClick={onErrorRetry}>
                  Retry
                </Button>
              ) : undefined
            }
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
        <img
          src={album.cover}
          alt={album.title}
          className={styles.image}
          loading={imageLazy ? 'lazy' : 'eager'}
          onLoad={onImageLoad}
          onError={onImageError}
        />
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
