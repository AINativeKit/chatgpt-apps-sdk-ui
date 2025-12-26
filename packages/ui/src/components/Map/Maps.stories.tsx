import type { Meta } from '@storybook/react';
import { useState, type ReactNode } from 'react';
import { Map, type MapProps } from './Map';
import type { LocationData } from './types';
import { StarFilled } from '@openai/apps-sdk-ui/components/Icon';

// Sample location data - San Francisco pizza places
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
    actions: [
      { label: 'Add to favorites', variant: 'primary' },
      { label: 'Contact', variant: 'secondary' },
    ],
    lists: [
      {
        title: 'Reviews',
        items: [
          {
            id: 'review-1',
            title: 'Sarah M.',
            image: 'https://i.pravatar.cc/150?img=5',
            metadata: '2 weeks ago',
            description:
              'Great location! The service was excellent and the atmosphere was perfect.',
          },
          {
            id: 'review-2',
            title: 'John D.',
            image: 'https://i.pravatar.cc/150?img=12',
            metadata: '1 month ago',
            description: 'Highly recommend! Will definitely come back with friends.',
          },
        ],
      },
    ],
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
    actions: [
      { label: 'Add to favorites', variant: 'primary' },
      { label: 'Call', variant: 'secondary' },
    ],
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
    id: 'beretta',
    name: 'Beretta',
    subtitle: 'Wood-Fired Pizzeria · North Beach',
    coords: [37.799, -122.4077],
    description:
      'Wood-fired pies and burrata in North Beach. Stylish spot combining pizza excellence with a full cocktail program.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-4.png',
    features: [{ icon: <StarFilled />, label: '4.6' }, { label: '$$' }],
  },
];

const CHATGPT_APP_HEIGHT = '478px';

