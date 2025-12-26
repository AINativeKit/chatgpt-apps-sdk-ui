import { useState } from 'react';
import type { Meta } from '@storybook/react';
import { FullscreenMap, type FullscreenMapProps } from './FullscreenMap';
import type { LocationData } from './types';
import { StarFilled } from '@openai/apps-sdk-ui/components/Icon';

const FULLSCREEN_HEIGHT = '620px';
const SECONDARY_HEIGHT = '520px';

const sampleLocations: LocationData[] = [
  {
    id: 'tonys-pizza',
    name: "Tony's Pizza Napoletana",
    subtitle: 'Neapolitan Pizzeria · North Beach',
    coords: [37.8001, -122.4098],
    description:
      'Award-winning Neapolitan pies in North Beach.<br/><br/>A San Francisco institution serving authentic Italian pizza with locally-sourced ingredients.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    images: [
      'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
      'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
      'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
      'https://persistent.oaistatic.com/pizzaz/pizzaz-4.png',
    ],
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
            metadata: '2 weeks ago',
            description:
              'Great location!<br/>The service was excellent and the atmosphere was perfect.',
          },
          {
            id: 'review-2',
            title: 'John D.',
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
    lists: [
      {
        title: 'Reviews',
        items: [
          {
            id: 'review-1',
            title: 'Maria L.',
            metadata: '3 weeks ago',
            description: 'Late-night gem! Best focaccia pizza in the city.',
          },
        ],
      },
    ],
  },
  {
    id: 'delfina',
    name: 'Pizzeria Delfina',
    subtitle: 'Thin-Crust Pizza · Mission District',
    coords: [37.7613, -122.4255],
    description:
      'Thin-crust classics on 18th Street.<br/>Celebrated for perfectly charred, thin-crust pizzas made in a wood-burning oven.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
    features: [{ icon: <StarFilled />, label: '4.5' }, { label: '$$' }],
    actions: [
      { label: 'Add to favorites', variant: 'primary' },
      { label: 'Reservations', variant: 'secondary' },
    ],
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
  {
    id: 'slice-house',
    name: 'Slice House',
    subtitle: 'Neighborhood Pizza · Valencia Street',
    coords: [37.7722, -122.438],
    description:
      'Neighborhood spot with seasonal toppings. Local favorite featuring creative combinations and locally-sourced ingredients.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    features: [{ icon: <StarFilled />, label: '4.4' }, { label: '$$' }],
  },
  {
    id: 'pizza-palace',
    name: 'Pizza Palace',
    subtitle: 'Sourdough Pizza · Nob Hill',
    coords: [37.7899, -122.4123],
    description:
      'Sourdough, wood-fired pies near Nob Hill. San Francisco sourdough meets traditional Italian pizza-making.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
    features: [{ icon: <StarFilled />, label: '4.6' }, { label: '$$$' }],
  },
  {
    id: 'crispy-crust',
    name: 'Crispy Crust',
    subtitle: 'Detroit-Style Pizza · SoMa',
    coords: [37.7805, -122.4135],
    description:
      'Crispy-edged Detroit-style in SoMa. Bringing Detroit-style square pizza to San Francisco with creative toppings.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
    features: [{ icon: <StarFilled />, label: '4.5' }, { label: '$$' }],
  },
];

const meta: Meta<FullscreenMapProps> = {
  title: 'Composed Components/Maps/FullscreenMap',
  component: FullscreenMap,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    locations: { control: false },
    onLocationSelect: { control: false },
    onCollapse: { control: false },
    onErrorRetry: { control: false },
    renderMarker: { control: false },
    height: { table: { defaultValue: { summary: '100vh' } } },
    loading: { table: { defaultValue: { summary: 'false' } } },
    error: { table: { defaultValue: { summary: 'false' } } },
    markerVariant: { table: { defaultValue: { summary: 'pin' } } },
    showPopup: { table: { defaultValue: { summary: 'false' } } },
    hideAttribution: { table: { defaultValue: { summary: 'false' } } },
    scrollWheelZoom: { table: { defaultValue: { summary: 'true' } } },
  },
};

export default meta;

// Base story with interactive controls
export const Base = (args: FullscreenMapProps) => {
  const [selectedId, setSelectedId] = useState<string | undefined>('tonys-pizza');

  return (
    <div
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--color-border-subtle)',
        boxShadow: 'var(--shadow-200)',
      }}
    >
      <FullscreenMap
        {...args}
        locations={sampleLocations}
        selectedId={selectedId}
        onLocationSelect={setSelectedId}
        height={FULLSCREEN_HEIGHT}
      />
    </div>
  );
};

Base.args = {};

Base.parameters = {
  docs: {
    source: {
      code: `<FullscreenMap
  locations={locations}
  selectedId={selectedId}
  onLocationSelect={setSelectedId}
  height="620px"
/>`,
    },
  },
};

// Loading state
export const Loading = (args: FullscreenMapProps) => (
  <div
    style={{
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid var(--color-border-subtle)',
    }}
  >
    <FullscreenMap {...args} />
  </div>
);

Loading.args = {
  locations: sampleLocations,
  loading: true,
  height: SECONDARY_HEIGHT,
};

Loading.parameters = {
  docs: {
    source: {
      code: `<FullscreenMap locations={locations} loading />`,
    },
  },
};

// Error state
export const Error = (args: FullscreenMapProps) => (
  <div
    style={{
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid var(--color-border-subtle)',
    }}
  >
    <FullscreenMap {...args} />
  </div>
);

Error.args = {
  locations: sampleLocations,
  error: true,
  height: SECONDARY_HEIGHT,
  errorTitle: 'Failed to load locations',
  errorMessage: 'Unable to retrieve location data. Please try again.',
  onErrorRetry: () => console.log('Retry clicked'),
};

Error.parameters = {
  docs: {
    source: {
      code: `<FullscreenMap
  locations={locations}
  error
  errorTitle="Failed to load locations"
  errorMessage="Unable to retrieve location data."
  onErrorRetry={() => handleRetry()}
/>`,
    },
  },
};

// Empty state
export const Empty = (args: FullscreenMapProps) => (
  <div
    style={{
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid var(--color-border-subtle)',
    }}
  >
    <FullscreenMap {...args} />
  </div>
);

Empty.args = {
  locations: [],
  height: SECONDARY_HEIGHT,
};

Empty.parameters = {
  docs: {
    source: {
      code: `<FullscreenMap locations={[]} />`,
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
      <div
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <FullscreenMap locations={sampleLocations} loading height={SECONDARY_HEIGHT} />
      </div>
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Error
      </div>
      <div
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <FullscreenMap
          locations={sampleLocations}
          error
          height={SECONDARY_HEIGHT}
          errorTitle="Failed to load"
          onErrorRetry={() => console.log('Retry')}
        />
      </div>
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Empty
      </div>
      <div
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <FullscreenMap locations={[]} height={SECONDARY_HEIGHT} />
      </div>
    </div>
  </div>
);

States.parameters = {
  docs: {
    source: {
      code: `// Loading state
<FullscreenMap locations={locations} loading />

// Error state
<FullscreenMap locations={locations} error />

// Empty state
<FullscreenMap locations={[]} />`,
    },
  },
};
