import { useCallback, useState, useMemo } from 'react';
import type { Meta } from '@storybook/react';
import { CompactMap, type CompactMapProps } from './CompactMap';
import type { LocationData, RenderMarkerParams } from './types';
import { StarFilled } from '@openai/apps-sdk-ui/components/Icon';

const CHATGPT_APP_HEIGHT = '400px';

const sampleLocations: LocationData[] = [
  {
    id: '1',
    name: 'Location 1',
    subtitle: 'Custom Pin Marker',
    coords: [37.8001, -122.4098],
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    description: 'This location uses a custom red circle marker',
    features: [{ icon: <StarFilled />, label: '4.8' }],
  },
  {
    id: '2',
    name: 'Location 2',
    subtitle: 'Custom Star Marker',
    coords: [37.799, -122.4093],
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
    description: 'This location uses a custom yellow star marker',
    features: [{ icon: <StarFilled />, label: '4.6' }],
  },
  {
    id: '3',
    name: 'Location 3',
    subtitle: 'Default Marker',
    coords: [37.7613, -122.4255],
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
    description: 'This location uses the default built-in marker',
    features: [{ icon: <StarFilled />, label: '4.5' }],
  },
];

const meta: Meta<CompactMapProps> = {
  title: 'Composed Components/Maps/Custom Markers',
  component: CompactMap,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    locations: { description: 'Array of location data objects', control: false },
    onLocationSelect: { description: 'Callback when location is selected', control: false },
    onLocationActive: { description: 'Callback when location is hovered', control: false },
    onExpand: { description: 'Callback when expand button is clicked', control: false },
    carouselProps: { description: 'Props forwarded to carousel component', control: false },
    renderMarker: { description: 'Custom marker renderer function', control: false },
  },
};

export default meta;

