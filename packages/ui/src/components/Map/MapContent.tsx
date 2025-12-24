import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { MapViewProps } from './MapView';
import type { LocationData, RenderMarkerParams } from './types';
import { TILE_PROVIDER_PRESETS, type TileProviderConfig } from './tileProviders';
import { Features } from '../Feature/Features';
import { cn } from '../../utils/cn';
import styles from './Map.module.css';

/**
 * Lightweight SVG-to-HTML serializer that avoids pulling in react-dom/server.
 * Only supports SVG elements (our primary use case for custom markers).
 * Falls back to outerHTML for non-React elements.
 */
function serializeReactElement(element: React.ReactElement): string {
  // If it's an SVG element, serialize it directly
  if (typeof element.type === 'string' && element.type === 'svg') {
    const props = element.props || {};
    const { children, ...attrs } = props;

    // Build attribute string
    const attrString = Object.entries(attrs)
      .filter(([key]) => key !== 'dangerouslySetInnerHTML')
      .map(([key, value]) => {
        // Convert React prop names to HTML attributes
        const attrName = key === 'className' ? 'class' :
                        key === 'strokeWidth' ? 'stroke-width' :
                        key === 'fillOpacity' ? 'fill-opacity' :
                        key === 'strokeLinecap' ? 'stroke-linecap' :
                        key === 'strokeLinejoin' ? 'stroke-linejoin' :
                        key;
        return `${attrName}="${value}"`;
      })
      .join(' ');

    // Serialize children recursively
    const childrenHTML = React.Children.toArray(children)
      .map((child) => {
        if (typeof child === 'string' || typeof child === 'number') {
          return String(child);
        }
        if (React.isValidElement(child)) {
          return serializeSVGChild(child);
        }
        return '';
      })
      .join('');

    return `<svg ${attrString}>${childrenHTML}</svg>`;
  }

  // For non-SVG elements, create a temp div and use outerHTML
  const div = document.createElement('div');
  const ReactDOM = (window as typeof globalThis & { ReactDOM?: { createRoot?: (el: HTMLElement) => { render: (el: React.ReactElement) => void } } }).ReactDOM;
  const root = ReactDOM?.createRoot?.(div);
  if (root) {
    root.render(element);
    return div.innerHTML;
  }

  // Fallback: return empty string
  return '';
}

/**
 * Helper to serialize SVG child elements
 */
function serializeSVGChild(element: React.ReactElement): string {
  if (typeof element.type !== 'string') return '';

  const props = element.props || {};
  const { children, ...attrs } = props;
  const tagName = element.type;

  // Build attribute string
  const attrString = Object.entries(attrs)
    .filter(([key]) => key !== 'dangerouslySetInnerHTML')
    .map(([key, value]) => {
      // Convert React prop names to HTML attributes
      const attrName = key === 'className' ? 'class' :
                      key === 'strokeWidth' ? 'stroke-width' :
                      key === 'fillOpacity' ? 'fill-opacity' :
                      key === 'strokeLinecap' ? 'stroke-linecap' :
                      key === 'strokeLinejoin' ? 'stroke-linejoin' :
                      key;
      return `${attrName}="${value}"`;
    })
    .join(' ');

  // Self-closing tags
  if (!children || (Array.isArray(children) && children.length === 0)) {
    return `<${tagName} ${attrString} />`;
  }

  // Serialize children
  const childrenHTML = React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }
      if (React.isValidElement(child)) {
        return serializeSVGChild(child);
      }
      return '';
    })
    .join('');

  return `<${tagName} ${attrString}>${childrenHTML}</${tagName}>`;
}

// Component to show only tile provider attribution
const AttributionCustomizer: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    // Show only tile provider attribution (no framework branding)
    const attributionControl = map.attributionControl;
    if (attributionControl) {
      attributionControl.setPrefix('');
    }
  }, [map]);

  return null;
};

