import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './CardParts.module.css';

export interface CardImageProps extends ComponentPropsWithoutRef<'img'> {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for accessibility
   */
  alt: string;
  /**
   * Optional aspect ratio for the image (e.g., "16/9", "3/2", "1/1")
   */
  aspectRatio?: string;
  /**
   * Optional test ID for testing purposes
   */
  'data-testid'?: string;
}

export const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>((props, ref) => {
  const { className, src, alt, aspectRatio, style, 'data-testid': testId, ...rest } = props;

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={clsx(styles.cardImage, className)}
      data-testid={testId}
      style={{
        ...(aspectRatio
          ? ({ '--card-image-aspect-ratio': aspectRatio } as React.CSSProperties)
          : {}),
        ...style,
      }}
      {...rest}
    />
  );
});

CardImage.displayName = 'Card.Image';
