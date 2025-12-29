import React from 'react';
import { Card, type CardProps } from './Card';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Alert } from '@openai/apps-sdk-ui/components/Alert';
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage';
import { EditPencil, Plus } from '@openai/apps-sdk-ui/components/Icon';
import { Skeleton } from '../Skeleton';
import styles from './ListCard.module.css';

export interface ListCardImage {
  src: string;
  alt: string;
  /**
   * Enable native lazy loading
   * @default true
   */
  lazy?: boolean;
}

export interface ListCardItem {
  /**
   * Small circular image for the list item (44x44).
   */
  image?: string | ListCardImage;

  /**
   * Item title using body-regular typography.
   */
  title: string;

  /**
   * Item subtitle using subheading-regular typography with secondary color.
   */
  subtitle?: string;

  /**
   * Item description using body-small-regular typography.
   */
  description?: string;

  /**
   * Callback when the item action button is clicked.
   */
  onItemAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Accessibility label for item action button
   * REQUIRED when onItemAction is provided for proper accessibility
   */
  actionLabel?: string;

  /**
   * Callback when item image loads successfully
   */
  onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Callback when item image fails to load
   */
  onImageError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

export interface ListCardProps extends Omit<CardProps, 'children'> {
  /**
   * Top image displayed at 210px height.
   */
  topImage?: string | ListCardImage;

  /**
   * Header title using body-emph typography.
   */
  headerTitle?: string;

  /**
   * Callback when the header action button is clicked.
   */
  onHeaderAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Array of list items to display.
   */
  items?: ListCardItem[];

  /**
   * Button text. If provided, action button will be displayed.
   */
  buttonText?: string;

  /**
   * Callback when the action button is clicked.
   */
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Whether the action button is disabled.
   */
  buttonDisabled?: boolean;

  /**
   * Loading state - shows skeleton UI
   * @default false
   */
  loading?: boolean;

  /**
   * Number of skeleton items to show during loading
   * @default 3
   */
  loadingItemCount?: number;

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
   * @default 'No items'
   */
  emptyTitle?: string;

  /**
   * Empty state message
   */
  emptyMessage?: string;

  /**
   * Empty state icon (React element, e.g., icon component from apps-sdk-ui)
   */
  emptyIcon?: React.ReactNode;

  /**
   * Native browser loading behavior for the top image.
   * - 'lazy': Defers loading until image is near viewport (default, best for below-the-fold)
   * - 'eager': Loads immediately (use for above-the-fold images)
   * @default 'lazy'
   */
  topImageLoading?: 'lazy' | 'eager';

  /**
   * Native browser loading behavior for item images.
   * - 'lazy': Defers loading until image is near viewport (default, best for below-the-fold)
   * - 'eager': Loads immediately (use for above-the-fold images)
   * @default 'lazy'
   */
  itemImagesLoading?: 'lazy' | 'eager';