const meta: Meta<MapProps> = {
  title: 'Composed Components/Maps/Map',
  component: Map,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    locations: {
      description: 'Array of location data objects',
      control: false,
      table: { type: { summary: 'LocationData[]' } },
    },
    onLocationSelect: {
      description: 'Callback when location is selected',
      control: false,
      table: { type: { summary: '(id: string | undefined) => void' } },
    },
    onToggleFullscreen: {
      description: 'Callback when fullscreen mode changes',
      control: false,
      table: { type: { summary: '(isFullscreen: boolean) => void' } },
    },
    compactMapProps: {
      description: 'Props forwarded to CompactMap',
      control: false,
      table: { type: { summary: 'Partial<CompactMapProps>' } },
    },
    fullscreenMapProps: {
      description: 'Props forwarded to FullscreenMap',
      control: false,
      table: { type: { summary: 'Partial<FullscreenMapProps>' } },
    },
    autoExpandOnCarouselClick: {
      description: 'Auto-expand to fullscreen when clicking a carousel card',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    loading: {
      description: 'Shows skeleton map and carousel while loading',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    error: {
      description: 'Shows error message when true',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;

// Reusable wrapper for fullscreen stories (used with layout: 'fullscreen')
const FullscreenStoryWrapper = ({
  children,
  isFullscreen,
}: {
  children: ReactNode;
  isFullscreen: boolean;
}) => {
  if (isFullscreen) {
    // Fill the entire Storybook canvas without overflow
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        {children}
      </div>
    );
  }

  // Compact mode with padding (since layout: 'fullscreen' removes default padding)
  return (
    <div style={{ padding: '16px' }}>
      <div style={{ maxWidth: '766px', height: CHATGPT_APP_HEIGHT }}>{children}</div>
    </div>
  );
};

// Base demo with fullscreen toggle
export const Base = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  return (
    <FullscreenStoryWrapper isFullscreen={isFullscreen}>
      <Map
        locations={sampleLocations}
        defaultCenter={[37.7849, -122.4194]}
        defaultZoom={12}
        isFullscreen={isFullscreen}
        onToggleFullscreen={setIsFullscreen}
        selectedId={selectedId}
        onLocationSelect={setSelectedId}
      />
    </FullscreenStoryWrapper>
  );
};

Base.parameters = {
  layout: 'fullscreen',
  docs: {
    description: {
      story:
        'The Map component orchestrates between CompactMap and FullscreenMap based on the `isFullscreen` state. Click the expand button (↗️) in top-right corner to toggle fullscreen.',
    },
    source: {
      code: `const [isFullscreen, setIsFullscreen] = useState(false);
const [selectedId, setSelectedId] = useState<string | undefined>();

<Map
  locations={locations}
  isFullscreen={isFullscreen}
  onToggleFullscreen={setIsFullscreen}
  selectedId={selectedId}
  onLocationSelect={setSelectedId}
/>`,
    },
  },
};

// Auto-expand on carousel click
export const AutoExpandOnClick = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  return (
    <FullscreenStoryWrapper isFullscreen={isFullscreen}>
      <Map
        locations={sampleLocations}
        defaultCenter={[37.7849, -122.4194]}
        defaultZoom={12}
        isFullscreen={isFullscreen}
        onToggleFullscreen={setIsFullscreen}
        selectedId={selectedId}
        onLocationSelect={setSelectedId}
        autoExpandOnCarouselClick
      />
    </FullscreenStoryWrapper>
  );
};

AutoExpandOnClick.parameters = {
  layout: 'fullscreen',
  docs: {
    description: {
      story:
        'Set `autoExpandOnCarouselClick={true}` to automatically expand to fullscreen when clicking a carousel card. Provides faster access to location details (one click instead of two).',
    },
    source: {
      code: `<Map
  locations={locations}
  autoExpandOnCarouselClick={true}
  isFullscreen={isFullscreen}
  onToggleFullscreen={setIsFullscreen}
/>`,
    },
  },
};

// Loading state
export const Loading = () => {
  return (
    <div style={{ padding: '16px' }}>
      <div style={{ maxWidth: '766px', height: CHATGPT_APP_HEIGHT }}>
        <Map locations={[]} loading defaultCenter={[37.7849, -122.4194]} defaultZoom={12} />
      </div>
    </div>
  );
};

Loading.parameters = {
  layout: 'fullscreen',
  docs: {
    description: {
      story: 'Show skeleton map and carousel while data is loading with `loading={true}`.',
    },
    source: {
      code: `<Map locations={[]} loading />`,
    },
  },
};

// Error state
export const Error = () => {
  return (
    <div style={{ padding: '16px' }}>
      <div style={{ maxWidth: '766px', height: CHATGPT_APP_HEIGHT }}>
        <Map
          locations={[]}
          error
          compactMapProps={{
            carouselProps: {
              errorTitle: 'Failed to load locations',
              errorMessage: 'Please check your connection and try again.',
              onErrorRetry: () => alert('Retry clicked'),
            },
          }}
          defaultCenter={[37.7849, -122.4194]}
          defaultZoom={12}
        />
      </div>
    </div>
  );
};

Error.parameters = {
  layout: 'fullscreen',
  docs: {
    description: {
      story:
        'Display an error state with `error={true}`. Configure error UI via `compactMapProps.carouselProps`.',
    },
    source: {
      code: `<Map
  locations={[]}
  error
  compactMapProps={{
    carouselProps: {
      errorTitle: "Failed to load locations",
      errorMessage: "Please check your connection.",
      onErrorRetry: () => refetch(),
    },
  }}
/>`,
    },
  },
};

// Empty state
export const Empty = () => {
  return (
    <div style={{ padding: '16px' }}>
      <div style={{ maxWidth: '766px', height: CHATGPT_APP_HEIGHT }}>
        <Map
          locations={[]}
          compactMapProps={{
            carouselProps: {
              emptyTitle: 'No locations found',
              emptyMessage: 'Try adjusting your search filters.',
            },
          }}
          defaultCenter={[37.7849, -122.4194]}
          defaultZoom={12}
        />
      </div>
    </div>
  );
};

Empty.parameters = {
  layout: 'fullscreen',
  docs: {
    description: {
      story:
        'Show an empty state when there are no locations. Configure via `compactMapProps.carouselProps`.',
    },
    source: {
      code: `<Map
  locations={[]}
  compactMapProps={{
    carouselProps: {
      emptyTitle: "No locations found",
      emptyMessage: "Try adjusting your search filters.",
    },
  }}
/>`,
    },
  },
};