// 1. Global Custom Marker
export const GlobalMarker = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const renderMarker = useCallback((params: RenderMarkerParams) => {
    const size = params.isSelected ? 32 : 24;
    return (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <circle
          cx="16"
          cy="16"
          r="14"
          fill={params.color}
          stroke="white"
          strokeWidth={params.isSelected ? '4' : '2'}
        />
        {params.isSelected && <circle cx="16" cy="16" r="6" fill="white" />}
      </svg>
    );
  }, []);

  return (
    <CompactMap
      locations={sampleLocations}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      renderMarker={renderMarker}
      defaultCenter={[37.7849, -122.4194]}
      defaultZoom={13}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

GlobalMarker.parameters = {
  docs: {
    description: {
      story:
        'Apply the same custom marker to all locations using the global `renderMarker` prop. Circle markers that scale up when selected.',
    },
    source: {
      code: `const renderMarker = useCallback((params: RenderMarkerParams) => {
  const size = params.isSelected ? 32 : 24;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <circle
        cx="16" cy="16" r="14"
        fill={params.color}
        stroke="white"
        strokeWidth={params.isSelected ? '4' : '2'}
      />
      {params.isSelected && <circle cx="16" cy="16" r="6" fill="white" />}
    </svg>
  );
}, []);

<CompactMap
  locations={locations}
  renderMarker={renderMarker}
/>`,
    },
  },
};

// 2. Hybrid Mode Support
export const HybridMode = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const renderMarker = useCallback((params: RenderMarkerParams) => {
    if (params.variant === 'pin') {
      return (
        <svg width="28" height="40" viewBox="0 0 28 40">
          <path
            fill={params.color}
            stroke="white"
            strokeWidth="2"
            d="M14 1C7.373 1 2 6.373 2 13c0 8 12 26 12 26S26 21 26 13c0-6.627-5.373-12-12-12z"
          />
          <circle cx="14" cy="13" r="6" fill="white" />
          <circle cx="14" cy="13" r="3" fill={params.color} />
        </svg>
      );
    } else {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8" fill={params.color} stroke="white" strokeWidth="2" />
        </svg>
      );
    }
  }, []);

  return (
    <CompactMap
      locations={sampleLocations}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      markerVariant="hybrid"
      renderMarker={renderMarker}
      defaultCenter={[37.7849, -122.4194]}
      defaultZoom={13}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

HybridMode.parameters = {
  docs: {
    description: {
      story:
        'Combine `markerVariant="hybrid"` with custom `renderMarker` for different shapes based on selection state. Pins when selected, dots otherwise.',
    },
    source: {
      code: `const renderMarker = useCallback((params: RenderMarkerParams) => {
  if (params.variant === 'pin') {
    return (
      <svg width="28" height="40" viewBox="0 0 28 40">
        <path fill={params.color} stroke="white" strokeWidth="2"
          d="M14 1C7.373 1 2 6.373 2 13c0 8 12 26..." />
        <circle cx="14" cy="13" r="6" fill="white" />
        <circle cx="14" cy="13" r="3" fill={params.color} />
      </svg>
    );
  } else {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8"
          fill={params.color} stroke="white" strokeWidth="2" />
      </svg>
    );
  }
}, []);

<CompactMap
  markerVariant="hybrid"
  renderMarker={renderMarker}
/>`,
    },
  },
};

// 3. Per-Location Custom Markers
export const PerLocationMarkers = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const perLocationMarkers: LocationData[] = useMemo(
    () => [
      {
        ...sampleLocations[0],
        renderMarker: (params: RenderMarkerParams) => (
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="#E4002B"
              stroke="white"
              strokeWidth={params.isSelected ? '4' : '2'}
            />
            {params.isSelected && <circle cx="16" cy="16" r="6" fill="white" />}
          </svg>
        ),
      },
      {
        ...sampleLocations[1],
        renderMarker: (params: RenderMarkerParams) => (
          <svg width="32" height="32" viewBox="0 0 32 32">
            <polygon
              points="16,4 20,12 28,14 22,20 24,28 16,24 8,28 10,20 4,14 12,12"
              fill="#FFD700"
              stroke="white"
              strokeWidth={params.isSelected ? '3' : '2'}
            />
          </svg>
        ),
      },
      sampleLocations[2], // Uses default built-in marker
    ],
    []
  );

  return (
    <CompactMap
      locations={perLocationMarkers}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      defaultCenter={[37.7849, -122.4194]}
      defaultZoom={13}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

PerLocationMarkers.parameters = {
  docs: {
    description: {
      story:
        'Define `renderMarker` directly on `LocationData` for location-specific markers. Each location can have completely unique marker styles. Locations without `renderMarker` use the default.',
    },
    source: {
      code: `const locations: LocationData[] = [
  {
    ...location1,
    renderMarker: (params) => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14"
          fill="#E4002B" stroke="white"
          strokeWidth={params.isSelected ? '4' : '2'}
        />
      </svg>
    ),
  },
  {
    ...location2,
    renderMarker: (params) => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <polygon points="16,4 20,12 28,14..."
          fill="#FFD700" stroke="white" />
      </svg>
    ),
  },
  location3, // Uses default marker
];

<CompactMap locations={locations} />`,
    },
  },
};

// 4. Performance Optimized
export const PerformanceOptimized = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const renderMarker = useCallback((params: RenderMarkerParams) => {
    const size = params.isSelected ? 36 : 28;
    const strokeWidth = params.isSelected ? 4 : 2;

    return (
      <svg width={size} height={size} viewBox="0 0 36 36">
        <rect
          x="2"
          y="2"
          width="32"
          height="32"
          rx="4"
          fill={params.color}
          stroke="white"
          strokeWidth={strokeWidth}
        />
        {params.isSelected && <circle cx="18" cy="18" r="6" fill="white" fillOpacity="0.9" />}
      </svg>
    );
  }, []);

  return (
    <CompactMap
      locations={sampleLocations}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      renderMarker={renderMarker}
      defaultCenter={[37.7849, -122.4194]}
      defaultZoom={13}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

PerformanceOptimized.parameters = {
  docs: {
    description: {
      story:
        'Wrap `renderMarker` in `useCallback` with an empty dependency array to prevent unnecessary re-renders. Follows the Material-UI DataGrid pattern for optimal performance.',
    },
    source: {
      code: `// Memoize renderMarker to prevent unnecessary re-renders
const renderMarker = useCallback((params: RenderMarkerParams) => {
  const size = params.isSelected ? 36 : 28;
  return (
    <svg width={size} height={size} viewBox="0 0 36 36">
      <rect x="2" y="2" width="32" height="32" rx="4"
        fill={params.color}
        stroke="white"
        strokeWidth={params.isSelected ? 4 : 2}
      />
    </svg>
  );
}, []); // Empty dependency array = never recreated

<CompactMap renderMarker={renderMarker} />`,
    },
  },
};

// 5. Fallback Pattern
export const FallbackPattern = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const renderMarker = useCallback((params: RenderMarkerParams) => {
    // Return null for unselected - falls back to built-in default marker
    if (!params.isSelected) {
      return null;
    }

    // Custom marker only for selected state
    return (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill={params.color} stroke="white" strokeWidth="3" />
        <circle cx="20" cy="20" r="10" fill="white" />
        <circle cx="20" cy="20" r="5" fill={params.color} />
      </svg>
    );
  }, []);

  return (
    <CompactMap
      locations={sampleLocations}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      renderMarker={renderMarker}
      defaultCenter={[37.7849, -122.4194]}
      defaultZoom={13}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

FallbackPattern.parameters = {
  docs: {
    description: {
      story:
        'Return `null` from `renderMarker` to fall back to built-in markers. Perfect for customizing only selected markers while keeping default styling for unselected ones.',
    },
    source: {
      code: `// Return null to fall back to built-in markers
const renderMarker = useCallback((params: RenderMarkerParams) => {
  // Use default marker for unselected state
  if (!params.isSelected) {
    return null; // Falls back to built-in marker
  }

  // Custom marker only when selected
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18"
        fill={params.color} stroke="white" strokeWidth="3" />
      <circle cx="20" cy="20" r="10" fill="white" />
      <circle cx="20" cy="20" r="5" fill={params.color} />
    </svg>
  );
}, []);

<CompactMap renderMarker={renderMarker} />`,
    },
  },
};
