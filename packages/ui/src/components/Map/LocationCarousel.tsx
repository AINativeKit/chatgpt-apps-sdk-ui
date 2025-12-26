import React, { useRef, useEffect, useState, useMemo } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import { Carousel } from '../Carousel';
import { MapPlaceCard } from './MapPlaceCard';
import { cn } from '../../utils/cn';
import type { LocationData } from './types';
import styles from './LocationCarousel.module.css';

export interface LocationCarouselProps {
  /**
   * Array of location data to display in the carousel.
   */
  locations: LocationData[];

  /**
   * ID of the currently selected map place card.
   */
  selectedId?: string;

  /**
   * Callback when a map place card is clicked.
   */
  onLocationSelect?: (id: string | undefined) => void;

  /**
   * Additional class name for the container.
   */
  className?: string;

  /**
   * Loading state - renders skeleton map place cards
   * @default false
   */
  loading?: boolean;

  /**
   * Number of skeleton cards to show when loading
   * @default 4
   */
  loadingCardCount?: number;

  /**
   * Error state - shows error message
   * @default false
   */
  error?: boolean;

  /**
   * Custom error title
   * @default 'Failed to load locations'
   */
  errorTitle?: string;

  /**
   * Custom error message
   */
  errorMessage?: string;

  /**
   * Error retry handler - shows retry button when provided
   */
  onErrorRetry?: () => void;

  /**
   * Empty state title when no locations provided
   * @default 'No locations'
   */
  emptyTitle?: string;

  /**
   * Empty state message
   * @default 'No locations to display'
   */
  emptyMessage?: string;
}

export const LocationCarousel: React.FC<LocationCarouselProps> = ({
  locations,
  selectedId,
  onLocationSelect,
  className,
  loading = false,
  loadingCardCount = 4,
  error = false,
  errorTitle = 'Failed to load locations',
  errorMessage,
  onErrorRetry,
  emptyTitle = 'No locations',
  emptyMessage = 'No locations to display',
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);
  const prevSelectedIdRef = useRef<string | undefined>(selectedId);

  // Calculate initial index only on mount (for returning from fullscreen)
  const initialIndex = useMemo(() => {
    if (!selectedId) return 0;
    const index = locations.findIndex((location) => location.id === selectedId);
    return index >= 0 ? index : 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to selected card when selectedId changes (skip when emblaApi just became available)
  useEffect(() => {
    if (!selectedId) {
      prevSelectedIdRef.current = selectedId;
      return;
    }

    // Only scroll if selectedId actually changed (not just emblaApi becoming available)
    const selectedIdChanged = prevSelectedIdRef.current !== selectedId;
    prevSelectedIdRef.current = selectedId;

    if (!selectedIdChanged) {
      return;
    }

    if (emblaApi) {
      const index = locations.findIndex((location) => location.id === selectedId);
      if (index >= 0) {
        // Force reInit before scrolling to ensure fresh scroll position calculations
        emblaApi.reInit();
        requestAnimationFrame(() => {
          emblaApi.scrollTo(index, false);
        });
        return;
      }
    }

    // Fallback to native scrolling if Embla is not ready
    if (carouselRef.current) {
      const selectedCard = carouselRef.current.querySelector(`[data-location-id="${selectedId}"]`);
      if (selectedCard instanceof HTMLElement) {
        selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  }, [selectedId, emblaApi, locations]);

  // State Priority: Loading > Error > Empty > Content

  // Loading State
  if (loading) {
    return (
      <div className={cn(styles.locationCarousel, className)} ref={carouselRef}>
        <Carousel
          className={styles.carousel}
          align="start"
          loop={false}
          showNavigation={true}
          showEdgeGradients={false}
          gap="32px"
          flushStart={true}
          startInset="24px"
          viewportPadding="0"
        >
          {Array.from({ length: loadingCardCount }).map((_, i) => (
            <div key={i} className={styles.cardWrapper}>
              <MapPlaceCard loading />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className={cn(styles.locationCarousel, className)} ref={carouselRef}>
        <Carousel
          className={styles.carousel}
          align="start"
          loop={false}
          showNavigation={false}
          gap="32px"
          flushStart={true}
          startInset="24px"
          error={true}
          errorTitle={errorTitle}
          errorMessage={errorMessage}
          onErrorRetry={onErrorRetry}
        />
      </div>
    );
  }

  // Empty State
  if (locations.length === 0) {
    return (
      <div className={cn(styles.locationCarousel, className)} ref={carouselRef}>
        <Carousel
          className={styles.carousel}
          align="start"
          loop={false}
          showNavigation={false}
          gap="32px"
          flushStart={true}
          startInset="24px"
          emptyTitle={emptyTitle}
          emptyMessage={emptyMessage}
        />
      </div>
    );
  }

  // Normal Content
  return (
    <div className={cn(styles.locationCarousel, className)} ref={carouselRef}>
      <Carousel
        className={styles.carousel}
        align="center"
        loop={false}
        showNavigation={true}
        showEdgeGradients={false}
        gap="32px"
        flushStart={true}
        startInset="24px"
        viewportPadding="0"
        dragFree={false}
        startIndex={initialIndex}
        onApi={setEmblaApi}
      >
        {locations.map((location) => (
          <div key={location.id} className={styles.cardWrapper} data-location-id={location.id}>
            <MapPlaceCard
              image={location.thumbnail}
              title={location.name}
              subtitle={location.subtitle}
              features={location.features}
              selected={location.id === selectedId}
              onClick={() => onLocationSelect?.(location.id)}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

LocationCarousel.displayName = 'LocationCarousel';
