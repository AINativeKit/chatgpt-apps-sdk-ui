import React from 'react';
import { User } from '@openai/apps-sdk-ui/components/Icon';
import type { GenericList as GenericListType } from './types';
import styles from './GenericList.module.css';

export interface GenericListProps {
  /**
   * List data to display.
   */
  list: GenericListType;
}

export const GenericList: React.FC<GenericListProps> = ({ list }) => {
  if (!list || list.items.length === 0) return null;

  return (
    <div className={styles.listSection}>
      <div className={styles.listTitle}>{list.title}</div>
      <div className={styles.listItems}>
        {list.items.map((item) => (
          <div key={item.id} className={styles.item}>
            {item.image && (
              <div className={styles.itemImage}>
                <img src={item.image} alt={item.title} className={styles.image} />
              </div>
            )}
            {!item.image && (
              <div className={styles.itemImage}>
                <User />
              </div>
            )}
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

GenericList.displayName = 'GenericList';
