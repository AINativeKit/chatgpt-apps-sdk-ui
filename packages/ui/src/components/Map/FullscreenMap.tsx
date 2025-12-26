import React, { Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MapSidebar } from './MapSidebar';
import { MapInspector } from './MapInspector';
import { LocationCarousel } from './LocationCarousel';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { CollapseLg, Maps } from '@openai/apps-sdk-ui/components/Icon';
import { ErrorStateDisplay } from './ErrorStateDisplay';
import { getErrorState, resolveErrorStateValues } from './useErrorState';
import { cn } from '../../utils/cn';
import { ImageSkeleton } from '../Skeleton';
import type { LocationData } from './types';
import type { MapViewProps } from './MapView';
import styles from './FullscreenMap.module.css';

// Lazy load MapContent to avoid SSR issues with Leaflet
const MapContent = lazy(() =>
  import('./MapContent').then((module) => ({ default: module.MapContent }))
);

export interface FullscreenMapProps extends Omit<MapViewProps, 'selectedId' | 'onLocationSelect'> {
  /**
   * Currently selected location ID (parent controls selection).
   */
  selectedId?: string;

  /**
   * Callback when location is selected (parent handles state updates).
   */
  onLocationSelect?: (id: string | undefined) => void;

  /**
   * Container height.
   */
  height?: string | number;

  /**
   * Additional class name for the container.
   */
  className?: string;

  /**
   * Loading state - renders skeleton UI
   * @default false
   */
  loading?: boolean;

  /**
   * Error state - shows error message
   * @default false
   */
  error?: boolean;

  /**
   * Custom error title
   * @default 'Failed to load map'
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

  /**
   * Callback when user clicks the collapse button to exit fullscreen.
   */
  onCollapse?: () => void;
}

const LoadingFallback: React.FC<{ height?: string | number }> = ({ height }) => (
  <div className={styles.loadingContainer} style={{ height }}>
    <ImageSkeleton width="100%" height="100%" icon={<Maps />} iconSize={48} borderRadius={0} />
  </div>
);

export const FullscreenMap: React.FC<FullscreenMapProps> = ({
  locations,
  selectedId,
  onLocationSelect,
  height = '100vh',
  className,
  loading = false,
  error = false,
  errorTitle = 'Failed to load map',
  errorMessage,
  onErrorRetry,
  emptyTitle = 'No locations',
  emptyMessage = 'No locations to display',
  onCollapse,
  scrollWheelZoom = true,
  ...mapProps
}) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectedLocation = selectedId ? locations.find((loc) => loc.id === selectedId) : undefined;

  // Wrapper for MapSidebar which expects (location: LocationData)
  const handleSidebarSelect = (location: LocationData) => {
    onLocationSelect?.(location.id);
  };

  const handleCloseInspector = () => {
    onLocationSelect?.(undefined);
  };

  // State Priority: Loading > Error > Empty > Content
  const { isLoading, isError, isEmpty } = getErrorState({
    loading,
    error,
    isEmpty: locations.length === 0,
  });

  const resolvedValues = resolveErrorStateValues(
    { errorTitle, errorMessage, emptyTitle, emptyMessage, onErrorRetry },
    {
      errorTitle: 'Failed to load map',
      errorMessage: 'Unable to retrieve location data. Please try again.',
      emptyTitle: 'No locations',
      emptyMessage: 'No locations to display',
    }
  );

  // Loading State
  if (isLoading || !isMounted || typeof window === 'undefined') {
    return <LoadingFallback height={height} />;
  }

  // Error State - centered overlay without map
  if (isError) {
    return (
      <div className={cn(styles.container, className)} style={{ height }}>
        <div className={styles.stateOverlay}>
          <ErrorStateDisplay
            state="error"
            title={resolvedValues.errorTitle}
            message={resolvedValues.errorMessage}
            onAction={resolvedValues.onErrorRetry}
          />
        </div>
      </div>
    );
  }

  // Empty State - centered overlay without map
  if (isEmpty) {
    return (
      <div className={cn(styles.container, className)} style={{ height }}>
        <div className={styles.stateOverlay}>
          <ErrorStateDisplay
            state="empty"
            title={resolvedValues.emptyTitle}
            message={resolvedValues.emptyMessage}
          />
        </div>
      </div>
    );
  }

  // Normal Content
  return (
    <div className={cn(styles.container, className)} style={{ height }}>
      {/* Collapse Button */}
      {onCollapse && (
        <Button
          color="secondary"
          variant="ghost"
          uniform
          size="md"
          onClick={onCollapse}
          aria-label="Collapse map to compact view"
          className={styles.collapseButton}
        >
          <CollapseLg />
        </Button>
      )}

      {/* Desktop Sidebar */}
      <MapSidebar locations={locations} selectedId={selectedId} onSelect={handleSidebarSelect} />

      {/* Desktop Inspector (slides in from right) */}
      <AnimatePresence>
        {selectedLocation && (
          <MapInspector location={selectedLocation} onClose={handleCloseInspector} />
        )}
      </AnimatePresence>

      {/* Map Container */}
      <div className={styles.mapWrapper}>
        <Suspense fallback={<LoadingFallback height={height} />}>
          <MapContent
            locations={locations}
            selectedId={selectedId}
            onLocationSelect={onLocationSelect}
            isInspectorOpen={!!selectedLocation}
            scrollWheelZoom={scrollWheelZoom}
            {...mapProps}
            className={styles.map}
          />
        </Suspense>
      </div>

      {/* Mobile Bottom Carousel */}
      <LocationCarousel
        locations={locations}
        selectedId={selectedId}
        onLocationSelect={onLocationSelect}
        className={styles.mobileCarousel}
      />
    </div>
  );
};

FullscreenMap.displayName = 'FullscreenMap';
