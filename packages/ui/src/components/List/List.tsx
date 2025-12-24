import React, { type CSSProperties } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Alert } from '@openai/apps-sdk-ui/components/Alert';
import styles from './List.module.css';

/**
 * Simple inline skeleton placeholder for loading states
 */
const Skeleton = ({
  width,
  height,
  animation = true,
  style,
}: {
  width?: string | number;
  height?: string | number;
  animation?: boolean;
  style?: CSSProperties;
}) => (
  <div
    style={{
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : (height ?? '1em'),
      backgroundColor: 'var(--color-background-primary-soft, rgba(0,0,0,0.1))',
      borderRadius: 'var(--radius-sm, 4px)',
      animation: animation ? 'pulse 1.5s ease-in-out infinite' : undefined,
      ...style,
    }}
  />
);

export interface ListHeaderProps {
  /**
   * Primary heading for the list.
   */
  title: ReactNode;

  /**
   * Optional supporting text shown under the title.
   */
  subtitle?: ReactNode;

  /**
   * Optional visual shown to the left of the title.
   * Provide a string URL or a custom ReactNode.
   */
  thumbnail?: string | ReactNode;

  /**
   * Accessible alternative text for the thumbnail when a URL is provided.
   */
  thumbnailAlt?: string;

  /**
   * Optional action element rendered on the right (desktop) or below (mobile).
   */
  action?: ReactNode;
}

export interface ListProps<T = unknown> extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * Optional header configuration (title, subtitle, thumbnail, actions).
   */
  header?: ListHeaderProps;

  /**
   * Array of data items to render.
   */
  items: T[];

  /**
   * Render function for list rows.
   */
  renderItem: (item: T, index: number) => ReactNode;

  /**
   * Message to show when the list is empty.
   * @default "No items found."
   */
  emptyMessage?: ReactNode;

  /**
   * Controls whether divider lines are rendered between rows.
   * @default true
   */
  showDividers?: boolean;

  // Phase 1: Loading State
  /**
   * Loading state - renders items with loading context or skeleton items
   * @default false
   *
   * @remarks
   * When true:
   * - If items array has content, they will be rendered (pass items with loading prop for best UX)
   * - If no items, renders skeleton list items based on loadingItems count
   */
  loading?: boolean;

  /**
   * Number of skeleton items to show when loading and no items provided
   * @default 3
   */
  loadingItems?: number;

  // Phase 1: Error State
  /**
   * Error state - shows error message
   * @default false
   */
  error?: boolean;

  /**
   * Custom error title
   * @default 'Failed to load items'
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

  // Phase 1: Enhanced Empty State
  /**
   * Empty state title when no items provided
   * @default 'No items'
   */
  emptyTitle?: string;

  /**
   * Custom empty state content
   */
  emptyState?: React.ReactNode;
}

const ListInner = <T,>(props: ListProps<T>, ref: React.ForwardedRef<HTMLDivElement>) => {
  const {
    header,
    items,
    renderItem,
    emptyMessage = 'No items found.',
    showDividers = true,
    // Phase 1 props
    loading = false,
    loadingItems = 3,
    error = false,
    errorTitle = 'Failed to load items',
    errorMessage,
    onErrorRetry,
    emptyTitle = 'No items',
    emptyState,
    className,
    ...rest
  } = props;

  const renderHeaderThumbnail = () => {
    if (!header?.thumbnail) {
      return null;
    }

    if (typeof header.thumbnail === 'string') {
      const alt =
        header.thumbnailAlt || (typeof header.title === 'string' ? header.title : 'List thumbnail');

      return (
        <div className={styles.headerMedia}>
          <img src={header.thumbnail} alt={alt} className={styles.headerMediaImage} />
        </div>
      );
    }

    return <div className={styles.headerMedia}>{header.thumbnail}</div>;
  };

  // Phase 1: Loading State - Smart loading based on items
  const renderLoading = () => {
    const itemCount = items.length;

    // If items provided, render them (they should have loading prop set)
    // This provides seamless transition as items maintain their structure
    if (itemCount > 0) {
      return items.map((item, index) => renderItem(item, index));
    }

    // Fallback: No items provided, show generic skeleton items
    return Array.from({ length: loadingItems }).map((_, i) => (
      <div key={i} className={styles.listItemWrapper} style={{ pointerEvents: 'none' }}>
        <div className={styles.listItem}>
          <div className={styles.itemMedia}>
            <Skeleton
              width={40}
              height={40}
              animation
              style={{ borderRadius: 'var(--radius-md)' }}
            />
          </div>
          <div className={styles.itemBody}>
            <div className={styles.itemHeader}>
              <Skeleton width="60%" height={16} animation />
            </div>
            <div className={styles.itemSubtitleRow} style={{ marginTop: 'var(8px)' }}>
              <Skeleton width="40%" height={14} animation />
            </div>
          </div>
          <div className={styles.itemTrailing}>
            <Skeleton width={60} height={14} animation />
          </div>
        </div>
      </div>
    ));
  };

  // Phase 1: Error State - Early return
  if (error) {
    return (
      <div ref={ref} className={cn(styles.listContainer, className)} {...rest}>
        {header && (
          <div className={styles.listHeader}>
            <div className={styles.headerRow}>
              {renderHeaderThumbnail()}
              <div className={styles.headerText}>
                <h2 className={styles.headerTitle}>{header.title}</h2>
                {header.subtitle && <p className={styles.headerSubtitle}>{header.subtitle}</p>}
              </div>
            </div>
          </div>
        )}
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

  // Phase 1: Enhanced Empty State
  const renderEmptyState = () => {
    // Custom empty state
    if (emptyState) {
      return <div className={styles.emptyContainer}>{emptyState}</div>;
    }

    // Default empty state with title and message
    if (emptyTitle || emptyMessage) {
      return (
        <div className={styles.emptyContainer}>
          <div className={styles.emptyContent}>
            <div className={styles.emptyTitle}>{emptyTitle}</div>
            {emptyMessage && <div className={styles.emptyMessage}>{emptyMessage}</div>}
          </div>
        </div>
      );
    }

    // Fallback to old behavior
    return <div className={styles.emptyState}>{emptyMessage}</div>;
  };

  return (
    <div ref={ref} className={cn(styles.listContainer, className)} {...rest}>
      {header && (
        <div className={styles.listHeader}>
          <div className={styles.headerRow}>
            {renderHeaderThumbnail()}
            <div className={styles.headerText}>
              <h2 className={styles.headerTitle}>{header.title}</h2>
              {header.subtitle && <p className={styles.headerSubtitle}>{header.subtitle}</p>}
            </div>
            {header.action && <div className={styles.headerActionDesktop}>{header.action}</div>}
          </div>
        </div>
      )}

      <div className={styles.listItems} data-show-dividers={showDividers}>
        {loading
          ? renderLoading()
          : items.length > 0
            ? items.map((item, index) => renderItem(item, index))
            : renderEmptyState()}
      </div>

      {header?.action && <div className={styles.headerActionMobile}>{header.action}</div>}
    </div>
  );
};

export const List = React.forwardRef(ListInner) as <T>(
  props: ListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(List as any).displayName = 'List';

export type { ListItemProps, Feature } from './ListItem';
export { ListItem } from './ListItem';
