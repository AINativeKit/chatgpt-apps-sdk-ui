import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './CardParts.module.css';

export interface CardHeaderProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Optional test ID for testing purposes
   */
  'data-testid'?: string;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>((props, ref) => {
  const { className, children, 'data-testid': testId, ...rest } = props;

  return (
    <div ref={ref} className={clsx(styles.cardHeader, className)} data-testid={testId} {...rest}>
      {children}
    </div>
  );
});

CardHeader.displayName = 'Card.Header';
