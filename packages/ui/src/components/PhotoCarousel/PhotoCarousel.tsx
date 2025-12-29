import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Overlay } from '../Overlay';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { ChevronLeftMd, ChevronRightMd } from '@openai/apps-sdk-ui/components/Icon';
import clsx from 'clsx';
import styles from './PhotoCarousel.module.css';

export interface PhotoCarouselProps {
  /**
   * Array of image URLs to display in the carousel
   */
  images: string[];

  /**
   * Optional overlay content to display on top of photos (e.g., branding, logo)
   */
  topOverlay?: React.ReactNode;

  /**
   * Aspect ratio for photos (CSS aspect-ratio value)
   * @default '16/9'
   * @example '16/9', '4/3', '1/1', '21/9'
   */
  aspectRatio?: string;

  /**
   * Show navigation dots
   * @default true
   */
  showDots?: boolean;

  /**
   * Show previous/next arrow buttons
   * @default true
   */
  showArrows?: boolean;

  /**
   * Callback when photo index changes
   */
  onPhotoChange?: (index: number) => void;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Error state
   * @default false
   */
  error?: boolean;
}

/**
 * PhotoCarousel - Embla-based photo carousel with navigation dots and arrows.
 * Lightweight component for inline photo viewing (not fullscreen).
 *
 * @example
 * ```tsx
 * <PhotoCarousel
 *   images={['photo1.jpg', 'photo2.jpg', 'photo3.jpg']}
 *   aspectRatio="16/9"
 *   topOverlay={
 *     <PhotoCarousel.Overlay background="#0066CC" align="center">
 *       <img src="logo.png" alt="Agency" style={{ height: 24 }} />
 *     </PhotoCarousel.Overlay>
 *   }
 * />
 * ```
 */
export const PhotoCarousel: React.FC<PhotoCarouselProps> = ({
  images,
  topOverlay,
  aspectRatio = '16/9',
  showDots = true,
  showArrows = true,
  onPhotoChange,
  className,
  loading = false,
  error = false,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    onPhotoChange?.(index);
  }, [emblaApi, onPhotoChange]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  // Loading state
  if (loading) {
    return (
      <div className={clsx(styles.photoCarousel, className)} style={{ aspectRatio }}>
        <div className={styles.loading}>Loading photos...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={clsx(styles.photoCarousel, className)} style={{ aspectRatio }}>
        <div className={styles.error}>Failed to load photos</div>
      </div>
    );
  }

  // Empty state
  if (!images || images.length === 0) {
    return (
      <div className={clsx(styles.photoCarousel, className)} style={{ aspectRatio }}>
        <div className={styles.empty}>No photos available</div>
      </div>
    );
  }

  const hasPrev = selectedIndex > 0;
  const hasNext = selectedIndex < images.length - 1;

  return (
    <div className={clsx(styles.photoCarousel, className)} style={{ aspectRatio }}>
      {/* Embla Carousel */}
      <div className={styles.emblaViewport} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {images.map((image, index) => (
            <div key={index} className={styles.emblaSlide}>
              <img
                src={image}
                alt={`Photo ${index + 1} of ${images.length}`}
                className={styles.photo}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Top Overlay (branding, logo, etc.) */}
      {topOverlay}

      {/* Navigation Arrows */}
      {showArrows && images.length > 1 && hasPrev && (
        <Button
          color="secondary"
          variant="ghost"
          uniform
          size="md"
          onClick={scrollPrev}
          aria-label="Previous photo"
          className={clsx(styles.navButton, styles.navButtonPrev)}
        >
          <ChevronLeftMd />
        </Button>
      )}
      {showArrows && images.length > 1 && hasNext && (
        <Button
          color="secondary"
          variant="ghost"
          uniform
          size="md"
          onClick={scrollNext}
          aria-label="Next photo"
          className={clsx(styles.navButton, styles.navButtonNext)}
        >
          <ChevronRightMd />
        </Button>
      )}

      {/* Navigation Dots */}
      {showDots && images.length > 1 && (
        <div className={styles.dotsContainer}>
          {images.map((_, index) => (
            <button
              key={index}
              className={clsx(styles.dot, index === selectedIndex && styles.dotActive)}
              onClick={() => scrollTo(index)}
              aria-label={`Go to photo ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : 'false'}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
};

PhotoCarousel.displayName = 'PhotoCarousel';

// Create typed PhotoCarousel with Overlay subcomponent
export const PhotoCarouselWithOverlay = PhotoCarousel as typeof PhotoCarousel & {
  Overlay: typeof Overlay;
};

// Attach shared Overlay component for convenience
PhotoCarouselWithOverlay.Overlay = Overlay;
