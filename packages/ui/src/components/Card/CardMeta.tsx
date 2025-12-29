import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './CardParts.module.css';

export interface CardMetaProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Optional test ID for testing purposes
   */
  'data-testid'?: string;
}

export const CardMeta = React.forwardRef<HTMLDivElement, CardMetaProps>((props, ref) => {
  const { className, children, 'data-testid': testId, ...rest } = props;

  return (
    <div ref={ref} className={clsx(styles.cardMeta, className)} data-testid={testId} {...rest}>
      {children}
    </div>
  );
});

CardMeta.displayName = 'Card.Meta';
