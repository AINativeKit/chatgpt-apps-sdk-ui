import { useState } from 'react';
import type { Meta } from '@storybook/react';
import { CompactMap, type CompactMapProps } from './CompactMap';
import type { LocationData } from './types';
import { StarFilled } from '@openai/apps-sdk-ui/components/Icon';

const CHATGPT_APP_HEIGHT = '478px';

const sampleLocations: LocationData[] = [
  {
    id: 'tonys-pizza',
    name: "Tony's Pizza Napoletana",
    subtitle: 'Neapolitan Pizzeria · North Beach',
    coords: [37.8001, -122.4098],
    description:
      'Award-winning Neapolitan pies in North Beach. A San Francisco institution serving authentic Italian pizza with locally-sourced ingredients.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    features: [{ icon: <StarFilled />, label: '4.8' }, { label: '$$$' }],
  },
  {
    id: 'golden-boy',
    name: 'Golden Boy Pizza',
    subtitle: 'Focaccia Pizza · North Beach',
    coords: [37.799, -122.4093],
    description:
      'Focaccia-style squares, late-night favorite. Classic North Beach spot known for thick, fluffy focaccia pizza by the slice.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
    features: [{ icon: <StarFilled />, label: '4.6' }, { label: '$' }],
  },
  {
    id: 'delfina',
    name: 'Pizzeria Delfina',
    subtitle: 'Thin-Crust Pizza · Mission District',
    coords: [37.7613, -122.4255],
    description:
      'Thin-crust classics on 18th Street. Celebrated for perfectly charred, thin-crust pizzas made in a wood-burning oven.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
    features: [{ icon: <StarFilled />, label: '4.5' }, { label: '$$' }],
  },
  {
    id: 'flour-water',
    name: 'Flour + Water Pizzeria',
    subtitle: 'Artisan Pizza · Mission District',
    coords: [37.7775, -122.4388],
    description:
      'Deep-dish and cornmeal crust favorites. Innovative pizzeria from the Flour + Water team with seasonal rotating menu.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-6.png',
    features: [{ icon: <StarFilled />, label: '4.5' }, { label: '$$' }],
  },
  {
    id: 'little-star',
    name: 'Little Star Pizza',
    subtitle: 'Deep Dish · Western Addition',
    coords: [37.7755, -122.4312],
    description:
      'Chicago-style deep dish with a cornmeal crust. Famous for their Blue Star pizza with spinach and garlic.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-5.png',
    features: [{ icon: <StarFilled />, label: '4.7' }, { label: '$$' }],
  },
  {
    id: 'una-pizza',
    name: 'Una Pizza Napoletana',
    subtitle: 'Neapolitan · SoMa',
    coords: [37.7849, -122.3994],
    description:
      'Minimalist Neapolitan pies with only 6 options. Anthony Mangieri brings his legendary NY pizzeria to SF.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    features: [{ icon: <StarFilled />, label: '4.9' }, { label: '$$$$' }],
  },
  {
    id: 'square-pie',
    name: 'Square Pie Guys',
    subtitle: 'Detroit Style · SoMa',
    coords: [37.7821, -122.4056],
    description:
      'Detroit-style squares with crispy cheese edges. Creative toppings on airy, focaccia-like crust.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-4.png',
    features: [{ icon: <StarFilled />, label: '4.6' }, { label: '$$' }],
  },
  {
    id: 'pizzetta-211',
    name: 'Pizzetta 211',
    subtitle: 'Thin Crust · Outer Richmond',
    coords: [37.7833, -122.4766],
    description:
      'Tiny neighborhood gem with ever-changing weekly menu. Thin, crispy crusts with seasonal toppings.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
    features: [{ icon: <StarFilled />, label: '4.8' }, { label: '$$' }],
  },
];

