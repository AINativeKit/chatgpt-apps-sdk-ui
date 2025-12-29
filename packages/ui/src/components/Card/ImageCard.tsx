import React, { useState } from 'react';
import clsx from 'clsx';
import { Card, type CardProps } from './Card';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Alert } from '@openai/apps-sdk-ui/components/Alert';
import { Badge, type BadgeProps } from '@openai/apps-sdk-ui/components/Badge';
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage';
import { ImageSkeleton } from '../Skeleton';
import styles from './ImageCard.module.css';

export interface ImageCardProps extends Omit<CardProps, 'children'> {
  /**
   * Image source. Accepts a URL string or an object with src and alt properties.
   * When using a string, the alt text defaults to the title prop if provided.
   */
  image: string | { src: string; alt: string };

  /**
   * Positioning of the background image within the card.
   * Useful when the image aspect ratio differs from the card.
   * - Vertical: 'center', 'top', 'bottom'
   * - Horizontal: 'left', 'right'
   * @default 'center'
   */
  imagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';

  /**
   * Card title displayed in the overlay. Only renders when provided.
   */
  title?: string;

  /**
   * Card subtitle displayed below the title. Only renders when provided.
   */
  subtitle?: string;

  /**
   * Icon element for the action button. Only renders when provided.
   * Pass a React element, e.g., `<PlusCircle />` from apps-sdk-ui.
   */
  actionIcon?: React.ReactNode;

  /**
   * Accessibility label for the action button.
   * Required when actionIcon is provided for screen reader support.
   */
  actionLabel?: string;

  /**
   * Callback fired when the action button is clicked.
   * The event is stopped from propagating to the card's onClick handler.
   */
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Size variant affecting padding and text sizes.
   * - 'default': Standard padding and text sizes
   * - 'compact': Reduced padding for denser layouts
   * @default 'default'
   */
  size?: 'default' | 'compact';

  /**
   * Minimum height for the card. Accepts a number (pixels) or CSS length value.
   */
  minHeight?: number | string;

  /**
   * CSS aspect ratio for the card (e.g., '16 / 9', '1 / 1').
   * When set, the card maintains this ratio regardless of content.
   */
  aspectRatio?: string;

  // State Management
  /**
   * When true, displays a skeleton loading state with animated placeholders.
   * @default false
   */
  loading?: boolean;

  /**
   * When true, displays an error alert instead of the image content.
   * @default false
   */
  error?: boolean;

  /**
   * Title text shown in the error alert.
   * @default 'Failed to load'
   */
  errorTitle?: string;

  /**
   * Description text shown in the error alert.
   */
  errorMessage?: string;

  /**
   * Callback for the retry button in the error state.
   * When provided, displays a retry button in the error alert.
   */
  onErrorRetry?: () => void;

  /**
   * Title text shown when the image source is empty.
   * @default 'No image'
   */
  emptyTitle?: string;

  /**
   * Description text shown in the empty state.
   */
  emptyMessage?: string;

  // Badge Support
  /**
   * Badge content displayed on the card. Accepts text or numbers.
   * Common uses: "New", "Sale", count indicators.
   */
  badge?: string | number;

  /**
   * Position of the badge on the card.
   * @default 'top-right'
   */
  badgePosition?: 'top-left' | 'top-right';

  /**
   * Visual style variant for the badge.
   * - 'solid': Filled background with high contrast (recommended for images)
   * - 'soft': Subtle tinted background
   * - 'outline': Border only with transparent background
   * @default 'solid'
   */
  badgeVariant?: BadgeProps['variant'];

  /**
   * Size of the badge. Heights: sm=18px, md=22px, lg=24px.
   * Auto-sizes to 'md' for badges longer than 4 characters.
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
   * Maximum number of lines for the subtitle before truncation with ellipsis.
   * @default 1
   */
  subtitleLines?: 1 | 2 | 3;

