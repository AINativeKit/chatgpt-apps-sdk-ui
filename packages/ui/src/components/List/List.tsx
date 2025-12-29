import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import clsx from 'clsx';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Alert } from '@openai/apps-sdk-ui/components/Alert';
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage';
import { Skeleton } from '../Skeleton';
import styles from './List.module.css';

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

  /**
   * Loading state - renders items with loading context or skeleton items.
   * When true: if items provided, they render (pass loading prop to ListItem for best UX);
   * if no items, renders skeleton items based on loadingItems count.
   * @default false
   */
  loading?: boolean;

  /**
   * Number of skeleton items to show when loading and no items provided
   * @default 3
   */
  loadingItems?: number;

  /**
   * Error state - shows error message.
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

  /**
   * Empty state title when no items provided.
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
            <Skeleton width={40} height={40} borderRadius="var(--radius-md)" />
          </div>
          <div className={styles.itemBody}>
            <div className={styles.itemHeader}>
              <Skeleton width={180} height={16} />
            </div>
            <div className={styles.itemSubtitleRow} style={{ marginTop: '8px' }}>
              <Skeleton width={120} height={14} />
            </div>
          </div>
          <div className={styles.itemTrailing}>
            <Skeleton width={60} height={14} />
          </div>
        </div>
      </div>
    ));
  };

  if (error) {
    return (
      <div ref={ref} className={clsx(styles.listContainer, className)} {...rest}>
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

  const renderEmptyState = () => {
    // Custom empty state
    if (emptyState) {
      return <div className={styles.emptyContainer}>{emptyState}</div>;
    }

    // Default empty state with EmptyMessage from apps-sdk-ui
    return (
      <div className={styles.emptyContainer}>
        <EmptyMessage fill="none">
          <EmptyMessage.Title>{emptyTitle}</EmptyMessage.Title>
          {emptyMessage && <EmptyMessage.Description>{emptyMessage}</EmptyMessage.Description>}
        </EmptyMessage>
      </div>
    );
  };

  return (
    <div ref={ref} className={clsx(styles.listContainer, className)} {...rest}>
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
