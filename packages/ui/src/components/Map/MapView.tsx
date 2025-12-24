import React, { Suspense, lazy } from 'react';
import type { LocationData, RenderMarkerParams } from './types';
import type { TileProviderConfig, TileProviderPreset } from './tileProviders';
import { Skeleton } from '../Skeleton';
import styles from './Map.module.css';

export interface MapViewProps {
  /**
   * Array of location data to display on the map.
   */
  locations: LocationData[];

  /**
   * ID of the currently selected location.
   */
  selectedId?: string;

  /**
   * ID of the currently active/hovered location.
   */
  activeId?: string;

  /**
   * Callback when a location marker is clicked.
   */
  onLocationSelect?: (id: string | undefined) => void;

  /**
   * Callback when a location becomes active/hovered.
   */
  onLocationActive?: (id: string | undefined) => void;

  /**
   * Default map center coordinates [latitude, longitude].
   * @default [37.7749, -122.4194] (San Francisco)
   */
  defaultCenter?: [number, number];

  /**
   * Default zoom level.
   * @default 12
   */
  defaultZoom?: number;

  /**
   * Marker style variant.
   * - 'pin': Traditional location pin markers for all states (29×43px)
   * - 'dot': Simple circular dot markers for all states (16×16px)
   * - 'hybrid': Dots for non-selected, pin for selected (recommended for dense layouts)
   * @default 'pin'
   */
  markerVariant?: 'pin' | 'dot' | 'hybrid';

  /**
   * Custom marker renderer function (global).
   * Applies to all locations unless overridden by LocationData.renderMarker.
   *
   * Follows industry-standard patterns from Material-UI DataGrid (renderCell),
   * Ant Design Table (render), and React Native Maps (renderMarker).
   *
   * Return a React element (SVG, component, etc.), which will be automatically
   * converted to a Leaflet DivIcon. The library handles all Leaflet integration.
   *
   * Return null to fall back to built-in markers for specific states.
   *
   * @example
   * ```tsx
   * // Basic custom marker
   * renderMarker={({ isSelected, color }) => (
   *   <CustomPinIcon selected={isSelected} color={color} />
   * )}
   *
   * // Hybrid mode support
   * renderMarker={({ variant, isSelected, color }) => (
   *   variant === 'pin'
   *     ? <CustomPinIcon selected={isSelected} color={color} />
   *     : <CustomDotIcon selected={isSelected} color={color} />
   * )}
   *
   * // Custom selected, default unselected (fallback pattern)
   * renderMarker={({ isSelected, color }) => {
   *   if (!isSelected) return null; // Use built-in marker
   *   return <CustomSelectedMarker color={color} />;
   * }}
   *
   * // Performance optimization (MUI pattern)
   * const renderMarker = useCallback((params) => (
   *   <CustomMarker {...params} />
   * ), []);
   * ```
   */
  renderMarker?: (params: RenderMarkerParams) => React.ReactElement | null;

  /**
   * Additional class name for the container.
   */
  className?: string;

  /**
   * Container style.
   */
  style?: React.CSSProperties;

  /**
   * Whether the Inspector panel is open.
   * When true, the map will pan to show the selected marker on the left side.
   */
  isInspectorOpen?: boolean;

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
   * Enable scroll wheel zoom on the map.
   * When true, uses native Leaflet scroll wheel zoom (best for full-screen maps).
   * When false, disables scroll wheel but enables custom pinch-to-zoom (best for embedded maps).
   * @default false
   */
  scrollWheelZoom?: boolean;

  /**
   * Show popup bubbles when markers are clicked.
   * When false, disables the Leaflet popup that appears on marker click.
   * Useful when you want to handle marker selection with external UI (e.g., a sidebar).
   * @default true
   */
  showPopup?: boolean;

  /**
   * Hide Leaflet attribution control.
   * When true, hides the attribution text in bottom-right corner.
   * Note: Attribution is required by most tile providers' terms of service.
   * @default true (for backward compatibility, will change to false in future)
   */
  hideAttribution?: boolean;

  /**
   * Tile provider configuration.
   *
   * Can be either:
   * 1. A preset name (e.g., 'osm-standard', 'carto-dark', 'carto-voyager')
   * 2. A custom TileProviderConfig object for full control
   *
   * @default 'carto-voyager'
   *
   * @example
   * // Using preset
   * <Map tileProvider="osm-standard" />
   *
   * @example
   * // Using preset with API key
   * <Map
   *   tileProvider="geoapify-osm-bright-grey"
   *   tileApiKey="your-api-key-here"
   * />
   *
   * @example
   * // Custom configuration
   * <Map
   *   tileProvider={{
   *     url: 'https://your-tiles.com/{z}/{x}/{y}.png',
   *     attribution: '© Your Attribution',
   *     maxZoom: 19,
   *     detectRetina: true,
   *   }}
   * />
   */
  tileProvider?: TileProviderPreset | TileProviderConfig;

  /**
   * API key for tile providers that require authentication.
   * Only needed for providers like Geoapify, Thunderforest, etc.
   * Will be interpolated into the tile URL using {apiKey} placeholder.
   *
   * @example
   * <Map
   *   tileProvider="thunderforest-transport"
   *   tileApiKey={process.env.REACT_APP_THUNDERFOREST_KEY}
   * />
   */
  tileApiKey?: string;

  // Additional map configuration props can be introduced over time.
}

// Lazy load the MapContent component to avoid SSR issues with Leaflet
const MapContent = lazy(() =>
  import('./MapContent').then((module) => ({ default: module.MapContent }))
);

const LoadingFallback: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => (
  <div className={`${styles.mapContainer} ${className || ''}`} style={style}>
    <Skeleton width="100%" height="100%" />
  </div>
);

export const MapView: React.FC<MapViewProps> = (props) => {
  const { loading = false, error = false } = props;
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // State Priority: Loading > Error > SSR/Hydration > Content

  // Loading State
  if (loading) {
    return <LoadingFallback className={props.className} style={props.style} />;
  }

  // Error State (show skeleton since MapView doesn't have error UI, carousel handles it)
  if (error) {
    return <LoadingFallback className={props.className} style={props.style} />;
  }

  // Don't render map on server or during initial hydration
  if (!isMounted || typeof window === 'undefined') {
    return <LoadingFallback className={props.className} style={props.style} />;
  }

  return (
    <Suspense fallback={<LoadingFallback className={props.className} style={props.style} />}>
      <MapContent {...props} />
    </Suspense>
  );
};

MapView.displayName = 'MapView';
