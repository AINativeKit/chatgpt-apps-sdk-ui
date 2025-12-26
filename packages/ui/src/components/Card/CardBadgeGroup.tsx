import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../utils/cn';
import styles from './CardParts.module.css';

export interface CardBadgeGroupProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Optional test ID for testing purposes
   */
  'data-testid'?: string;
}

export const CardBadgeGroup = React.forwardRef<HTMLDivElement, CardBadgeGroupProps>(
  (props, ref) => {
    const { className, children, 'data-testid': testId, ...rest } = props;

    return (
      <div
        ref={ref}
        className={cn(styles.cardBadgeGroup, className)}
        data-testid={testId}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

CardBadgeGroup.displayName = 'Card.BadgeGroup';
