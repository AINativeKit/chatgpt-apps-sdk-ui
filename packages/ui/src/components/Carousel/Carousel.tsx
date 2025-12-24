import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Alert } from '@openai/apps-sdk-ui/components/Alert';
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage';
import { ChevronLeftMd, ChevronRightMd } from '@openai/apps-sdk-ui/components/Icon';
import { Card } from '../Card';
import { cn } from '../../utils/cn';
import styles from './Carousel.module.css';

export interface CarouselProps {
  /**
   * Slide content - typically Card components.
   * Optional when using loading, error, or empty states.
   */
  children?: React.ReactNode;

  /**
   * Alignment of slides within the viewport.
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end';

  /**
   * Enable infinite looping.
   * @default false
   */
  loop?: boolean;

  /**
   * Show navigation buttons (prev/next arrows).
   * @default true
   */
  showNavigation?: boolean;

  /**
   * Show edge gradient overlays.
   * @default true
   */
  showEdgeGradients?: boolean;

  /**
   * Gap between slides using CSS custom property.
   * @default 'var(32px)'
   */
  gap?: string;

  /**
   * Callback when slide changes.
   */
  onSlideChange?: (index: number) => void;

  /**
   * Additional class name for the container.
   */
  className?: string;

  /**
   * Additional inline styles for the container.
   */
  style?: React.CSSProperties;

  /**
   * Remove the leading offset so the first slide is flush with the viewport start.
   * @default false
   */
  flushStart?: boolean;

  /**
   * Custom left inset inside the carousel container.
   * Useful for re-introducing padding when using `flushStart`.
   * @default '0'
   */
  startInset?: string;

  /**
   * Custom viewport padding (top and bottom).
   * @default '0'
   */
  viewportPadding?: string;

  /**
   * Optional callback that receives the Embla API instance once ready.
   */
  onApi?: (api: EmblaCarouselType | null) => void;

  /**
   * Enable drag-free scrolling (free-scrolling without snapping to slides).
   * @default true
   */
  dragFree?: boolean;

  // Phase 1: Loading State
  /**
   * Loading state - renders children with loading prop or skeleton slides
   * @default false
   *
   * @remarks
   * When true:
   * - If children are provided, they will be rendered (pass Cards with loading prop for best UX)
   * - If no children, renders skeleton slides based on loadingSlides count
   */
  loading?: boolean;

  /**
   * Number of skeleton slides to show when loading and no children provided
   * @default 6
   */
  loadingSlides?: number;

  // Phase 1: Error State
  /**
   * Error state - shows error message
   * @default false
   */
  error?: boolean;

  /**
   * Custom error title
   * @default 'Failed to load items'
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

  // Phase 1: Empty State
  /**
   * Empty state title when no children provided
   * @default 'No items'
   */
  emptyTitle?: string;

  /**
   * Empty state message
   */
  emptyMessage?: string;

