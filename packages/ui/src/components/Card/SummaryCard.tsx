import React from 'react';
import { cn } from '../../utils/cn';
import { Card, type CardProps } from './Card';
import { Badge, type BadgeProps } from '@openai/apps-sdk-ui/components/Badge';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Alert } from '@openai/apps-sdk-ui/components/Alert';
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage';
import { Overlay, type OverlayProps } from '../Overlay';
import { Skeleton, ImageSkeleton } from '../Skeleton';
import styles from './SummaryCard.module.css';

/** Badge variant type for compatibility */
export type BadgeVariant = BadgeProps['variant'];

export interface SummaryCardImage {
  src: string;
  alt: string;
  /**
   * Enable lazy loading for this specific image
   * @default true
   */
  lazy?: boolean;
}

/**
 * Metadata item for SummaryCard
 *
 * @example
 * ```tsx
 * import { Clock, Calendar } from '@openai/apps-sdk-ui/components/Icon';
 *
 * const metadata: SummaryCardMetadata[] = [
 *   { icon: <Clock />, label: '10 min read' },
 *   { icon: <Calendar />, label: 'Oct 30, 2025' }
 * ];
 * ```
 */
export interface SummaryCardMetadata {
  /**
   * Icon to display - pass a React element (e.g., icon component from apps-sdk-ui)
   */
  icon?: React.ReactNode;
  /**
   * Label text to display next to the icon
   */
  label: string;
  /**
   * Separator to display after this item (e.g., "•", "|")
   * Not displayed for the last item
   * @default undefined
   */
  separator?: string;
}

export interface SummaryCardProps extends Omit<CardProps, 'children'> {
  /**
   * Single image or array of 1-3 images.
   * Single image will be displayed large, 3 images in a grid.
   */
  images?: string | SummaryCardImage | Array<string | SummaryCardImage>;

  /**
   * Main title using heading3 typography.
   */
  title?: string;

  /**
   * Subtitle using bodySmall typography.
   */
  subtitle?: string;

  /**
   * Badge content (e.g., rating like "9.2").
   */
  badge?: string | number;

  /**
   * Badge variant style
   * @default 'soft'
   */
  badgeVariant?: BadgeVariant;

  /**
   * Badge size
   * @default 'sm' (auto-sizes to 'md' for longer badges)
   */
  badgeSize?: BadgeProps['size'];

  /**
   * Badge pill shape (fully rounded)
   * @default false
   */
  badgePill?: boolean;

  /**
   * Badge color
   * @default 'secondary'
   */
  badgeColor?: BadgeProps['color'];

  /**
   * Card variant
   * - "default": Standard card with padding and elevation
   * - "flat": Edge-to-edge layout with no padding or elevation
   * @default "default"
   */
  variant?: 'default' | 'flat';

  /**
   * Card size/density
   * - "default": Spacious layout, heading3 title, bodySmall subtitle
   * - "compact": Dense layout, bodyEmph title, caption subtitle (DiscoveryCard style)
   * @default "default"
   */
  size?: 'default' | 'compact';

  /**
   * Image aspect ratio for single images
   * - "auto": Natural aspect ratio (current behavior)
   * - "16/9": Widescreen
   * - "4/3": Classic (DiscoveryCard default)
   * - "1/1": Square
   * @default "auto"
   */
  imageAspectRatio?: 'auto' | '16/9' | '4/3' | '1/1';

  /**
   * Description text using bodySmall with secondary color.
   */
  description?: string;

  /**
   * Number of lines to display for description text
   * Applies line-clamp to actual content and determines skeleton line count
   * @default 2
   */
  descriptionLines?: number;

  /**
   * Metadata items to display below description (e.g., read time, date).
   * Array of items with optional icon and label.
   *
   * When loading={true}, the skeleton will automatically render the same number
   * of skeleton placeholders as items in the metadata array (similar to descriptionLines behavior).
   *
   * Icons should be React elements from @openai/apps-sdk-ui/components/Icon.
   *
   * @example
   * ```tsx
   * import { Clock, CalendarToday } from '@openai/apps-sdk-ui/components/Icon';
   *
   * // Using apps-sdk-ui icons
   * metadata={[
   *   { icon: <Clock />, label: '10 min read' },
   *   { icon: <CalendarToday />, label: 'Oct 30, 2025' }
   * ]}
   *
   * // Using custom SVG icons
   * metadata={[
   *   { icon: <svg>...</svg>, label: '625m²' }
   * ]}
   * ```
   */
  metadata?: SummaryCardMetadata[];

