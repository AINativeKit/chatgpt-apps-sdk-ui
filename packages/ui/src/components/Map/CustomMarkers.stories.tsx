import { useCallback, useState, useMemo } from 'react';
import type { FC } from 'react';
import type { Meta } from '@storybook/react';
import { CompactMap } from './CompactMap';
import type { LocationData, RenderMarkerParams } from './types';

const CHATGPT_APP_WIDTH = '766px';

const sampleLocations: LocationData[] = [
  {
    id: '1',
    name: 'Location 1',
    subtitle: 'Custom Pin Marker',
    coords: [37.8001, -122.4098],
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    description: 'This location uses a custom red circle marker',
    features: [{ icon: 'star', label: '4.8' }],
  },
  {
    id: '2',
    name: 'Location 2',
    subtitle: 'Custom Star Marker',
    coords: [37.799, -122.4093],
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
    description: 'This location uses a custom yellow star marker',
    features: [{ icon: 'star', label: '4.6' }],
  },
  {
    id: '3',
    name: 'Location 3',
    subtitle: 'Default Marker',
    coords: [37.7613, -122.4255],
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
    description: 'This location uses the default built-in marker',
    features: [{ icon: 'star', label: '4.5' }],
  },
];

const meta: Meta<typeof CompactMap> = {
  title: 'Composed Components/Maps/Custom Markers',
  component: CompactMap,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

const CodeBlock: FC<{ code: string; title?: string }> = ({ code, title }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {title && (
      <div
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-text)',
        }}
      >
        {title}
      </div>
    )}
    <pre
      style={{
        margin: 0,
        padding: '16px',
        background: 'var(--color-surface-secondary)',
        borderRadius: '8px',
        overflow: 'auto',
        fontSize: '13px',
        lineHeight: '1.6',
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, monospace',
        border: '1px solid var(--color-border)',
      }}
    >
      <code>{code}</code>
    </pre>
  </div>
);

const ExampleSection: FC<{
  title: string;
  description: string;
  children: React.ReactNode;
  code: string;
}> = ({ title, description, children, code }) => (
  <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <header>
      <h2 style={{ marginBottom: '8px', fontSize: '24px', fontWeight: 600 }}>{title}</h2>
      <p style={{ margin: 0, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
        {description}
      </p>
    </header>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        alignItems: 'start',
      }}
    >
      <div style={{ minHeight: '400px' }}>{children}</div>
      <CodeBlock code={code} />
    </div>
  </section>
);