  /**
   * Callback when top image loads successfully
   */
  onTopImageLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Callback when top image fails to load
   */
  onTopImageError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Accessibility label for header action button
   * REQUIRED when onHeaderAction is provided for proper accessibility
   */
  headerActionLabel?: string;
}

// Helper function to normalize image input
const normalizeImage = (image: string | ListCardImage): ListCardImage => {
  if (typeof image === 'string') {
    return { src: image, alt: '', lazy: true };
  }
  return { lazy: true, ...image };
};

export const ListCard = React.forwardRef<HTMLDivElement, ListCardProps>((props, ref) => {
  const {
    topImage,
    headerTitle,
    onHeaderAction = undefined,
    items = [],
    buttonText,
    onButtonClick,
    buttonDisabled = false,
    loading = false,
    loadingItemCount = 3,
    error = false,
    errorTitle = 'Failed to load',
    errorMessage,
    onErrorRetry,
    emptyTitle = 'No items',
    emptyMessage,
    emptyIcon,
    topImageLoading = 'lazy',
    itemImagesLoading = 'lazy',
    onTopImageLoad,
    onTopImageError,
    headerActionLabel,
    ...cardProps
  } = props;

  // Development mode validation for accessibility
  if (process.env.NODE_ENV !== 'production') {
    if (onHeaderAction && !headerActionLabel) {
      console.error(
        'ListCard: headerActionLabel is required when onHeaderAction is provided. ' +
          'Provide a descriptive label for accessibility (e.g., "Edit playlist", "Manage items").'
      );
    }
    items.forEach((item, index) => {
      if (item.onItemAction && !item.actionLabel) {
        console.error(
          `ListCard: actionLabel is required for item ${index} when onItemAction is provided. ` +
            `Provide a descriptive label for accessibility (e.g., "Add ${item.title} to cart").`
        );
      }
    });
  }

  const hasTopImage = !!topImage;
  const hasHeader = !!headerTitle || !!onHeaderAction;
  const hasItems = items.length > 0;
  const hasButton = !!buttonText;
  const isEmpty = !loading && !error && items.length === 0;

  const topImageData = topImage ? normalizeImage(topImage) : null;

  return (
    <Card ref={ref} padding={0} {...cardProps}>
      {/* Wrapper to prevent Card's gap from affecting ListCard layout */}
      <div className={styles.contentWrapper}>
        {/* Loading State Overlay */}
        {loading && !error && (
          <div className={styles.loadingContainer} role="status" aria-live="polite">
            {/* Header Skeleton */}
            {hasHeader && (
              <div className={styles.header}>
                <Skeleton width="60%" height={24} />
              </div>
            )}

            {/* List Items Skeleton */}
            <div className={styles.listContainer}>
              {Array.from({ length: loadingItemCount }).map((_, index) => (
                <div key={index}>
                  <div className={styles.listItem}>
                    <div className={styles.itemHeader}>
                      <Skeleton width={44} height={44} borderRadius="50%" />
                      <div className={styles.itemTextContent}>
                        <Skeleton width="70%" height={16} />
                        <Skeleton width="50%" height={14} />
                      </div>
                    </div>
                  </div>
                  {index < loadingItemCount - 1 && <div className={styles.divider} />}
                </div>
              ))}
            </div>

            <span className={styles.visuallyHidden}>Loading list content</span>
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
              data-testid="list-card-error"
            />
          </div>
        )}

        {/* Empty State */}
        {isEmpty && (
          <div className={styles.emptyContainer}>
            {/* Keep header if present */}
            {hasHeader && (
              <div className={styles.header}>
                {headerTitle && <h3 className={styles.headerTitle}>{headerTitle}</h3>}
                {onHeaderAction && (
                  <Button
                    color="secondary"
                    variant="ghost"
                    uniform
                    size="sm"
                    onClick={onHeaderAction}
                    aria-label={headerActionLabel || 'Edit'}
                    className={styles.headerActionButton}
                  >
                    <EditPencil />
                  </Button>
                )}
              </div>
            )}

            <div className={styles.emptyState}>
              <EmptyMessage fill="none">
                {emptyIcon && <EmptyMessage.Icon>{emptyIcon}</EmptyMessage.Icon>}
                <EmptyMessage.Title>{emptyTitle}</EmptyMessage.Title>
                {emptyMessage && <EmptyMessage.Description>{emptyMessage}</EmptyMessage.Description>}
              </EmptyMessage>
            </div>
          </div>
        )}

        {/* Normal Content - only show when not loading, not error, and has items */}
        {!loading && !error && hasItems && (
          <>
            {/* Top Image */}
            {hasTopImage && topImageData && (
              <div className={styles.topImageContainer}>
                <img
                  src={topImageData.src}
                  alt={topImageData.alt}
                  className={styles.topImage}
                  loading={topImageData.lazy === false ? 'eager' : topImageLoading}
                  onLoad={onTopImageLoad}
                  onError={onTopImageError}
                />
              </div>
            )}

            {/* Header */}
            {hasHeader && (
              <div className={styles.header}>
                {headerTitle && <h3 className={styles.headerTitle}>{headerTitle}</h3>}
                {onHeaderAction && (
                  <Button
                    color="secondary"
                    variant="ghost"
                    uniform
                    size="sm"
                    onClick={onHeaderAction}
                    aria-label={headerActionLabel || 'Edit'}
                    className={styles.headerActionButton}
                  >
                    <EditPencil />
                  </Button>
                )}
              </div>
            )}

            {/* List Items */}
            <div className={styles.listContainer}>
              {items.map((item, index) => {
                const itemImageData = item.image ? normalizeImage(item.image) : null;
                const isLastItem = index === items.length - 1;
                const showDivider = hasButton || !isLastItem;

                return (
                  <div key={index}>
                    <div className={styles.listItem}>
                      <div className={styles.itemHeader}>
                        {itemImageData && (
                          <img
                            src={itemImageData.src}
                            alt={itemImageData.alt}
                            className={styles.itemImage}
                            loading={itemImageData.lazy === false ? 'eager' : itemImagesLoading}
                            onLoad={item.onImageLoad}
                            onError={item.onImageError}
                          />
                        )}
                        <div className={styles.itemTextContent}>
                          <div className={styles.itemTitle}>{item.title}</div>
                          {item.subtitle && (
                            <div className={styles.itemSubtitle}>{item.subtitle}</div>
                          )}
                        </div>
                        {item.onItemAction && (
                          <Button
                            color="secondary"
                            variant="ghost"
                            uniform
                            size="sm"
                            onClick={item.onItemAction}
                            aria-label={item.actionLabel || 'Add'}
                            className={styles.itemActionButton}
                          >
                            <Plus />
                          </Button>
                        )}
                      </div>
                      {item.description && (
                        <div className={styles.itemDescription}>{item.description}</div>
                      )}
                    </div>
                    {showDivider && <div className={styles.divider} />}
                  </div>
                );
              })}
              {!hasButton && <div className={styles.listBottomPadding} />}
            </div>

            {/* Action Button */}
            {hasButton && (
              <div className={styles.buttonContainer}>
                <Button
                  color="primary"
                  variant="solid"
                  size="2xl"
                  onClick={onButtonClick}
                  disabled={buttonDisabled}
                  block
                >
                  {buttonText}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
});

ListCard.displayName = 'ListCard';