  // Image Callbacks
  /**
   * Callback fired when the image successfully loads.
   * Useful for tracking load performance or triggering animations.
   */
  onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Callback fired when the image fails to load.
   * Useful for fallback handling or error tracking.
   */
  onImageError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Native browser loading behavior for the image.
   * - 'lazy': Defers loading until image is near viewport (default, best for below-the-fold)
   * - 'eager': Loads immediately (use for above-the-fold images)
   * @default 'lazy'
   */
  imageLoading?: 'lazy' | 'eager';
}

/**
 * ImageCard component - Card with background image overlay.
 *
 * Features:
 * - Full background image with configurable positioning
 * - Optional text overlay (title, subtitle) with multi-line support
 * - Optional action button
 * - Optional badge support (top-left or top-right)
 * - Gradient overlay for text readability
 * - Loading and error states
 * - Native lazy loading support
 * - Image load/error callbacks
 * - Inherits all Card props (elevation, interactive, etc.)
 *
 * @example
 * ```tsx
 * import { PlusCircle } from '@openai/apps-sdk-ui/components/Icon';
 *
 * // Full featured with badge
 * <ImageCard
 *   image="https://example.com/pizza.jpg"
 *   title="Margherita Pizza"
 *   subtitle="Classic Italian"
 *   actionIcon={<PlusCircle />}
 *   onAction={() => console.log('Added')}
 *   actionLabel="Add to cart"
 *   badge="New"
 *   badgeVariant="solid"
 *   interactive
 * />
 *
 * // With loading state
 * <ImageCard
 *   image="https://example.com/pizza.jpg"
 *   title="Margherita Pizza"
 *   loading={isLoading}
 * />
 *
 * // With error state
 * <ImageCard
 *   image="https://example.com/pizza.jpg"
 *   error={hasError}
 *   errorTitle="Failed to load"
 *   errorMessage="Unable to load this image"
 *   onErrorRetry={handleRetry}
 * />
 * ```
 */
