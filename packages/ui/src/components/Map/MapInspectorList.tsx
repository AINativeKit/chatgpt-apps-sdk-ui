import React from 'react';
import { Avatar } from '@openai/apps-sdk-ui/components/Avatar';
import type { MapInspectorList as MapInspectorListType } from './types';
import styles from './MapInspectorList.module.css';

export interface MapInspectorListProps {
  /**
   * List data to display. Contains title and items array.
   * Returns null if list is empty or undefined.
   */
  list: MapInspectorListType;
}

/**
 * MapInspectorList - Renders a titled list with avatar and metadata for each item.
 * Used internally by MapInspector to display reviews, features, etc.
 *
 * Uses apps-sdk-ui Avatar component which shows:
 * - Image if `item.image` is provided
 * - Initials from `item.title` as fallback
 *
 * @internal
 */
export const MapInspectorList: React.FC<MapInspectorListProps> = ({ list }) => {
  if (!list || list.items.length === 0) return null;

  return (
    <div className={styles.listSection}>
      <div className={styles.listTitle}>{list.title}</div>
      <div className={styles.listItems}>
        {list.items.map((item) => (
          <div key={item.id} className={styles.item}>
            <Avatar imageUrl={item.image} name={item.title} size={32} />
            <div className={styles.itemMeta}>
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

MapInspectorList.displayName = 'MapInspectorList';
