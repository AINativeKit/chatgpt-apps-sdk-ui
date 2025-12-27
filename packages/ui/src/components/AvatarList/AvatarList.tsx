import React from 'react';
import { Avatar } from '@openai/apps-sdk-ui/components/Avatar';
import { cn } from '../../utils/cn';
import styles from './AvatarList.module.css';

export interface AvatarListItem {
  /**
   * Unique identifier for the list item.
   */
  id: string;

  /**
   * Item title or name.
   */
  title: string;

  /**
   * Optional image URL for the avatar.
   * Falls back to initials from title if not provided.
   */
  image?: string;

  /**
   * Optional description or content.
   */
  description?: string;

  /**
   * Optional metadata (author, date, rating, etc.).
   * Displayed above the title in a smaller font.
   */
  metadata?: string;
}

export interface AvatarListProps {
  /**
   * Optional section title displayed above the list.
   */
  title?: string;

  /**
   * Array of items to display.
   */
  items: AvatarListItem[];

  /**
   * Size of the avatar in pixels.
   * @default 32
   */
  avatarSize?: number;

  /**
   * Additional class name.
   */
  className?: string;
}

/**
 * AvatarList - Renders a titled list with avatar and metadata for each item.
 * Useful for displaying reviews, comments, user lists, activity feeds, etc.
 *
 * Uses apps-sdk-ui Avatar component which shows:
 * - Image if `item.image` is provided
 * - Initials from `item.title` as fallback
 */
export const AvatarList: React.FC<AvatarListProps> = ({
  title,
  items,
  avatarSize = 32,
  className,
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={cn(styles.list, className)}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.items}>
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <Avatar imageUrl={item.image} name={item.title} size={avatarSize} />
            <div className={styles.itemContent}>
              {item.metadata && <div className={styles.itemMetadata}>{item.metadata}</div>}
              <div className={styles.itemTitle}>{item.title}</div>
              {item.description && <div className={styles.itemDescription}>{item.description}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

AvatarList.displayName = 'AvatarList';