export const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>((props, ref) => {
  const {
    image,
    imagePosition = 'center',
    title,
    subtitle,
    actionIcon,
    onAction,
    actionLabel,
    size = 'default',
    minHeight,
    aspectRatio,
    loading = false,
    error = false,
    errorTitle = 'Failed to load',
    errorMessage,
    onErrorRetry,
    emptyTitle = 'No image',
    emptyMessage,
    badge,
    badgePosition = 'top-right',
    badgeVariant = 'solid',
    badgeSize,
    badgePill = true,
    badgeColor = 'secondary',
    titleLines = 1,
    subtitleLines = 1,
    onImageLoad,
    onImageError,
    imageLoading = 'lazy',
    className,
    style,
    ...cardProps
  } = props;

  const [imageLoadState, setImageLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [internalError, setInternalError] = useState(false);

  const imageSrc = typeof image === 'string' ? image : image.src;
  const imageAlt = typeof image === 'string' ? title || 'Image' : image.alt;

  const hasContent = !!(title || subtitle);
  const hasAction = !!actionIcon;
  const hasBadge = badge !== undefined && badge !== null && badge !== '';
  const isEmpty = !imageSrc;
  const isLoading = loading || imageLoadState === 'loading';
  // Show error state when error prop is true, regardless of loading state
  const hasError = error || internalError || imageLoadState === 'error';

  // State Priority: Loading > Error > Empty > Content
  const showLoading = loading || (!isEmpty && !error && isLoading && !hasError);
  const showError = !loading && error;
  const showEmpty = !loading && !error && isEmpty;

  // Development mode validation
  if (process.env.NODE_ENV !== 'production') {
    if (hasAction && !actionLabel) {
      console.error(
        'ImageCard: actionLabel is required when actionIcon is provided. ' +
          'Provide a descriptive label for accessibility (e.g., "Add to cart", "View details").'
      );
    }
    if (titleLines && (titleLines < 1 || titleLines > 3)) {
      console.warn('ImageCard: titleLines should be between 1 and 3');
    }
    if (subtitleLines && (subtitleLines < 1 || subtitleLines > 3)) {
      console.warn('ImageCard: subtitleLines should be between 1 and 3');
    }
  }

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoadState('loaded');
    setInternalError(false);
    onImageLoad?.(event);
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoadState('error');
    setInternalError(true);
    onImageError?.(event);
  };

  const positionClass = {
    center: styles.imagePositionCenter,
    top: styles.imagePositionTop,
    bottom: styles.imagePositionBottom,
    left: styles.imagePositionLeft,
    right: styles.imagePositionRight,
  }[imagePosition];

  const normalizedMinHeight = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;

  const inlineStyle = {
    ...(normalizedMinHeight ? { '--image-card-min-height': normalizedMinHeight } : {}),
    ...(aspectRatio ? { '--image-card-aspect-ratio': aspectRatio } : {}),
    ...style,
  } as React.CSSProperties;

  return (
    <Card
      ref={ref}
      padding={0}
      className={clsx(styles.imageCard, size === 'compact' && styles.imageCardCompact, className)}
      style={inlineStyle}
      {...cardProps}
    >
      {/* Native Image Element - Only render if there's an image source */}
      {!isEmpty && (
        <img
          src={imageSrc}
          alt={imageAlt}
          loading={imageLoading}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={clsx(
            styles.imageElement,
            positionClass,
            (isLoading || hasError) && styles.imageHidden
          )}
        />
      )}

      {/* Loading State Overlay */}
      {showLoading && (
        <div className={styles.loadingContainer} role="status" aria-live="polite">
          <ImageSkeleton width="100%" height="100%" iconSize={48} />
          <span className={styles.visuallyHidden}>Loading image: {title || 'content'}</span>
        </div>
      )}

      {/* Empty State */}
      {showEmpty && (
        <div className={styles.emptyContainer} data-testid="image-card-empty">
          <EmptyMessage fill="none">
            <EmptyMessage.Title>{emptyTitle}</EmptyMessage.Title>
            {emptyMessage && <EmptyMessage.Description>{emptyMessage}</EmptyMessage.Description>}
          </EmptyMessage>
        </div>
      )}

      {/* Error State Overlay */}
      {showError && (
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
            data-testid="image-card-error"
          />
        </div>
      )}

      {/* Content only visible when image loaded successfully (not loading, error, or empty) */}
      {!isLoading && !hasError && !isEmpty && (
        <>
          {/* Gradient Overlay for text readability */}
          {(hasContent || hasAction) && <div className={styles.gradientOverlay} />}

          {/* Badge */}
          {hasBadge && (
            <div
              className={clsx(
                styles.badge,
                badgePosition === 'top-left' ? styles.badgeTopLeft : styles.badgeTopRight
              )}
            >
              <Badge
                variant={badgeVariant}
                size={badgeSize ?? (String(badge).length > 4 ? 'md' : 'sm')}
                pill={badgePill}
                color={badgeColor}
              >
                {badge}
              </Badge>
            </div>
          )}

          {/* Text Content Overlay */}
          {hasContent && (
            <div className={clsx(styles.content, !hasAction && styles.contentNoAction)}>
              {title && (
                <h3 className={clsx(styles.title, styles[`titleLines${titleLines}`])}>{title}</h3>
              )}
              {subtitle && (
                <p className={clsx(styles.subtitle, styles[`subtitleLines${subtitleLines}`])}>
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Action Button - Circular dark background for WCAG contrast */}
          {hasAction && actionLabel && (
            <div className={styles.actionButton}>
              <Button
                color="secondary"
                variant="ghost"
                uniform
                size="sm"
                aria-label={`${actionLabel}${title ? ` for ${title}` : ''}`}
                onClick={onAction}
              >
                {actionIcon}
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
});

ImageCard.displayName = 'ImageCard';