  /**
   * Button text. If provided, button will be displayed.
   */
  buttonText?: string;

  /**
   * Button click handler.
   */
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Button disabled state.
   */
  buttonDisabled?: boolean;

  /**
   * Button width behavior
   * - undefined: Auto (full-width for default variant, auto-width for flat variant)
   * - true: Full width (100%)
   * - false: Auto width (min 120px)
   * @default undefined (auto based on variant)
   */
  buttonFullWidth?: boolean;

  // Phase 1: Critical Improvements (P0)
  /**
   * Loading state - shows skeleton UI
   * @default false
   */
  loading?: boolean;

  /**
   * Number of skeleton images to show during loading
   * @default 1 for single, 3 for grid
   */
  loadingImageCount?: number;

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
   * Error retry handler - shows retry button when provided
   */
  onErrorRetry?: () => void;

  /**
   * Empty state title
   * @default 'No content'
   */
  emptyTitle?: string;

  /**
   * Empty state message
   */
  emptyMessage?: string;

  // Phase 2: Performance & Accessibility (P1)
  /**
   * Enable lazy loading for all images
   * @default true
   */
  imageLazy?: boolean;

  /**
   * Callback when a single image loads successfully
   */
  onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Callback when a single image fails to load
   */
  onImageError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Callback when a grid image loads successfully (includes index)
   */
  onImagesLoad?: (index: number, event: React.SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Callback when a grid image fails to load (includes index)
   */
  onImagesError?: (index: number, event: React.SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Custom overlay content to render at the top of the image
   * Can be used for logos, badges, or any custom React elements
   *
   * @example
   * ```tsx
   * <SummaryCard
   *   images="property.jpg"
   *   topOverlay={
   *     <SummaryCard.Overlay background="dark" height={40} align="center">
   *       <img src="logo.png" alt="Company Logo" style={{ height: 24 }} />
   *     </SummaryCard.Overlay>
   *   }
   * />
   * ```
   */
  topOverlay?: React.ReactNode;
}

/**
 * Normalize image input to SummaryCardImage format
 */
const normalizeImage = (image: string | SummaryCardImage): SummaryCardImage => {
  if (typeof image === 'string') {
    return { src: image, alt: '' };
  }
  return image;
};

/**
 * Props for SummaryCard.Overlay helper component
 * @deprecated Use OverlayProps from shared Overlay component
 */
export type SummaryCardOverlayProps = OverlayProps;

/**
 * SummaryCard component for displaying entity information with images.
 *
 * Features:
 * - Flexible image layout (single large or 3-image grid)
 * - Optional header with title, subtitle, and badge
 * - Optional description text
 * - Optional action button
 * - All sections conditionally rendered
 * - Composition pattern wrapping Card component
 *
 * @example
 * ```tsx
 * // Restaurant card with single image
 * <SummaryCard
 *   images="restaurant.jpg"
 *   title="Little Nona's"
 *   subtitle="1427 Via Campania"
 *   badge="9.2"
 *   description="A tiny, brick-walled trattoria tucked down a side street..."
 *   buttonText="Add to order"
 *   onButtonClick={() => console.log('clicked')}
 * />
 *
 * // Card with 3 images
 * <SummaryCard
 *   images={[
 *     { src: 'img1.jpg', alt: 'Restaurant exterior' },
 *     { src: 'img2.jpg', alt: 'Pizza' },
 *     { src: 'img3.jpg', alt: 'Pasta' },
 *   ]}
 *   title="Little Nona's"
 *   badge="9.2"
 *   badgeVariant="solid"
 * />
 * ```
 */
const SummaryCardComponent = React.forwardRef<HTMLDivElement, SummaryCardProps>((props, ref) => {
  const {
    images,
    title,
    subtitle,
    badge,
    badgeVariant = 'soft',
    badgeSize,
    badgePill = false,
    badgeColor = 'secondary',
    variant = 'default',
    size = 'default',
    imageAspectRatio = 'auto',
    description,
    descriptionLines = 2,
    metadata,
    buttonText,
    onButtonClick,
    buttonDisabled = false,
    buttonFullWidth,
    // Phase 1 props
    loading = false,
    loadingImageCount,
    error = false,
    errorTitle = 'Failed to load',
    errorMessage,
    onErrorRetry,
    emptyTitle = 'No content',
    emptyMessage,
    // Phase 2 props
    imageLazy = true,
    onImageLoad,
    onImageError,
    onImagesLoad,
    onImagesError,
    topOverlay,
    className,
    ...cardProps
  } = props;

  // Normalize images to array
  const imageArray = images
    ? Array.isArray(images)
      ? images.map(normalizeImage)
      : [normalizeImage(images)]
    : [];

  const hasImages = imageArray.length > 0;
  const isSingleImage = imageArray.length === 1;
  const isGridImages = imageArray.length >= 2; // Changed: handle 2+ images including overflow
  const displayImages = imageArray.slice(0, 4); // Limit to max 4 images
  const hasOverflow = imageArray.length > 4;
  const imageCount = displayImages.length;
  const hasHeader = !!(title || subtitle || badge);
  const hasDescription = !!description;
  const hasButton = !!buttonText;

  // Phase 1: State logic
  const isEmpty = !loading && !error && !hasImages && !title && !description && !hasButton;
  const defaultLoadingCount = hasImages && !isSingleImage ? 3 : 1;
  const skeletonImageCount = loadingImageCount ?? defaultLoadingCount;

  // Button width logic: auto-determine based on variant if not explicitly set
  // Default variant: full-width, Flat variant: auto-width (not full)
  const isButtonFullWidth = buttonFullWidth ?? variant === 'default';

  // Calculate approximate button skeleton width based on text length
  // Average character width ~8px + padding (24px each side = 48px total)
  const buttonSkeletonWidth = buttonText
    ? Math.max(88, Math.min(buttonText.length * 8 + 48, 200))
    : 140;

  // Helper to render badge
  const renderBadge = () => {
    if (badge === undefined) return null;

    const badgeText = String(badge);
    return (
      <Badge
        variant={badgeVariant}
        size={badgeSize ?? (badgeText.length > 4 ? 'md' : 'sm')}
        pill={badgePill}
        color={badgeColor}
        className={styles.badge}
      >
        {badge}
      </Badge>
    );
  };

  return (
    <Card
      ref={ref}
      padding={variant === 'flat' ? 0 : 8}
      elevationLevel={variant === 'flat' ? 0 : cardProps.elevationLevel}
      className={cn(styles.summaryCard, className)}
      data-size={size}
      data-variant={variant}
      {...cardProps}
    >
      {/* Loading State - Single Image  */}
      {loading && isSingleImage && (
        <div className={styles.loadingContainer} role="status" aria-live="polite">
          {/* Image Skeleton */}
          <div className={styles.imageSection}>
            <div className={styles.skeletonImageContainer} data-aspect={imageAspectRatio}>
              <ImageSkeleton width="100%" height="100%" borderRadius={16} iconSize={40} />
            </div>
          </div>

          {/* Content Skeleton */}
          {(hasHeader || hasDescription || metadata) && (
            <div className={styles.contentSection}>
              {hasHeader && (
                <div className={styles.titleRow}>
                  <div className={styles.titleGroup}>
                    <Skeleton width="60%" height={24} />
                    {subtitle && <Skeleton width="40%" height={16} />}
                  </div>
                  {badge && <Skeleton width={50} height={28} borderRadius={14} />}
                </div>
              )}

              {/* Metadata Skeleton */}
              {metadata && metadata.length > 0 && (
                <div className={styles.metadata}>
                  {metadata.map((_, index) => (
                    <Skeleton key={index} width={60} height={20} borderRadius={8} />
                  ))}
                </div>
              )}

              {hasDescription && (
                <div
                  className={styles.descriptionSkeleton}
                  style={{ '--description-lines': descriptionLines } as React.CSSProperties}
                >
                  {Array.from({ length: descriptionLines }).map((_, index) => (
                    <Skeleton
                      key={index}
                      width={index === descriptionLines - 1 ? '80%' : '100%'}
                      height={size === 'compact' ? 16 : 20}
                      style={index > 0 && size !== 'compact' ? { marginTop: '2px' } : undefined}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Button Skeleton */}
          {hasButton && (
            <div className={styles.buttonSection} data-full-width={isButtonFullWidth}>
              <div
                className={styles.buttonSkeletonWrapper}
                style={
                  !isButtonFullWidth
                    ? ({
                        '--button-skeleton-width': `${buttonSkeletonWidth}px`,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                <Skeleton width="100%" height={44} borderRadius={22} />
              </div>
            </div>
          )}

          <span className={styles.visuallyHidden}>Loading summary</span>
        </div>
      )}

      {/* Loading State - Grid Images */}
      {loading && isGridImages && (
        <div className={styles.loadingContainer} role="status" aria-live="polite">
          {/* Grid Skeleton */}
          <div className={styles.imageSection}>
            <div className={styles.imageGrid} data-image-count={skeletonImageCount}>
              {Array.from({ length: Math.min(skeletonImageCount, 4) }).map((_, index) => (
                <Skeleton key={index} width="100%" height="100%" borderRadius={4} />
              ))}
            </div>
          </div>

          {/* Content Skeleton */}
          {(hasHeader || hasDescription || metadata) && (
            <div className={styles.contentSection}>
              {hasHeader && (
                <div className={styles.titleRow}>
                  <div className={styles.titleGroup}>
                    <Skeleton width="60%" height={24} />
                    {subtitle && <Skeleton width="40%" height={16} />}
                  </div>
                  {badge && <Skeleton width={50} height={28} borderRadius={14} />}
                </div>
              )}

              {hasDescription && (
                <div
                  className={styles.descriptionSkeleton}
                  style={{ '--description-lines': descriptionLines } as React.CSSProperties}
                >
                  {Array.from({ length: descriptionLines }).map((_, index) => (
                    <Skeleton
                      key={index}
                      width={index === descriptionLines - 1 ? '80%' : '100%'}
                      height={size === 'compact' ? 16 : 20}
                      style={index > 0 && size !== 'compact' ? { marginTop: '2px' } : undefined}
                    />
                  ))}
                </div>
              )}

              {/* Metadata Skeleton */}
              {metadata && metadata.length > 0 && (
                <div className={styles.metadata}>
                  {metadata.map((_, index) => (
                    <Skeleton key={index} width={60} height={20} borderRadius={8} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Button Skeleton */}
          {hasButton && (
            <div className={styles.buttonSection} data-full-width={isButtonFullWidth}>
              <div
                className={styles.buttonSkeletonWrapper}
                style={
                  !isButtonFullWidth
                    ? ({
                        '--button-skeleton-width': `${buttonSkeletonWidth}px`,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                <Skeleton width="100%" height={44} borderRadius={22} />
              </div>
            </div>
          )}

          <span className={styles.visuallyHidden}>Loading summary</span>
        </div>
      )}

      {/* Loading State - No Images */}
      {loading && !hasImages && (
        <div className={styles.loadingContainer} role="status" aria-live="polite">
          {/* Content Skeleton */}
          {(hasHeader || hasDescription || metadata) && (
            <div className={styles.contentSection}>
              {hasHeader && (
                <div className={styles.titleRow}>
                  <div className={styles.titleGroup}>
                    <Skeleton width="60%" height={24} />
                    {subtitle && <Skeleton width="40%" height={16} />}
                  </div>
                  {badge && <Skeleton width={50} height={28} borderRadius={14} />}
                </div>
              )}

              {hasDescription && (
                <div
                  className={styles.descriptionSkeleton}
                  style={{ '--description-lines': descriptionLines } as React.CSSProperties}
                >
                  {Array.from({ length: descriptionLines }).map((_, index) => (
                    <Skeleton
                      key={index}
                      width={index === descriptionLines - 1 ? '80%' : '100%'}
                      height={size === 'compact' ? 16 : 20}
                      style={index > 0 && size !== 'compact' ? { marginTop: '2px' } : undefined}
                    />
                  ))}
                </div>
              )}

              {/* Metadata Skeleton */}
              {metadata && metadata.length > 0 && (
                <div className={styles.metadata}>
                  {metadata.map((_, index) => (
                    <Skeleton key={index} width={60} height={20} borderRadius={8} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Button Skeleton */}
          {hasButton && (
            <div className={styles.buttonSection} data-full-width={isButtonFullWidth}>
              <div
                className={styles.buttonSkeletonWrapper}
                style={
                  !isButtonFullWidth
                    ? ({
                        '--button-skeleton-width': `${buttonSkeletonWidth}px`,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                <Skeleton width="100%" height={44} borderRadius={22} />
              </div>
            </div>
          )}

          <span className={styles.visuallyHidden}>Loading summary</span>
        </div>
      )}

      {/* Error State Overlay */}
      {error && !loading && (
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
            data-testid="summary-card-error"
          />
        </div>
      )}

      {/* Empty State */}
      {isEmpty && (
        <div className={styles.emptyContainer}>
          {/* Keep header if present */}
          {hasHeader && (
            <div className={styles.titleRow}>
              <div className={styles.titleGroup}>
                {title && <h3 className={styles.title}>{title}</h3>}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              </div>
              {renderBadge()}
            </div>
          )}

          <div className={styles.emptyState}>
            <EmptyMessage fill="none">
              <EmptyMessage.Title>{emptyTitle}</EmptyMessage.Title>
              {emptyMessage && <EmptyMessage.Description>{emptyMessage}</EmptyMessage.Description>}
            </EmptyMessage>
          </div>
        </div>
      )}

      {/* Normal Content */}
      {!error && !isEmpty && !loading && (
        <>
          {/* Image Section */}
          {hasImages && (
            <div className={styles.imageWrapper} data-has-overlay={topOverlay ? 'true' : undefined}>
              <div className={styles.imageSection}>
                {isSingleImage && (
                  <img
                    src={imageArray[0].src}
                    alt={imageArray[0].alt}
                    className={styles.imageSingle}
                    data-aspect={imageAspectRatio}
                    loading={imageArray[0].lazy !== false && imageLazy ? 'lazy' : 'eager'}
                    onLoad={onImageLoad}
                    onError={onImageError}
                  />
                )}
                {isGridImages && (
                  <>
                    <div className={styles.imageGrid} data-image-count={imageCount}>
                      {displayImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          className={styles.imageGridItem}
                          loading={image.lazy !== false && imageLazy ? 'lazy' : 'eager'}
                          onLoad={onImagesLoad ? (e) => onImagesLoad(index, e) : undefined}
                          onError={onImagesError ? (e) => onImagesError(index, e) : undefined}
                        />
                      ))}
                      {hasOverflow && (
                        <div className={styles.overflowIndicator}>+{imageArray.length - 4}</div>
                      )}
                    </div>
                  </>
                )}
              </div>
              {topOverlay && topOverlay}
            </div>
          )}

          {/* Content Section - Groups all content: title, metadata, description */}
          {(hasHeader || hasDescription || metadata) && (
            <div className={styles.contentSection}>
              {/* Title Row - Title/subtitle + badge */}
              {hasHeader && (
                <div className={styles.titleRow}>
                  <div className={styles.titleGroup}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                  </div>
                  {renderBadge()}
                </div>
              )}

              {/* Metadata Section */}
              {metadata && metadata.length > 0 && (
                <div className={styles.metadata}>
                  {metadata.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className={styles.metadataItem}>
                        {item.icon && <span className={styles.customIcon}>{item.icon}</span>}
                        <span>{item.label}</span>
                      </div>
                      {item.separator && index < metadata.length - 1 && (
                        <span className={styles.metadataSeparator}>{item.separator}</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* Description Section */}
              {hasDescription && (
                <p
                  className={styles.description}
                  style={{ '--description-lines': descriptionLines } as React.CSSProperties}
                >
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Action Button */}
          {hasButton && (
            <div className={styles.buttonSection} data-full-width={isButtonFullWidth}>
              <Button
                color="primary"
                variant="solid"
                size={size === 'compact' ? 'lg' : '2xl'}
                onClick={onButtonClick}
                disabled={buttonDisabled}
                block={isButtonFullWidth}
                className={styles.button}
              >
                {buttonText}
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
});

SummaryCardComponent.displayName = 'SummaryCard';

// Create typed SummaryCard with Overlay subcomponent
export const SummaryCard = SummaryCardComponent as typeof SummaryCardComponent & {
  Overlay: typeof Overlay;
};

// Attach shared Overlay component to SummaryCard
SummaryCard.Overlay = Overlay;