// Component to handle map flying to selected location
const MapFlyer: React.FC<{
  selectedId?: string;
  locations: LocationData[];
  isInspectorOpen?: boolean;
}> = ({ selectedId, locations, isInspectorOpen }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedId) {
      const location = locations.find((loc) => loc.id === selectedId);

      if (location) {
        // Calculate distance between current center and selected location
        const currentCenter = map.getCenter();
        const distance = currentCenter.distanceTo(location.coords);

        // If distance is small (less than 2km), use panTo to avoid shaking
        // Otherwise use flyTo for the nice flying animation
        const useSmoothPan = distance < 2000;

        // When Inspector is open, offset the target position to show marker with good spacing
        // to ensure the marker is visible and not hidden by the Inspector panel (on the right)
        let targetCoords: [number, number] = location.coords;
        if (isInspectorOpen && map) {
          // Offset by approximately 100px to move map center slightly right
          // This keeps marker more centered-left on screen, avoiding the Inspector on the right
          const offsetPixels = 100;
          // Convert pixel offset to lat/lng offset
          const point = map.latLngToContainerPoint(location.coords);
          const offsetPoint = L.point(point.x + offsetPixels, point.y);
          const result = map.containerPointToLatLng(offsetPoint);
          targetCoords = [result.lat, result.lng];
        }

        if (useSmoothPan) {
          map.panTo(targetCoords, {
            animate: true,
            duration: 0.5,
          });
        } else {
          map.flyTo(targetCoords, map.getZoom(), {
            duration: 0.5,
            easeLinearity: 0.5,
          });
        }
      }
    }
  }, [selectedId, locations, map, isInspectorOpen]);

  return null;
};

// Component to handle trackpad pinch-to-zoom (detects Ctrl+wheel events)
const PinchZoomHandler: React.FC = () => {
  const map = useMap();
  const accumulatedDelta = useRef<number>(0);
  const zoomTimer = useRef<NodeJS.Timeout | null>(null);
  const lastMousePos = useRef<L.Point | null>(null);

  useEffect(() => {
    const container = map.getContainer();

    function performZoom() {
      const delta = accumulatedDelta.current;
      accumulatedDelta.current = 0;

      if (!delta) return;

      const currentZoom = map.getZoom();

      // Use Leaflet's approach: map delta with sigmoid function to smooth zoom range
      // This creates smooth, proportional zooming like the +/- buttons
      const wheelPxPerZoomLevel = 60; // Leaflet default
      const d2 = delta / (wheelPxPerZoomLevel * 4);
      const d3 = (4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2))))) / Math.LN2;
      const d4 = Math.ceil(d3); // Snap to integer zoom levels
      const zoomDelta = delta > 0 ? -d4 : d4;

      const newZoom = Math.max(
        map.getMinZoom(),
        Math.min(map.getMaxZoom(), currentZoom + zoomDelta)
      );

      if (newZoom === currentZoom) return;

      // Zoom around mouse position if available, otherwise center
      if (lastMousePos.current) {
        const point = lastMousePos.current;
        const latLng = map.containerPointToLatLng(point);
        map.setZoomAround(latLng, newZoom, { animate: true });
      } else {
        map.setZoom(newZoom, { animate: true });
      }

      lastMousePos.current = null;
    }

    function handleWheel(e: WheelEvent) {
      // Trackpad pinch gestures come through as wheel events with ctrlKey=true
      if (e.ctrlKey) {
        e.preventDefault(); // Prevent browser page zoom
        e.stopPropagation();

        // Accumulate delta values (like Leaflet does)
        accumulatedDelta.current += e.deltaY;

        // Store mouse position for zooming around cursor
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        lastMousePos.current = map.mouseEventToContainerPoint(e as any);

        // Use shorter debounce (10ms instead of 40ms) for more responsive continuous zooming
        if (zoomTimer.current) {
          clearTimeout(zoomTimer.current);
        }
        zoomTimer.current = setTimeout(performZoom, 10);
      }
      // If ctrlKey is false, it's a normal scroll - let it bubble to scroll the page
    }

    // CRITICAL: Use { passive: false } to allow preventDefault()
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (zoomTimer.current) {
        clearTimeout(zoomTimer.current);
      }
    };
  }, [map]);

  return null;
};

/**
 * Resolve tile provider configuration from prop value.
 * Supports both preset names and custom configurations.
 */