export const CustomMarkers: FC = () => {
  const [selectedId1, setSelectedId1] = useState<string | undefined>(undefined);
  const [selectedId2, setSelectedId2] = useState<string | undefined>(undefined);
  const [selectedId3, setSelectedId3] = useState<string | undefined>(undefined);
  const [selectedId4, setSelectedId4] = useState<string | undefined>(undefined);
  const [selectedId5, setSelectedId5] = useState<string | undefined>(undefined);

  const locations = useMemo(() => sampleLocations, []);

  // Example 1: Global custom marker with circles
  const globalRenderMarker = useCallback((params: RenderMarkerParams) => {
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

  // Example 2: Hybrid mode with pin/dot variants
  const hybridRenderMarker = useCallback((params: RenderMarkerParams) => {
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

  // Example 3: Per-location custom markers
  const perLocationMarkers: LocationData[] = useMemo(
    () => [
      {
        ...locations[0],
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
        ...locations[1],
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
      locations[2], // Uses default built-in marker
    ],
    [locations]
  );

  // Example 4: Performance optimized with useCallback
  const optimizedRenderMarker = useCallback((params: RenderMarkerParams) => {
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

  // Example 5: Fallback pattern - custom selected, default unselected
  const fallbackRenderMarker = useCallback((params: RenderMarkerParams) => {
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

  const codeExamples = {
    global: `const renderMarker = useCallback((params: RenderMarkerParams) => {
  const size = params.isSelected ? 32 : 24;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <circle
        cx="16" cy="16" r="14"
        fill={params.color}
        stroke="white"
        strokeWidth={params.isSelected ? '4' : '2'}
      />
      {params.isSelected && (
        <circle cx="16" cy="16" r="6" fill="white" />
      )}
    </svg>
  );
}, []);

<CompactMap
  locations={locations}
  renderMarker={renderMarker}
/>`,
    hybrid: `const renderMarker = useCallback((params: RenderMarkerParams) => {
  if (params.variant === 'pin') {
    // Pin variant (selected state)
    return (
      <svg width="28" height="40" viewBox="0 0 28 40">
        <path fill={params.color} stroke="white" strokeWidth="2"
          d="M14 1C7.373 1 2 6.373 2 13c0 8 12 26..." />
        <circle cx="14" cy="13" r="6" fill="white" />
        <circle cx="14" cy="13" r="3" fill={params.color} />
      </svg>
    );
  } else {
    // Dot variant (unselected state)
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
    perLocation: `const locations: LocationData[] = [
  {
    ...location1,
    renderMarker: (params) => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14"
          fill="#E4002B" stroke="white"
          strokeWidth={params.isSelected ? '4' : '2'}
        />
        {params.isSelected && (
          <circle cx="16" cy="16" r="6" fill="white" />
        )}
      </svg>
    ),
  },
  {
    ...location2,
    renderMarker: (params) => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <polygon points="16,4 20,12 28,14..."
          fill="#FFD700" stroke="white"
          strokeWidth={params.isSelected ? '3' : '2'}
        />
      </svg>
    ),
  },
  location3, // Uses default marker
];

<CompactMap locations={locations} />`,
    optimized: `// Memoize renderMarker to prevent unnecessary re-renders
const renderMarker = useCallback((params: RenderMarkerParams) => {
  const size = params.isSelected ? 36 : 28;
  const strokeWidth = params.isSelected ? 4 : 2;

  return (
    <svg width={size} height={size} viewBox="0 0 36 36">
      <rect x="2" y="2" width="32" height="32" rx="4"
        fill={params.color}
        stroke="white"
        strokeWidth={strokeWidth}
      />
      {params.isSelected && (
        <circle cx="18" cy="18" r="6"
          fill="white" fillOpacity="0.9" />
      )}
    </svg>
  );
}, []); // Empty dependency array = never recreated

<CompactMap renderMarker={renderMarker} />`,
    fallback: `// Return null to fall back to built-in markers
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
  };

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '64px' }}>
      <section>
        <h1 style={{ marginBottom: '16px' }}>Custom Markers</h1>
        <p
          style={{
            margin: 0,
            maxWidth: '720px',
            color: 'var(--color-text-secondary)',
            fontSize: '16px',
            lineHeight: 1.6,
          }}
        >
          Customize map markers with your own React components. Following industry-standard patterns
          from Material-UI DataGrid (renderCell) and Ant Design Table (render), you can provide a{' '}
          <code>renderMarker</code> function that returns any React element—the library handles all
          Leaflet integration automatically.
        </p>

        <div
          style={{
            marginTop: '16px',
            background: 'var(--color-surface-secondary)',
            borderRadius: '12px',
            padding: '16px',
            maxWidth: CHATGPT_APP_WIDTH,
            color: 'var(--color-text-secondary)',
            fontSize: '14px',
          }}
        >
          <strong>Three ways to customize:</strong> Global renderMarker prop (all locations),
          per-location renderMarker (individual control), or hybrid with both (per-location
          overrides global).
        </div>
      </section>

      <ExampleSection
        title="1. Global Custom Marker"
        description="Apply the same custom marker to all locations using the global renderMarker prop. Simple circle markers that scale up when selected."
        code={codeExamples.global}
      >
        <CompactMap
          locations={locations}
          selectedId={selectedId1}
          onLocationSelect={setSelectedId1}
          renderMarker={globalRenderMarker}
          defaultCenter={[37.7849, -122.4194]}
          defaultZoom={13}
        />
      </ExampleSection>

      <ExampleSection
        title="2. Hybrid Mode Support"
        description="Combine markerVariant='hybrid' with custom renderMarker for different shapes based on selection state. Pins when selected, dots otherwise."
        code={codeExamples.hybrid}
      >
        <CompactMap
          locations={locations}
          selectedId={selectedId2}
          onLocationSelect={setSelectedId2}
          markerVariant="hybrid"
          renderMarker={hybridRenderMarker}
          defaultCenter={[37.7849, -122.4194]}
          defaultZoom={13}
        />
      </ExampleSection>

      <ExampleSection
        title="3. Per-Location Custom Markers"
        description="Define renderMarker directly on LocationData for location-specific markers. Each location can have completely unique marker styles."
        code={codeExamples.perLocation}
      >
        <CompactMap
          locations={perLocationMarkers}
          selectedId={selectedId3}
          onLocationSelect={setSelectedId3}
          defaultCenter={[37.7849, -122.4194]}
          defaultZoom={13}
        />
      </ExampleSection>

      <ExampleSection
        title="4. Performance Optimized"
        description="Wrap renderMarker in useCallback with an empty dependency array to prevent unnecessary re-renders. Follows the Material-UI DataGrid pattern for optimal performance."
        code={codeExamples.optimized}
      >
        <CompactMap
          locations={locations}
          selectedId={selectedId4}
          onLocationSelect={setSelectedId4}
          renderMarker={optimizedRenderMarker}
          defaultCenter={[37.7849, -122.4194]}
          defaultZoom={13}
        />
      </ExampleSection>

      <ExampleSection
        title="5. Fallback Pattern - Custom Selected, Default Unselected"
        description="Return null from renderMarker to fall back to built-in markers. Perfect for customizing only selected markers while keeping default styling for unselected ones."
        code={codeExamples.fallback}
      >
        <CompactMap
          locations={locations}
          selectedId={selectedId5}
          onLocationSelect={setSelectedId5}
          renderMarker={fallbackRenderMarker}
          defaultCenter={[37.7849, -122.4194]}
          defaultZoom={13}
        />
      </ExampleSection>

      <section
        style={{ paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}
      >
        <h2 style={{ marginBottom: '16px' }}>RenderMarkerParams API</h2>
        <p style={{ margin: '0 0 16px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Your renderMarker function receives these parameters to customize marker appearance:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              name: 'location',
              type: 'LocationData',
              desc: 'The location data for this marker',
            },
            {
              name: 'isSelected',
              type: 'boolean',
              desc: 'Whether this marker is currently selected',
            },
            {
              name: 'isActive',
              type: 'boolean',
              desc: 'Whether this marker is currently hovered/active',
            },
            {
              name: 'color',
              type: 'string',
              desc: 'Theme color automatically resolved from theme context',
            },
            {
              name: 'variant',
              type: "'pin' | 'dot'",
              desc: 'Marker variant (useful for hybrid mode support)',
            },
          ].map(({ name, type, desc }) => (
            <div
              key={name}
              style={{
                padding: '12px 16px',
                background: 'var(--color-surface-secondary)',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{ display: 'flex', gap: '8px', alignItems: 'baseline', marginBottom: '4px' }}
              >
                <code
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                  }}
                >
                  {name}
                </code>
                <code
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  {type}
                </code>
              </div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                {desc}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