  /**
   * Custom empty state content
   */
  emptyState?: React.ReactNode;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  align = 'center',
  loop = false,
  showNavigation = true,
  showEdgeGradients = true,
  gap = 'var(32px)',
  onSlideChange,
  className,
  style,
  flushStart = false,
  startInset,
  viewportPadding,
  onApi,
  dragFree = true,
  // Phase 1 props
  loading = false,
  loadingSlides = 6,
  error = false,
  errorTitle = 'Failed to load items',
  errorMessage,
  onErrorRetry,
  emptyTitle = 'No items',
  emptyMessage,
  emptyState,
}) => {
  // All hooks must be called before any conditional returns
  const options: EmblaOptionsType = {
    align,
    loop,
    containScroll: loop ? 'keepSnaps' : 'trimSnaps',
    slidesToScroll: 'auto',
    dragFree,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [WheelGesturesPlugin()]);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);
  const containerStyle = {
    '--carousel-gap': gap,
    ...(startInset !== undefined ? { '--carousel-start-inset': startInset } : {}),
  } as React.CSSProperties;

  // Move all hooks to the top before any conditional returns
  React.useEffect(() => {
    if (!onApi) return;
    onApi(emblaApi ?? null);
    return () => {
      onApi(null);
    };
  }, [emblaApi, onApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const updateButtons = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());

      if (onSlideChange) {
        onSlideChange(emblaApi.selectedScrollSnap());
      }
    };

    updateButtons();
    emblaApi.on('select', updateButtons);
    emblaApi.on('reInit', updateButtons);

    return () => {
      emblaApi.off('select', updateButtons);
      emblaApi.off('reInit', updateButtons);
    };
  }, [emblaApi, onSlideChange]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Phase 1: Loading State - Smart loading based on children
  if (loading) {
    const childCount = React.Children.count(children);
    const loadingChildren =
      childCount > 0
        ? children
        : Array.from({ length: loadingSlides }).map((_, i) => (
            <div key={i} style={{ width: '240px', flexShrink: 0 }}>
              <Card
                loading
                elevationLevel={1}
                style={{
                  width: '100%',
                  minHeight: '240px',
                  padding: 'var(64px)',
                }}
              />
            </div>
          ));

    // Render static (non-scrollable) loading carousel
    return (
      <div className={cn(styles.carouselContainer, className)} style={style}>
        {/* Navigation Buttons (disabled during loading) */}
        {showNavigation && (
          <>
            <Button
              color="secondary"
              variant="ghost"
              uniform
              size="md"
              className={cn(styles.navButton, styles.navButtonPrev)}
              disabled
              aria-label="Previous slide"
            >
              <ChevronLeftMd />
            </Button>
            <Button
              color="secondary"
              variant="ghost"
              uniform
              size="md"
              className={cn(styles.navButton, styles.navButtonNext)}
              disabled
              aria-label="Next slide"
            >
              <ChevronRightMd />
            </Button>
          </>
        )}

        {/* Edge Gradients */}
        {showEdgeGradients && (
          <>
            <div className={cn(styles.edgeGradient, styles.edgeGradientLeft)} />
            <div className={cn(styles.edgeGradient, styles.edgeGradientRight)} />
          </>
        )}

        <div
          className={styles.emblaViewport}
          style={
            {
              ...(viewportPadding ? { '--carousel-viewport-padding': viewportPadding } : {}),
              pointerEvents: 'none',
              userSelect: 'none',
            } as React.CSSProperties
          }
        >
          <div
            className={cn(styles.emblaContainer, flushStart && styles.emblaContainerFlushStart)}
            style={containerStyle}
          >
            {React.Children.map(loadingChildren, (child, index) => (
              <div
                key={index}
                className={cn(
                  styles.emblaSlide,
                  flushStart && index === 0 && styles.emblaSlideFlushStart
                )}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Phase 1: Error State - Early return
  if (error) {
    return (
      <div className={cn(styles.carouselContainer, className)} style={style}>
        <div className={styles.errorContainer}>
          <Alert
            color="danger"
            variant="soft"
            title={errorTitle}
            description={errorMessage}
            actions={
              onErrorRetry ? (
                <Button color="primary" size="sm" variant="ghost" onClick={onErrorRetry}>
                  Retry
                </Button>
              ) : undefined
            }
          />
        </div>
      </div>
    );
  }

  // Phase 1: Empty State - Early return
  const childCount = React.Children.count(children);

  if (childCount === 0) {
    // Custom empty state
    if (emptyState) {
      return (
        <div className={cn(styles.carouselContainer, className)} style={style}>
          <div className={styles.emptyContainer}>{emptyState}</div>
        </div>
      );
    }

    // Default empty state
    return (
      <div className={cn(styles.carouselContainer, className)} style={style}>
        <div className={styles.emptyContainer}>
          <EmptyMessage fill="none">
            <EmptyMessage.Title>{emptyTitle}</EmptyMessage.Title>
            {emptyMessage && <EmptyMessage.Description>{emptyMessage}</EmptyMessage.Description>}
          </EmptyMessage>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(styles.carouselContainer, className)} style={style}>
      {/* Embla Viewport */}
      <div
        className={styles.emblaViewport}
        ref={emblaRef}
        style={
          viewportPadding
            ? ({ '--carousel-viewport-padding': viewportPadding } as React.CSSProperties)
            : undefined
        }
      >
        <div
          className={cn(styles.emblaContainer, flushStart && styles.emblaContainerFlushStart)}
          style={containerStyle}
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className={`${styles.emblaSlide} ${flushStart ? styles.emblaSlideFlushStart : ''}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Edge Gradients */}
      {showEdgeGradients && (
        <>
          <div
            className={`${styles.edgeGradient} ${styles.edgeGradientLeft}`}
            style={{ opacity: canPrev ? 1 : 0 }}
            aria-hidden="true"
          />
          <div
            className={`${styles.edgeGradient} ${styles.edgeGradientRight}`}
            style={{ opacity: canNext ? 1 : 0 }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Navigation Buttons */}
      {showNavigation && canPrev && (
        <Button
          color="secondary"
          variant="ghost"
          uniform
          size="md"
          onClick={scrollPrev}
          aria-label="Previous slide"
          className={`${styles.navButton} ${styles.navButtonPrev}`}
        >
          <ChevronLeftMd />
        </Button>
      )}
      {showNavigation && canNext && (
        <Button
          color="secondary"
          variant="ghost"
          uniform
          size="md"
          onClick={scrollNext}
          aria-label="Next slide"
          className={`${styles.navButton} ${styles.navButtonNext}`}
        >
          <ChevronRightMd />
        </Button>
      )}
    </div>
  );
};

Carousel.displayName = 'Carousel';