function resolveTileProviderConfig(
  tileProvider: string | TileProviderConfig | undefined,
  apiKey?: string
): TileProviderConfig {
  // Default to CARTO Voyager
  if (!tileProvider) {
    return TILE_PROVIDER_PRESETS['carto-voyager'];
  }

  // If it's a string, look up the preset
  if (typeof tileProvider === 'string') {
    const config = TILE_PROVIDER_PRESETS[tileProvider as keyof typeof TILE_PROVIDER_PRESETS];
    if (!config) {
      console.warn(
        `Unknown tile provider preset: "${tileProvider}". Falling back to carto-voyager.`
      );
      return TILE_PROVIDER_PRESETS['carto-voyager'];
    }

    // Interpolate API key if needed
    if (config.requiresApiKey && apiKey) {
      return {
        ...config,
        url: config.url.replace('{apiKey}', apiKey),
      };
    }

    // Warn if API key is required but not provided
    if (config.requiresApiKey && !apiKey) {
      console.warn(
        `Tile provider "${tileProvider}" requires an API key. Please provide the tileApiKey prop.`
      );
    }

    return config;
  }

  // It's a custom configuration object - use as-is
  // Interpolate API key if present in URL
  if (apiKey && tileProvider.url.includes('{apiKey}')) {
    return {
      ...tileProvider,
      url: tileProvider.url.replace('{apiKey}', apiKey),
    };
  }

  return tileProvider;
}

const DEFAULT_ICON_SIZE: [number, number] = [28, 40];
const DEFAULT_ICON_ANCHOR: [number, number] = [14, 40];
const DEFAULT_POPUP_ANCHOR: [number, number] = [0, -40]; /* Adjusted for custom popup styling */

function createMarkerIcon(color: string, isSelected: boolean) {
  const innerCircle = isSelected
    ? `<circle cx="14" cy="13.5" r="4" fill="${color}" />`
    : `<circle cx="14" cy="13.5" r="3.5" fill="var(--ai-color-border-default)" />`; /* Use token for subtle background */

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">
      <path fill="${color}" stroke="var(--ai-color-bg-primary)" stroke-width="2" d="M14 1C7.373 1 2 6.373 2 13c0 8 12 26 12 26S26 21 26 13c0-6.627-5.373-12-12-12z" />
      <circle cx="14" cy="13.5" r="7" fill="#ffffff" />
      ${innerCircle}
    </svg>
  `;

  const className = isSelected ? `${styles.marker} ${styles.selectedMarker}`.trim() : styles.marker;

  return L.divIcon({
    html: svg,
    iconSize: DEFAULT_ICON_SIZE,
    iconAnchor: DEFAULT_ICON_ANCHOR,
    popupAnchor: DEFAULT_POPUP_ANCHOR,
    className,
  });
}

/**
 * Create dot marker icon (20x20px with 2px border)
 * Uses CSS variables for automatic dark mode support
 * Total size: 20×20, Fill: 16×16, Border: 2px
 */
function createDotMarkerIcon(color: string, isSelected: boolean): L.DivIcon {
  const size = 20;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
      <circle
        cx="10" cy="10" r="8"
        fill="${color}"
        stroke="var(--ai-color-bg-primary)"
        stroke-width="2"
      />
      ${isSelected ? '<circle cx="10" cy="10" r="4" fill="var(--ai-color-bg-primary)" />' : ''}
    </svg>
  `;

  const className = isSelected ? `${styles.marker} ${styles.selectedMarker}`.trim() : styles.marker;

  return L.divIcon({
    html: svg,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
    className,
  });
}

/**
 * Converts a React element to a Leaflet DivIcon.
 * Uses lightweight SVG serializer to avoid pulling in react-dom/server.
 * Automatically extracts size and anchor from SVG width/height attributes.
 * This follows the industry pattern from Material-UI DataGrid and Ant Design Table.
 *
 * @param element - React element returned by renderMarker function
 * @param isSelected - Whether the marker is selected (for styling)
 * @returns Leaflet DivIcon ready to use with markers
 */
