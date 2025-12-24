import React, { type CSSProperties } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Features } from '../Feature';
import type { FeatureItem } from '../Feature';
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

// Re-export FeatureItem as Feature for backwards compatibility
export type Feature = FeatureItem;

export interface ListItemProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /**
   * Primary title for the row.
   */
  title: ReactNode;

  /**
   * Optional supporting text (e.g., city, description).
   */
  subtitle?: ReactNode;

  /**
   * Optional metadata rendered inline on mobile and in a separate column on desktop.
   */
  metadata?: ReactNode;

  /**
   * Optional visual shown to the left of the text.
   */
  media?: string | ReactNode;

  /**
   * Accessible alternative text for the media when a URL is provided.
   */
  mediaAlt?: string;

  /**
   * Optional rank or index shown on desktop.
   */
  rank?: ReactNode;

  /**
   * Optional feature list displayed below the subtitle.
   * Features can be strings or objects with optional icons.
   */
  features?: FeatureItem[];

  /**
   * Optional trailing action element (icon button, button, etc.).
   */
  action?: ReactNode;

  /**
   * Handler for trailing action clicks. Stops propagation to avoid triggering row click.
   */
  onActionClick?: (event: React.MouseEvent) => void;

  /**
   * Hide metadata from the inline mobile row.
   */
  hideMetadataOnMobile?: boolean;

  /**
   * Enable hover/focus states even without an onClick handler.
   */
  interactive?: boolean;

  /**
   * Row click handler.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Loading state for individual list items.
   * @default false
   */
  loading?: boolean;
}

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>((props, ref) => {
  const {
    title,
    subtitle,
    metadata,
    media,
    mediaAlt,
    rank,
    features,
    action,
    onActionClick,
    hideMetadataOnMobile = false,
    interactive = false,
    onClick,
    loading = false,
    className,
    ...rest
  } = props;

  const isInteractive = interactive || typeof onClick === 'function';

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  const handleActionClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onActionClick?.(event);
  };

  const handleActionKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onActionClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  const renderMedia = () => {
    if (!media) {
      return null;
    }

    if (typeof media === 'string') {
      return (
        <div className={styles.itemMedia}>
          <img
            src={media}
            alt={mediaAlt || (typeof title === 'string' ? title : '')}
            className={styles.itemMediaImage}
          />
        </div>
      );
    }

    return <div className={styles.itemMedia}>{media}</div>;
  };

  const showMetadataInline = Boolean(!hideMetadataOnMobile && metadata);
  const showSubtitle = Boolean(subtitle);
  const hasFeatures = features && features.length > 0;
  const hasSecondaryRow = hasFeatures || showMetadataInline || showSubtitle;

  // Loading state rendering
  if (loading) {
    return (
      <div
        ref={ref}
        className={cn(styles.listItemWrapper, className)}
        style={{ pointerEvents: 'none' }}
        {...rest}
      >
        <div className={styles.listItem}>
          {/* Media skeleton */}
          {(media || rank !== undefined) && (
            <div className={styles.itemMedia}>
              <Skeleton
                width={40}
                height={40}
                animation
                style={{ borderRadius: 'var(--ai-radius-md)' }}
              />
            </div>
          )}
          {rank !== undefined && (
            <div className={styles.itemRank}>
              <Skeleton width={24} height={16} animation />
            </div>
          )}

          {/* Body skeleton */}
          <div className={styles.itemBody}>
            <div className={styles.itemHeader}>
              <Skeleton width="60%" height={16} animation />
            </div>
            {(subtitle || features) && (
              <div className={styles.itemSubtitleRow} style={{ marginTop: 'var(--ai-spacing-2)' }}>
                <Skeleton width="40%" height={14} animation />
              </div>
            )}
          </div>

          {/* Trailing skeleton */}
          {(metadata || action) && (
            <div className={styles.itemTrailing}>
              <Skeleton width={60} height={14} animation />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(styles.listItemWrapper, className)}
      data-interactive={isInteractive}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      <div className={styles.listItem}>
        {renderMedia()}
        {rank !== undefined && <div className={styles.itemRank}>{rank}</div>}

        <div className={styles.itemBody}>
          <div className={styles.itemHeader}>
            <div className={styles.itemTitle}>{title}</div>
          </div>

          {hasSecondaryRow && (
            <div className={styles.itemSubtitleRow}>
              {hasFeatures && (
                <Features key="features" items={features} className={styles.itemFeature} />
              )}
              {showMetadataInline && (
                <span className={styles.itemMetadataInline} key="metadata-inline">
                  {metadata}
                </span>
              )}
              {subtitle && (
                <span className={styles.itemSubtitleText} key="subtitle">
                  {subtitle}
                </span>
              )}
            </div>
          )}
        </div>

        {(metadata || action) && (
          <div className={styles.itemTrailing}>
            {metadata && <div className={styles.itemMetadataDesktop}>{metadata}</div>}
            {action && (
              <div
                className={styles.itemAction}
                onClick={onActionClick ? handleActionClick : undefined}
                onKeyDown={onActionClick ? handleActionKeyDown : undefined}
                role={onActionClick ? 'button' : undefined}
                tabIndex={onActionClick ? 0 : undefined}
              >
                {action}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

ListItem.displayName = 'ListItem';
