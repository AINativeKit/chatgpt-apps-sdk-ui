import React from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import clsx from 'clsx';
import type { Photo } from './types';
import styles from './FilmStrip.module.css';

export interface FilmStripProps {
  /**
   * Array of photos to display as thumbnails
   */
  photos: Photo[];

  /**
   * Currently selected photo index
   */
  selectedIndex: number;

  /**
   * Callback when a thumbnail is clicked
   */
  onSelect?: (index: number) => void;

  /**
   * Album title for accessibility
   */
  albumTitle?: string;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Main carousel API for synchronization
   */
  mainApi?: EmblaCarouselType | null;
}

/**
 * FilmStrip component - Vertical thumbnail navigation for photos using native scrolling.
 *
 * Features:
 * - Vertical scrollable thumbnail list
 * - Highlights selected photo
 * - Click to navigate between photos
 * - Keyboard accessible
 *
 * @example
 * ```tsx
 * <FilmStrip
 *   photos={album.photos}
 *   selectedIndex={currentIndex}
 *   onSelect={(index) => setCurrentIndex(index)}
 *   albumTitle="Summer Vacation"
 * />
 * ```
 */
export const FilmStrip: React.FC<FilmStripProps> = ({
  photos,
  selectedIndex,
  onSelect,
  albumTitle,
  className,
  mainApi,
}) => {
  // Refs for scrollIntoView
  const thumbnailRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // Handle thumbnail click - scroll into view and notify parent
  const onThumbClick = React.useCallback(
    (index: number) => {
      // Always notify parent of selection
      onSelect?.(index);

      // Scroll thumbnail into view
      if (thumbnailRefs.current[index]) {
        thumbnailRefs.current[index]?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }

      // Scroll main carousel if API is available
      if (mainApi) {
        mainApi.scrollTo(index);
      }
    },
    [mainApi, onSelect]
  );

  // Sync thumbnail scroll when main carousel changes
  React.useEffect(() => {
    if (!mainApi) return undefined;

    const onMainSelect = () => {
      const selected = mainApi.selectedScrollSnap();

      // Scroll thumbnail into view
      if (thumbnailRefs.current[selected]) {
        thumbnailRefs.current[selected]?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    };

    // Initial scroll to selected
    if (thumbnailRefs.current[selectedIndex]) {
      thumbnailRefs.current[selectedIndex]?.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
      });
    }

    mainApi.on('select', onMainSelect);
    return () => {
      mainApi.off('select', onMainSelect);
    };
  }, [mainApi, selectedIndex]);

  return (
    <div
      className={clsx(styles.filmStrip, className)}
      role="navigation"
      aria-label="Photo thumbnails"
    >
      <div className={styles.thumbnailViewport}>
        <div className={styles.thumbnailContainer}>
          {photos.map((photo, index) => {
            const isSelected = index === selectedIndex;
            return (
              <div
                key={photo.id}
                ref={(el) => (thumbnailRefs.current[index] = el)}
                className={styles.thumbnailSlide}
              >
                <button
                  type="button"
                  onClick={() => onThumbClick(index)}
                  className={clsx(styles.thumbnail, isSelected && styles.thumbnailSelected)}
                  aria-label={photo.title || `Photo ${index + 1} of ${photos.length}`}
                  aria-current={isSelected ? 'true' : undefined}
                >
                  <div className={styles.thumbnailImageWrapper}>
                    <img
                      src={photo.url}
                      alt={photo.alt || photo.title || `${albumTitle} - Photo ${index + 1}`}
                      className={styles.thumbnailImage}
                      loading="lazy"
                    />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

FilmStrip.displayName = 'FilmStrip';