const meta: Meta<CompactMapProps> = {
  title: 'Composed Components/Maps/CompactMap',
  component: CompactMap,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    locations: { control: false },
    onLocationSelect: { control: false },
    onLocationActive: { control: false },
    onExpand: { control: false },
    carouselProps: { control: false },
    renderMarker: { control: false },
    height: {
      description: 'Fixed height for the compact map container',
      table: { defaultValue: { summary: '478px' } },
    },
    loading: {
      description: 'Shows skeleton UI while loading',
      table: { defaultValue: { summary: 'false' } },
    },
    error: {
      description: 'Shows error message when true',
      table: { defaultValue: { summary: 'false' } },
    },
    markerVariant: {
      description: 'Marker style: pin, dot, or hybrid',
      table: { defaultValue: { summary: 'pin' } },
    },
    showPopup: {
      description: 'Show popup bubbles when markers are clicked',
      table: { defaultValue: { summary: 'false' } },
    },
    hideAttribution: {
      description: 'Hide Leaflet attribution control',
      table: { defaultValue: { summary: 'false' } },
    },
    autoExpandOnCarouselClick: {
      description: 'Auto-expand to fullscreen when clicking a carousel card',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;

// Base story with interactive controls
export const Base = (args: CompactMapProps) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  return (
    <CompactMap
      {...args}
      locations={sampleLocations}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

Base.args = {};

Base.parameters = {
  docs: {
    source: {
      code: `<CompactMap
  locations={locations}
  selectedId={selectedId}
  onLocationSelect={setSelectedId}
  height="478px"
/>`,
    },
  },
};

// Marker variants
export const MarkerVariants = () => {
  const [pinSelectedId, setPinSelectedId] = useState<string | undefined>(undefined);
  const [dotSelectedId, setDotSelectedId] = useState<string | undefined>(undefined);
  const [hybridSelectedId, setHybridSelectedId] = useState<string | undefined>(undefined);

  return (
    <div
      style={{
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      }}
    >
      <div>
        <p style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Pin Markers (default)
        </p>
        <CompactMap
          locations={sampleLocations}
          selectedId={pinSelectedId}
          onLocationSelect={setPinSelectedId}
          markerVariant="pin"
          height={CHATGPT_APP_HEIGHT}
        />
      </div>
      <div>
        <p style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Dot Markers
        </p>
        <CompactMap
          locations={sampleLocations}
          selectedId={dotSelectedId}
          onLocationSelect={setDotSelectedId}
          markerVariant="dot"
          height={CHATGPT_APP_HEIGHT}
        />
      </div>
      <div>
        <p style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Hybrid Markers (recommended)
        </p>
        <CompactMap
          locations={sampleLocations}
          selectedId={hybridSelectedId}
          onLocationSelect={setHybridSelectedId}
          markerVariant="hybrid"
          height={CHATGPT_APP_HEIGHT}
        />
      </div>
    </div>
  );
};

MarkerVariants.parameters = {
  docs: {
    source: {
      code: `{/* Pin markers - traditional location pins */}
<CompactMap markerVariant="pin" />

{/* Dot markers - minimal circles */}
<CompactMap markerVariant="dot" />

{/* Hybrid - dots for unselected, pin for selected */}
<CompactMap markerVariant="hybrid" />`,
    },
  },
};

// Popup control
export const PopupControl = () => {
  const [withoutPopupId, setWithoutPopupId] = useState<string | undefined>(undefined);
  const [withPopupId, setWithPopupId] = useState<string | undefined>(undefined);

  return (
    <div
      style={{
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      }}
    >
      <div>
        <p style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Without Popups (default)
        </p>
        <CompactMap
          locations={sampleLocations}
          selectedId={withoutPopupId}
          onLocationSelect={setWithoutPopupId}
          height={CHATGPT_APP_HEIGHT}
        />
      </div>
      <div>
        <p style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          With Popups
        </p>
        <CompactMap
          locations={sampleLocations}
          selectedId={withPopupId}
          onLocationSelect={setWithPopupId}
          showPopup={true}
          height={CHATGPT_APP_HEIGHT}
        />
      </div>
    </div>
  );
};

PopupControl.parameters = {
  docs: {
    source: {
      code: `{/* Without popups (default) - cleaner map, use carousel for details */}
<CompactMap />

{/* With popups - click markers to see popup bubbles */}
<CompactMap showPopup={true} />`,
    },
  },
};

// Loading state
export const Loading = (args: CompactMapProps) => <CompactMap {...args} />;

Loading.args = {
  locations: [],
  loading: true,
  height: CHATGPT_APP_HEIGHT,
  carouselProps: { loadingCardCount: 4 },
};

Loading.parameters = {
  docs: {
    source: {
      code: `<CompactMap
  locations={[]}
  loading
  carouselProps={{ loadingCardCount: 4 }}
/>`,
    },
  },
};

// Error state
export const Error = (args: CompactMapProps) => <CompactMap {...args} />;

Error.args = {
  locations: [],
  error: true,
  height: CHATGPT_APP_HEIGHT,
  carouselProps: {
    errorTitle: 'Failed to load locations',
    errorMessage: 'Unable to retrieve location data. Please try again.',
    onErrorRetry: () => console.log('Retry clicked'),
  },
};

Error.parameters = {
  docs: {
    source: {
      code: `<CompactMap
  locations={[]}
  error
  carouselProps={{
    errorTitle: "Failed to load locations",
    errorMessage: "Unable to retrieve location data.",
    onErrorRetry: () => handleRetry()
  }}
/>`,
    },
  },
};

// Empty state
export const Empty = (args: CompactMapProps) => <CompactMap {...args} />;

Empty.args = {
  locations: [],
  height: CHATGPT_APP_HEIGHT,
};

Empty.parameters = {
  docs: {
    source: {
      code: `<CompactMap locations={[]} />`,
    },
  },
};

// States overview
export const States = () => (
  <div
    style={{
      display: 'grid',
      gap: '24px',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    }}
  >
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Loading
      </div>
      <CompactMap locations={[]} loading height={CHATGPT_APP_HEIGHT} />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Error
      </div>
      <CompactMap
        locations={[]}
        error
        height={CHATGPT_APP_HEIGHT}
        carouselProps={{
          errorTitle: 'Failed to load',
          onErrorRetry: () => console.log('Retry'),
        }}
      />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Empty
      </div>
      <CompactMap locations={[]} height={CHATGPT_APP_HEIGHT} />
    </div>
  </div>
);

States.parameters = {
  docs: {
    source: {
      code: `// Loading state
<CompactMap locations={[]} loading />

// Error state
<CompactMap locations={[]} error />

// Empty state
<CompactMap locations={[]} />`,
    },
  },
};

// Custom icons in features
export const CustomIcons = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const locationsWithCustomIcons: LocationData[] = [
    {
      id: 'custom-icon-demo',
      name: 'Restaurant with Custom Icons',
      subtitle: 'Fine Dining · Downtown',
      coords: [37.7749, -122.4194],
      description: 'Example showing custom React element icons in features',
      thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
      features: [
        {
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: '#ef4444' }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ),
          label: 'Popular',
        },
        {
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: '#f97316' }}
            >
              <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
            </svg>
          ),
          label: 'Trending',
        },
        { icon: <StarFilled />, label: '4.9' },
      ],
    },
  ];

  return (
    <CompactMap
      locations={locationsWithCustomIcons}
      selectedId={selectedId}
      onLocationSelect={setSelectedId}
      defaultCenter={[37.7749, -122.4194]}
      defaultZoom={13}
      height={CHATGPT_APP_HEIGHT}
    />
  );
};

CustomIcons.parameters = {
  docs: {
    source: {
      code: `<CompactMap
  locations={[{
    id: 'custom',
    name: 'Restaurant',
    coords: [37.7749, -122.4194],
    features: [
      { icon: <CustomHeartSVG />, label: 'Popular' },
      { icon: <StarFilled />, label: '4.9' },
    ],
  }]}
/>`,
    },
  },
};

// Real-world example
export const RealWorld = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-secondary)',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '800px',
      }}
    >
      <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Nearby Pizza Places</h3>
      <CompactMap
        locations={sampleLocations}
        selectedId={selectedId}
        onLocationSelect={setSelectedId}
        onExpand={() => console.log('Navigate to fullscreen map')}
        markerVariant="hybrid"
        height={CHATGPT_APP_HEIGHT}
      />
    </div>
  );
};

RealWorld.parameters = {
  docs: {
    source: {
      code: `<div className="map-container">
  <h3>Nearby Pizza Places</h3>
  <CompactMap
    locations={pizzaPlaces}
    selectedId={selectedId}
    onLocationSelect={setSelectedId}
    onExpand={() => navigateToFullscreen()}
    markerVariant="hybrid"
    height="478px"
  />
</div>`,
    },
  },
};
