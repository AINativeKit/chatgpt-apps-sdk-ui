import React from 'react';
import { MapView } from './MapView';
import type { MapViewProps } from './MapView';
import { LocationCarousel } from './LocationCarousel';
import type { LocationCarouselProps } from './LocationCarousel';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { ExpandLg } from '@openai/apps-sdk-ui/components/Icon';
import { ErrorStateDisplay } from './ErrorStateDisplay';
import { cn } from '../../utils/cn';
import styles from './CompactMap.module.css';

type CarouselOverrides = Partial<
  Omit<LocationCarouselProps, 'locations' | 'selectedId' | 'onLocationSelect' | 'className'>
>;

export interface CompactMapProps extends Omit<MapViewProps, 'className' | 'style'> {
  /**
   * Fixed height for the compact map container.
   * Accepts number (px) or string value.
   * @default 478px
   */
  height?: number | string;

  /**
   * Class name applied to the root container.
   */
  className?: string;

  /**
   * Root container style overrides.
   */
  style?: React.CSSProperties;

  /**
   * Class name applied to the internal MapView container.
   */
  mapClassName?: string;

  /**
   * Style overrides applied to the internal MapView container.
   */
  mapStyle?: React.CSSProperties;

  /**
   * Additional props forwarded to the carousel component.
   * Useful for customizing loading, error, and empty states.
   */
  carouselProps?: CarouselOverrides;

  /**
   * Callback when user clicks the expand button to enter fullscreen.
   */
  onExpand?: () => void;

  /**
   * Auto-expand to fullscreen when user clicks a carousel card.
   * When true, selecting a location from the carousel automatically triggers onExpand.
   * When false, users must click the expand button manually.
   * @default false
   */
  autoExpandOnCarouselClick?: boolean;
}

const DEFAULT_HEIGHT = '478px';

export const CompactMap: React.FC<CompactMapProps> = ({
  locations,
  selectedId,
  activeId,
  onLocationSelect,
  onLocationActive,
  defaultCenter,
  defaultZoom,
  markerVariant,
  renderMarker,
  isInspectorOpen,
  scrollWheelZoom,
  showPopup,
  hideAttribution,
  loading = false,
  error = false,
  height = DEFAULT_HEIGHT,
  className,
  style,
  mapClassName,
  mapStyle,
  carouselProps,
  onExpand,
  autoExpandOnCarouselClick = false,
  tileProvider,
  tileApiKey,
}) => {
  const containerStyle: React.CSSProperties = {
    ...style,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  const isEmpty = !loading && !error && locations.length === 0;

  return (
    <div className={cn(styles.container, className)} style={containerStyle}>
      <div className={styles.mapLayer}>
        <MapView
          locations={locations}
          selectedId={selectedId}
          activeId={activeId}
          onLocationSelect={onLocationSelect}
          onLocationActive={onLocationActive}
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          markerVariant={markerVariant}
          renderMarker={renderMarker}
          isInspectorOpen={isInspectorOpen}
          scrollWheelZoom={scrollWheelZoom}
          showPopup={showPopup}
          hideAttribution={hideAttribution}
          loading={loading}
          error={error}
          tileProvider={tileProvider}
          tileApiKey={tileApiKey}
          className={cn(styles.mapView, mapClassName)}
          style={mapStyle}
        />

        {/* Expand Button */}
        {onExpand && (
          <Button
            color="secondary"
            variant="ghost"
            uniform
            size="md"
            onClick={onExpand}
            aria-label="Expand map to fullscreen"
            className={styles.expandButton}
          >
            <ExpandLg />
          </Button>
        )}
      </div>

      <LocationCarousel
        locations={locations}
        selectedId={selectedId}
        onLocationSelect={(id) => {
          // Set selection first
          onLocationSelect?.(id);

          // Then trigger fullscreen if auto-expand is enabled
          if (autoExpandOnCarouselClick && id !== undefined && onExpand) {
            onExpand();
          }
        }}
        loading={loading}
        error={error}
        {...carouselProps}
        {...(isEmpty
          ? {
              emptyTitle: '',
              emptyMessage: '',
            }
          : {})}
      />

      {isEmpty && (
        <div className={styles.emptyOverlay}>
          <ErrorStateDisplay
            state="empty"
            title="No locations yet"
            message="Add locations to see them on the map"
          />
        </div>
      )}
    </div>
  );
};

CompactMap.displayName = 'CompactMap';