function convertReactMarkerToIcon(element: React.ReactElement, isSelected: boolean): L.DivIcon {
  // Convert React element to HTML string using lightweight serializer
  const html = serializeReactElement(element);

  // Extract size from SVG element if available
  let iconSize: [number, number] = DEFAULT_ICON_SIZE;
  let iconAnchor: [number, number] = DEFAULT_ICON_ANCHOR;
  let popupAnchor: [number, number] = DEFAULT_POPUP_ANCHOR;

  if (typeof element.type === 'string' && element.type === 'svg') {
    const { width, height } = element.props || {};

    // Parse width and height if provided
    const w = typeof width === 'number' ? width : parseInt(String(width), 10);
    const h = typeof height === 'number' ? height : parseInt(String(height), 10);

    if (!isNaN(w) && !isNaN(h)) {
      iconSize = [w, h];
      // Default anchor to bottom-center for pin-like markers
      iconAnchor = [w / 2, h];
      popupAnchor = [0, -h];
    }
  }

  // Apply selected class for consistent styling with built-in markers
  const className = isSelected ? `${styles.marker} ${styles.selectedMarker}`.trim() : styles.marker;

  return L.divIcon({
    html,
    iconSize,
    iconAnchor,
    popupAnchor,
    className,
  });
}

export const MapContent: React.FC<MapViewProps> = ({
  locations,
  selectedId,
  activeId,
  onLocationSelect,
  onLocationActive,
  defaultCenter = [37.7749, -122.4194],
  defaultZoom = 12,
  markerVariant = 'pin',
  renderMarker,
  className,
  style,
  isInspectorOpen,
  scrollWheelZoom = false,
  showPopup = true,
  hideAttribution = true,
  tileProvider,
  tileApiKey,
}) => {
  const containerClassName = cn(
    styles.mapContainer,
    !hideAttribution && 'show-attribution',
    className
  );

  // Resolve tile provider configuration
  const tileConfig = useMemo(
    () => resolveTileProviderConfig(tileProvider, tileApiKey),
    [tileProvider, tileApiKey]
  );

  const markerRefs = useRef<Map<string, L.Marker>>(new Map());

  // Use CSS variable for brand color - no ThemeProvider dependency
  const MARKER_COLOR = 'var(--ai-color-brand-primary)';

  const defaultIcon = useMemo(
    () =>
      markerVariant === 'dot'
        ? createDotMarkerIcon(MARKER_COLOR, false)
        : createMarkerIcon(MARKER_COLOR, false),
    [markerVariant, MARKER_COLOR]
  );
  const activeIcon = useMemo(
    () =>
      markerVariant === 'dot'
        ? createDotMarkerIcon(MARKER_COLOR, false)
        : createMarkerIcon(MARKER_COLOR, false),
    [markerVariant, MARKER_COLOR]
  );
  const selectedIcon = useMemo(
    () =>
      markerVariant === 'dot'
        ? createDotMarkerIcon(MARKER_COLOR, true)
        : createMarkerIcon(MARKER_COLOR, true),
    [markerVariant, MARKER_COLOR]
  );

  /**
   * Get the appropriate icon for a location based on priority system:
   * 1. Per-location renderMarker (LocationData.renderMarker)
   * 2. Global renderMarker (MapViewProps.renderMarker)
   * 3. Built-in markerVariant (pin/dot/hybrid)
   *
   * Follows the pattern from Material-UI DataGrid and Ant Design Table.
   *
   * If renderMarker returns null, falls back to the next priority level,
   * enabling patterns like "custom selected, default unselected".
   */
  const getIconForLocation = useCallback(
    (location: LocationData, isSelected: boolean, isActive: boolean): L.DivIcon => {
      // Determine variant for hybrid mode support
      const variant: 'pin' | 'dot' =
        markerVariant === 'hybrid' ? (isSelected ? 'pin' : 'dot') : markerVariant;

      // Build params for renderMarker functions
      const params: RenderMarkerParams = {
        location,
        isSelected,
        isActive,
        color: MARKER_COLOR,
        variant,
      };

      // Priority 1: Per-location renderMarker
      if (location.renderMarker) {
        const element = location.renderMarker(params);
        // If null is returned, fall through to next priority
        if (element !== null && element !== undefined) {
          return convertReactMarkerToIcon(element, isSelected);
        }
      }

      // Priority 2: Global renderMarker
      if (renderMarker) {
        const element = renderMarker(params);
        // If null is returned, fall through to built-in markers
        if (element !== null && element !== undefined) {
          return convertReactMarkerToIcon(element, isSelected);
        }
      }

      // Priority 3: Built-in markerVariant (existing logic)
      if (isSelected) {
        return markerVariant === 'hybrid' ? createMarkerIcon(MARKER_COLOR, true) : selectedIcon;
      }

      if (isActive) {
        return markerVariant === 'hybrid' ? createDotMarkerIcon(MARKER_COLOR, false) : activeIcon;
      }

      if (markerVariant === 'hybrid') {
        return createDotMarkerIcon(MARKER_COLOR, false);
      }

      return defaultIcon;
    },
    [renderMarker, markerVariant, MARKER_COLOR, defaultIcon, activeIcon, selectedIcon]
  );

  useEffect(() => {
    const validIds = new Set(locations.map((location) => location.id));
    markerRefs.current.forEach((_, id) => {
      if (!validIds.has(id)) {
        markerRefs.current.delete(id);
      }
    });
  }, [locations]);

  // Open/close popups based on selectedId (only if showPopup is enabled)
  useEffect(() => {
    if (!showPopup) return;

    // Close all popups
    markerRefs.current.forEach((marker) => {
      marker.closePopup();
    });

    // Open selected popup
    if (selectedId && markerRefs.current.has(selectedId)) {
      const marker = markerRefs.current.get(selectedId);
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedId, showPopup]);

  // Update marker icons when selection changes
  useEffect(() => {
    markerRefs.current.forEach((marker, locationId) => {
      const location = locations.find((loc) => loc.id === locationId);
      if (!location) return;

      const isSelected = locationId === selectedId;
      const isActive = locationId === activeId;

      // Use getIconForLocation for consistent icon resolution
      const icon = getIconForLocation(location, isSelected, isActive);

      marker.setIcon(icon);
    });
  }, [selectedId, activeId, locations, getIconForLocation]);

  return (
    <div className={containerClassName} style={style}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className={styles.map}
        scrollWheelZoom={scrollWheelZoom}
        touchZoom={scrollWheelZoom}
        dragging={true}
      >
        <AttributionCustomizer />
        <MapFlyer selectedId={selectedId} locations={locations} isInspectorOpen={isInspectorOpen} />
        {!scrollWheelZoom && <PinchZoomHandler />}
        <TileLayer
          url={tileConfig.url}
          attribution={tileConfig.attribution}
          {...(tileConfig.subdomains && { subdomains: tileConfig.subdomains })}
          {...(tileConfig.maxZoom && { maxZoom: tileConfig.maxZoom })}
          {...(tileConfig.minZoom && { minZoom: tileConfig.minZoom })}
          detectRetina={tileConfig.detectRetina ?? true}
        />
        {locations.map((location) => {
          const isSelected = location.id === selectedId;
          const isActive = location.id === activeId;

          // Use getIconForLocation for consistent icon resolution
          const icon = getIconForLocation(location, isSelected, isActive);

          const eventHandlers: Partial<L.LeafletEventHandlerFnMap> = {};
          if (onLocationSelect) {
            eventHandlers.click = () => onLocationSelect(location.id);
          }
          if (onLocationActive) {
            eventHandlers.mouseover = () => onLocationActive(location.id);
            eventHandlers.mouseout = () => onLocationActive(undefined);
          }

          return (
            <Marker
              key={location.id}
              position={location.coords}
              icon={icon}
              eventHandlers={Object.keys(eventHandlers).length > 0 ? eventHandlers : undefined}
              ref={(marker) => {
                if (marker) {
                  markerRefs.current.set(location.id, marker);
                  return;
                }
                markerRefs.current.delete(location.id);
              }}
            >
              {showPopup && (
                <Popup>
                  <article className={styles.popup}>
                    <div className={styles.popupContent}>
                      <h3 className={styles.popupTitle}>{location.name}</h3>
                      {location.subtitle && (
                        <div className={styles.popupSubtitle}>{location.subtitle}</div>
                      )}
                      {location.features && location.features.length > 0 && (
                        <Features items={location.features} iconSize={14} />
                      )}
                    </div>
                  </article>
                </Popup>
              )}
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

MapContent.displayName = 'MapContent';
