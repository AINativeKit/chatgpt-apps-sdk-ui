import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '../../utils/cn';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage';
import { XCrossed, ArrowLeftSm, ArrowRightSm } from '@openai/apps-sdk-ui/components/Icon';
import { FilmStrip } from './FilmStrip';
import type { Album } from './types';
import styles from './AlbumViewer.module.css';

export interface AlbumViewerProps {
  /**
   * Album to display
   */
  album: Album;

  /**
   * Initial photo index to display
   * @default 0
   */
  initialPhotoIndex?: number;

  /**
   * Callback when viewer is closed
   */
  onClose?: () => void;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Custom content to display when album has no photos.
   * If not provided, shows default empty state with message and close button.
   */
  emptyStateContent?: React.ReactNode;

  /**
   * Hide the viewer completely when album has no photos.
   * When true, returns null instead of showing empty state.
   * @default false
   */
  hideWhenEmpty?: boolean;
}

/**
 * AlbumViewer component - Fullscreen photo viewer with thumbnail navigation.
 *
 * Features:
 * - Fullscreen overlay display
 * - Large centered photo
 * - Film strip thumbnail navigation (desktop only)
 * - Keyboard navigation (arrow keys, escape)
 * - Close button
 *
 * @example
 * ```tsx
 * <AlbumViewer
 *   album={selectedAlbum}
 *   initialPhotoIndex={0}
 *   onClose={() => setViewerOpen(false)}
 * />
 * ```
 */
export const AlbumViewer: React.FC<AlbumViewerProps> = ({
  album,
  initialPhotoIndex = 0,
  onClose,
  className,
  emptyStateContent,
  hideWhenEmpty = false,
}) => {
  // Validate photos array
  const hasPhotos = album.photos && album.photos.length > 0;

  // Clamp initialPhotoIndex to valid range
  const validInitialIndex = hasPhotos
    ? Math.max(0, Math.min(album.photos.length - 1, initialPhotoIndex))
    : 0;

  // Initialize state - must be called unconditionally (before any early returns)
  const [currentIndex, setCurrentIndex] = React.useState(validInitialIndex);

  // Set up Embla Carousel for swipe navigation
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: false,
    containScroll: 'trimSnaps',
    startIndex: validInitialIndex,
  });

  // Reset index when album changes
  React.useEffect(() => {
    setCurrentIndex(validInitialIndex);
    if (emblaApi) {
      emblaApi.scrollTo(validInitialIndex);
    }
  }, [album.id, validInitialIndex, emblaApi]);

  // Sync embla carousel with currentIndex state
  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Check if we're actually rendering the viewer (not hiding when empty)
  const isViewerVisible = hasPhotos || !hideWhenEmpty;

  // Keyboard navigation - only when viewer is visible
  React.useEffect(() => {
    if (!isViewerVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose?.();
          break;
        case 'ArrowLeft':
          if (hasPhotos && emblaApi) {
            emblaApi.scrollPrev();
          }
          break;
        case 'ArrowRight':
          if (hasPhotos && emblaApi) {
            emblaApi.scrollNext();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isViewerVisible, hasPhotos, emblaApi, onClose]);

  // Prevent body scroll when viewer is visible
  React.useEffect(() => {
    if (!isViewerVisible) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isViewerVisible]);

  // Development warning for empty albums
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !hasPhotos) {
      console.warn('[AlbumViewer] Album has no photos. Consider checking before rendering.', {
        albumId: album.id,
        albumTitle: album.title,
      });
    }
  }, [hasPhotos, album.id, album.title]);

  // Handle empty state
  if (!hasPhotos) {
    // Hide completely if requested
    if (hideWhenEmpty) {
      return null;
    }

    // Custom empty state
    if (emptyStateContent) {
      return (
        <div className={cn(styles.albumViewer, className)} role="dialog" aria-modal="true">
          {emptyStateContent}
        </div>
      );
    }

    // Default empty state
    return (
      <div
        className={cn(styles.albumViewer, styles.empty, className)}
        role="dialog"
        aria-modal="true"
        aria-label={`${album.title} viewer`}
      >
        <div className={styles.header}>
          <Button
            color="secondary"
            variant="ghost"
            uniform
            size="md"
            onClick={onClose}
            aria-label="Close viewer"
            className={styles.closeButton}
          >
            <XCrossed />
          </Button>
        </div>
        <div className={styles.emptyState}>
          <EmptyMessage fill="none">
            <EmptyMessage.Title>No photos available</EmptyMessage.Title>
          </EmptyMessage>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(styles.albumViewer, className)}
      role="dialog"
      aria-modal="true"
      aria-label={`${album.title} viewer`}
    >
      {/* Close Button */}
      <div className={styles.header}>
        <Button
          color="secondary"
          variant="ghost"
          uniform
          size="md"
          onClick={onClose}
          aria-label="Close viewer"
          className={styles.closeButton}
        >
          <XCrossed />
        </Button>
      </div>

      <div className={styles.content}>
        {/* Film Strip - Desktop Only */}
        <div className={styles.filmStripContainer}>
          <FilmStrip
            photos={album.photos}
            selectedIndex={currentIndex}
            onSelect={setCurrentIndex}
            albumTitle={album.title}
            mainApi={emblaApi}
          />
        </div>

        {/* Main Photo Display */}
        <div className={styles.photoContainer} ref={emblaRef}>
          <div className={styles.photoCarouselContainer}>
            {album.photos.map((photo, index) => (
              <div key={photo.id} className={styles.photoSlide}>
                <div className={styles.photoWrapper}>
                  <img
                    src={photo.url}
                    alt={photo.alt || photo.title || `${album.title} - Photo ${index + 1}`}
                    className={styles.photo}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Mobile */}
      {album.photos.length > 1 && (
        <>
          {currentIndex > 0 && (
            <Button
              color="secondary"
              variant="ghost"
              uniform
              size="md"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous photo"
              className={cn(styles.navButton, styles.navButtonPrev)}
            >
              <ArrowLeftSm />
            </Button>
          )}
          {currentIndex < album.photos.length - 1 && (
            <Button
              color="secondary"
              variant="ghost"
              uniform
              size="md"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next photo"
              className={cn(styles.navButton, styles.navButtonNext)}
            >
              <ArrowRightSm />
            </Button>
          )}
        </>
      )}

      {/* Photo Counter - Only show when there are multiple photos */}
      {album.photos.length > 1 && (
        <div className={styles.footer}>
          <div className={styles.counter}>
            {currentIndex + 1} / {album.photos.length}
          </div>
        </div>
      )}
    </div>
  );
};

AlbumViewer.displayName = 'AlbumViewer';
